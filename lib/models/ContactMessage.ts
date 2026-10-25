import mongoose, { Schema, Document, Model } from "mongoose";

export interface IContactMessage extends Document {
  name: string;
  email: string;
  message: string;
  ip?: string;
  userAgent?: string;
  emailSentToUser: boolean;
  emailSentToOwner: boolean;
  userEmailError?: string;
  ownerEmailError?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ContactMessageSchema: Schema<IContactMessage> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address",
      ],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      maxlength: [5000, "Message cannot exceed 5000 characters"],
    },
    ip: {
      type: String,
      default: "",
    },
    userAgent: {
      type: String,
      default: "",
    },
    emailSentToUser: {
      type: Boolean,
      default: false,
    },
    emailSentToOwner: {
      type: Boolean,
      default: false,
    },
    userEmailError: {
      type: String,
      default: "",
    },
    ownerEmailError: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Prevent re-compiling model in development hot-reloading
export const ContactMessage: Model<IContactMessage> =
  mongoose.models.ContactMessage ||
  mongoose.model<IContactMessage>("ContactMessage", ContactMessageSchema);
