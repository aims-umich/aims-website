"use client";
import React from "react";
import { supabase } from "../lib/supabaseClient";

const JoinUs = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    const { error } = await supabase.from("form_submissions").insert([
      { name, email, message },
    ]);

    if (error) {
      console.error("Submission error:", error.message);
      alert("Something went wrong. Please try again.");
    } else {
      alert("Form submitted successfully!");
      form.reset();
    }
  };

  return (
    <div className="w-full -mt-16 mb-8">
      <div className="h-full w-full dark:bg-black-100 bg-white absolute left-0 right-0">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>

      <div className="py-12 relative z-10">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold tracking-tight text-blue-michigan sm:text-4xl md:text-5xl mb-4">
            Want to Join <span className="text-yellow-maize">Us?</span>
          </h2>
          <p className="max-w-3xl text-xl text-center tracking-tight text-blue-michigan mb-4">
            Are you a PhD student looking for postdoc? Undergrad looking to
            continue graduate school? MS student looking for PhD? This is what
            you need to know about us!
          </p>
          {/* <p  className="max-w-3xl text-xl text-center tracking-tight text-blue-michigan">
            Please email Professor Radaideh at radaideh@umich.edu with the subject line: &quot;Joining AIMS Lab as a [Your academic status] - [Your name]&quot;
          </p > */}
        </div>

        <div className="px-4 md:px-6 max-w-7xl mx-auto">
          <div className="max-w-lg w-full mx-auto rounded-2xl p-6 md:p-10 shadow-2xl bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-black transition-all duration-500 ease-in-out transform hover:scale-105">
            <h3 className="font-bold text-2xl text-blue-michigan dark:text-neutral-200 mb-4 animate-pulse">
              Get in Touch
            </h3>
            <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300 mb-6 animate-fade-in">
              We&apos;d love to hear from you! Fill out the form below to reach us.
            </p>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="flex flex-col space-y-2 w-full">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  type="text"
                  className="border border-gray-300 dark:border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out animate-slide-up bg-white dark:bg-gray-800 text-neutral-900 dark:text-neutral-200"
                />
              </div>

              <div className="flex flex-col space-y-2 w-full">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  placeholder="your.email@example.com"
                  type="email"
                  className="border border-gray-300 dark:border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out animate-slide-up delay-100 bg-white dark:bg-gray-800 text-neutral-900 dark:text-neutral-200"
                />
              </div>

              <div className="flex flex-col space-y-2 w-full">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Your message here..."
                  rows={5}
                  className="border border-gray-300 dark:border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out animate-slide-up delay-200 resize-y bg-white dark:bg-gray-800 text-neutral-900 dark:text-neutral-200"
                />
              </div>

              <button
                type="submit"
                className="relative group/btn w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg h-12 font-semibold shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out transform hover:-translate-y-1 animate-slide-up delay-400"
              >
                Send
                <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
                <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
              </button>

              <div className="mt-8 text-center text-sm text-neutral-600 dark:text-neutral-300 animate-fade-in delay-500">
                <p>2355 Bonisteel Blvd, Ann Arbor, MI 48109</p>
                <p>2929 Cooley Bldg.</p>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }

        .delay-100 {
          animation-delay: 0.1s;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .delay-300 {
          animation-delay: 0.3s;
        }

        .delay-400 {
          animation-delay: 0.4s;
        }

        .delay-500 {
          animation-delay: 0.5s;
        }
      `}</style>
    </div>
  );
};

export default JoinUs;
