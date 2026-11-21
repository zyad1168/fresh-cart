"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaFacebookF, FaXTwitter, FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { Send, Sparkles, CheckCircle2 } from "lucide-react";

const socialLinks = [
  {
    name: "Facebook",
    href: "https://facebook.com",
    hoverClass: "hover:bg-blue-600 hover:border-blue-500 hover:shadow-blue-500/30",
    Icon: FaFacebookF,
  },
  {
    name: "X / Twitter",
    href: "https://x.com",
    hoverClass: "hover:bg-sky-500 hover:border-sky-400 hover:shadow-sky-500/30",
    Icon: FaXTwitter,
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    hoverClass: "hover:bg-pink-600 hover:border-pink-500 hover:shadow-pink-500/30",
    Icon: FaInstagram,
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/201020134454",
    hoverClass:
      "hover:bg-emerald-600 hover:border-emerald-500 hover:shadow-emerald-500/30",
    Icon: FaWhatsapp,
  },
];

export default function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/zyadibrahimedu11@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            message,
            _subject: `New Message from ${name}`,
          }),
        }
      );

      if (response.ok) {
        setStatus("sent");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="container w-[80%] mx-auto mt-20 pb-16">
      <style jsx>{`
        @keyframes floatSlow {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-12px) scale(1.04);
          }
        }
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-float-slow {
          animation: floatSlow 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: floatSlow 8s ease-in-out 1.5s infinite;
        }
        .animate-fade-up {
          animation: fadeUp 0.65s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
      `}</style>

      <div className="animate-fade-up rounded-3xl bg-white border border-slate-200/90 shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12">

        <div className="relative lg:col-span-5 p-8 md:p-10 flex flex-col justify-between gap-10 bg-[#060d18] text-white overflow-hidden">
          <div className="pointer-events-none absolute -top-16 -left-16 w-56 h-56 rounded-full bg-emerald-500/20 blur-3xl animate-float-slow" />
          <div className="pointer-events-none absolute -bottom-20 -right-16 w-64 h-64 rounded-full bg-teal-400/15 blur-3xl animate-float-delayed" />

          <div className="relative z-10 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-400/25">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              Get In Touch
            </span>

            <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
              Have a question or custom order in mind?
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              Send your message directly to our inbox or connect with us on our
              social channels. We are always happy to help.
            </p>
          </div>

          <div className="relative z-10 space-y-3">
            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400 font-semibold">
              Follow Us
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {socialLinks.map(({ name, href, hoverClass, Icon }) => (
                <Link
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  title={name}
                  className={`w-11 h-11 rounded-2xl bg-white/10 text-slate-200 border border-white/15 flex items-center justify-center shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:scale-105 hover:rotate-3 hover:text-white ${hoverClass}`}
                >
                  <Icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>

    
        <div className="lg:col-span-7 p-8 md:p-11 bg-linear-to-br from-white via-slate-50/60 to-emerald-50/40 flex flex-col justify-center">
          <div className="mb-6">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">
              Direct Message
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-slate-900">
              Send Us a Message
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Fill out the form below and we will get back to you soon.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-500 transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-500 transition-all duration-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Message
              </label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your question or custom order details..."
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-500 transition-all duration-200 resize-none"
              />
            </div>

            <div className="pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <button
                type="submit"
                disabled={status === "sending"}
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-600 text-white text-sm font-semibold shadow-md shadow-emerald-600/20 hover:bg-emerald-700 active:scale-[0.98] disabled:opacity-60 transition-all duration-200 cursor-pointer"
              >
                <span>{status === "sending" ? "Sending..." : "Send Message"}</span>
                <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
              </button>

              {status === "sent" && (
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3.5 py-2 rounded-xl animate-fade-up">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Message sent successfully!</span>
                </div>
              )}

              {status === "error" && (
                <span className="text-xs font-semibold text-rose-600">
                  Something went wrong. Please try again.
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}