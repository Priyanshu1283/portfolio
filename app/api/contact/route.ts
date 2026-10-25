import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ContactMessage } from "@/lib/models/ContactMessage";
import { sendContactEmails } from "@/lib/mail";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Asynchronous background task to persist message in MongoDB
// This runs in the background and DOES NOT block the user's HTTP response
async function saveMessageInBackground({
  name,
  email,
  message,
  ip,
  userAgent,
  emailSentToUser,
  emailSentToOwner,
  userEmailError,
  ownerEmailError,
}: {
  name: string;
  email: string;
  message: string;
  ip: string;
  userAgent: string;
  emailSentToUser: boolean;
  emailSentToOwner: boolean;
  userEmailError: string;
  ownerEmailError: string;
}) {
  try {
    await connectToDatabase();
    await ContactMessage.create({
      name,
      email,
      message,
      ip,
      userAgent,
      emailSentToUser,
      emailSentToOwner,
      userEmailError,
      ownerEmailError,
    });
  } catch (err) {
    console.error("Background MongoDB save error:", err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    // 1. Fast Validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid name (at least 2 characters)." },
        { status: 400 }
      );
    }

    if (name.trim().length > 100) {
      return NextResponse.json(
        { success: false, error: "Name is too long (maximum 100 characters)." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json(
        { success: false, error: "Please enter a detailed message (at least 5 characters)." },
        { status: 400 }
      );
    }

    if (message.trim().length > 5000) {
      return NextResponse.json(
        { success: false, error: "Message is too long (maximum 5000 characters)." },
        { status: 400 }
      );
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanMessage = message.trim();

    // Client metadata
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : req.headers.get("x-real-ip") || "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";

    // 2. Dispatch emails in parallel first (Visitor confirmation + Owner notification)
    const emailResults = await sendContactEmails({
      name: cleanName,
      email: cleanEmail,
      message: cleanMessage,
    });

    // 3. Save to MongoDB in background — Non-blocking, response doesn't wait for DB!
    saveMessageInBackground({
      name: cleanName,
      email: cleanEmail,
      message: cleanMessage,
      ip,
      userAgent,
      emailSentToUser: emailResults.userSent,
      emailSentToOwner: emailResults.ownerSent,
      userEmailError: emailResults.userError || "",
      ownerEmailError: emailResults.ownerError || "",
    });

    // 4. Return instant response to the client
    return NextResponse.json(
      {
        success: true,
        message: "Message received successfully! We have sent a confirmation to your email.",
        data: {
          userEmailSent: emailResults.userSent,
          ownerEmailSent: emailResults.ownerSent,
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : "Internal Server Error";
    console.error("API /api/contact unexpected error:", errorMsg);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred while processing your request." },
      { status: 500 }
    );
  }
}
