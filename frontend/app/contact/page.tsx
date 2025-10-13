
"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thanks for reaching out! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59..." />
              </svg>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Gitwise
            </h1>
          </div>

          {/* Navigation */}
          <nav className="flex space-x-8 text-gray-700 font-medium">
            <Link href="/" className="hover:text-black transition-colors duration-200 relative group">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link href="/about" className="hover:text-black transition-colors duration-200 relative group">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link href="/contact" className="text-black relative">
              Contact
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-full text-sm font-medium mb-8 shadow-lg">
            <span>Get In Touch</span>
          </div>

          <h2 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            We'd Love to
            <br />
            <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
              Hear From You
            </span>
          </h2>

          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Have questions, suggestions, or feedback? Our team is here to help you get the most out of Gitwise.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-200 p-10">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Send Us a Message
          </h3>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all duration-200"
                placeholder="John Doe"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all duration-200"
                placeholder="john@example.com"
                required
              />
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-900 mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all duration-200"
                placeholder="What’s this about?"
                required
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all duration-200 resize-none"
                placeholder="Tell us more about your inquiry..."
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-8 py-4 bg-gray-900 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Send Message
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            We typically respond within 24 hours
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-8 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          <p>© 2025 Gitwise. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-black transition-colors duration-200">Privacy</a>
            <a href="#" className="hover:text-black transition-colors duration-200">Terms</a>
            <a href="#" className="hover:text-black transition-colors duration-200">Docs</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
