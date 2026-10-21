"use client";

import { useState } from "react";
import { portfolioData } from "@/app/data/portfolioData";
import { Send, CheckCircle2, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import confetti from "canvas-confetti";

export default function ContactSection() {
  const { profile } = portfolioData;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("sending");

    setTimeout(() => {
      setStatus("sent");
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.7 }
      });
    }, 800);
  };

  return (
    <section id="contact" className="scroll-mt-20">
      {/* Title Header */}
      <div className="w-full h-fit border-b">
        <div className="innerContainer px-4 py-2 sm:py-3 flex items-center justify-between">
          <h2 className="text1 font-bold text-2xl sm:text-3xl tracking-tight">
            Contact
          </h2>
          <span className="text-[11px] font-mono text2 tracking-tight">
            05 / GET IN TOUCH
          </span>
        </div>
      </div>

      {/* Subtitle */}
      <div className="w-full border-b">
        <div className="innerContainer h-fit py-3 sm:py-4 flex items-center justify-start px-4 text2 text-xs sm:text-sm tracking-tight font-mono">
          <h3>Have an exciting idea, full-time opportunity, or freelance project? Let&apos;s talk.</h3>
        </div>
      </div>

      {/* Form & Direct Connect */}
      <div className="w-full border-b">
        <div className="innerContainer p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Direct channels */}
          <div className="flex flex-col justify-between space-y-6">
            <div>
              <h4 className="text-base font-bold text1 tracking-tight mb-2">
                Let&apos;s collaborate
              </h4>
              <p className="text-xs sm:text-sm text2 leading-relaxed font-sans mb-6">
                I am actively considering full-stack engineering roles, product development, and impactful freelance collaborations. My inbox is always open.
              </p>

              <div className="space-y-3 font-mono text-xs">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-3 p-3 rounded-xl border hover-bg2 transition-colors text1 group"
                >
                  <Mail size={16} className="text2 group-hover:text-blue-500" />
                  <span className="truncate">{profile.email}</span>
                  <ArrowUpRight size={14} className="ml-auto text2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>

                <a
                  href={`tel:${profile.phone}`}
                  className="flex items-center gap-3 p-3 rounded-xl border hover-bg2 transition-colors text1 group"
                >
                  <Phone size={16} className="text2 group-hover:text-emerald-500" />
                  <span>{profile.phone}</span>
                  <ArrowUpRight size={14} className="ml-auto text2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>

                <div className="flex items-center gap-3 p-3 rounded-xl border text2">
                  <MapPin size={16} />
                  <span>{profile.location}</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl border bg-neutral-50 dark:bg-neutral-900 text-xs font-mono text2">
              ⚡ Typical response time: Within 12 hours
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-5 sm:p-6 rounded-2xl border bg-white dark:bg-neutral-900 shadow-xs">
            {status === "sent" ? (
              <div className="min-h-[260px] flex flex-col items-center justify-center text-center p-4 space-y-3 animate-in fade-in duration-300">
                <CheckCircle2 size={40} className="text-emerald-500 animate-bounce" />
                <h4 className="text-lg font-bold text1">Message Dispatched!</h4>
                <p className="text-xs text2 font-mono max-w-xs">
                  Thank you for reaching out, {formData.name}. I will review your message and reply promptly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setStatus("idle");
                    setFormData({ name: "", email: "", message: "" });
                  }}
                  className="mt-2 text-xs font-mono text-blue-500 hover:underline"
                >
                  Send another note ➔
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                <div>
                  <label htmlFor="name" className="block text2 mb-1.5 uppercase tracking-wider text-[10px]">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Smith"
                    className="w-full px-3 py-2 rounded-lg border bg1 text1 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text2 mb-1.5 uppercase tracking-wider text-[10px]">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@domain.com"
                    className="w-full px-3 py-2 rounded-lg border bg1 text1 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text2 mb-1.5 uppercase tracking-wider text-[10px]">
                    Project Details / Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your product, project timeline, or role..."
                    className="w-full px-3 py-2 rounded-lg border bg1 text1 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-2.5 rounded-lg bg-black text-white dark:bg-white dark:text-black font-semibold text-xs tracking-tight inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {status === "sending" ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send size={13} /> Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
