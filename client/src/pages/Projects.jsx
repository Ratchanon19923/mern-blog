import React from "react";
import CallToAction from "../components/CallToAction";

export default function Projects() {
  return (
    <div className="min-h-screen max-w-2xl mx-auto flex justify-center items-center flex-col gap-6 p-3">
      <h1 className="text-3xl font-semibold">Projects</h1>
      <p className="text-md text-gray-500 ">
        Welcome to [Your Coding Project Name]! We're excited to introduce you to
        our innovative project that aims to revolutionize [specific area or
        industry]. Developed by a passionate team of coders, designers, and
        enthusiasts, [Your Coding Project Name] is the culmination of months of
        dedication and hard work.
      </p>

      <CallToAction />
    </div>
  );
}
