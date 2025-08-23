"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { features } from "@/data/features";
import { howItWorks } from "@/data/howItWorks";
import { testimonial } from "@/data/testimonial";
import { faqs } from "@/data/faqs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MoveRight } from "lucide-react";

const HeroSection = () => {
  // Track scroll progress
  const { scrollYProgress } = useScroll();

  // Map scroll to tilt
  const rotateX = useTransform(scrollYProgress, [0, 1], [25, 0]); //tilt frontwards

  return (
    <section className="grid-background min-h-screen flex flex-col items-center justify-center text-center px-4">
      {/* Headline */}
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent leading-tight max-w-4xl">
        Your AI Career Coach for <br /> Professional Success
      </h1>

      {/* Subtext */}
      <p className="mt-6 text-lg text-gray-300 max-w-2xl">
        Advance your career with personalized guidance, interview prep, and
        AI-powered tools for job success.
      </p>

      {/* Buttons */}
      <div className="mt-8 flex gap-4">
        <Button size="lg">Hard Work</Button>
        <Button size="lg" variant="outline">
          Smart Work
        </Button>
      </div>

      {/* Scroll-tilt Image */}
      <div className="mt-10 [perspective:1200px]">
        {" "}
        {/* 👈 perspective wrapper */}
        <motion.div style={{ rotateX }} className="w-full flex justify-center">
          <Image
            src="/AI_Resume.png"
            alt="CareerLens"
            width={1000}
            height={1000}
            className="object-contain border rounded-md"
          />
        </motion.div>
      </div>

      <div className="py-12 px-6">
        <h2 className="text-center text-white text-2xl md:text-3xl font-bold mb-10">
          Powerful Features for Your Career Growth
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-[#111] p-6 rounded-xl shadow-md text-center hover:border hover:border-gray-500 transition"
            >
              <CardHeader className="flex flex-col items-center space-y-3">
                <CardTitle className="text-4xl text-white">
                  {feature?.icon}
                </CardTitle>
                <CardDescription className="text-lg font-semibold text-white">
                  {feature?.title}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="w-full bg-black py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          <div>
            <h1 className="text-4xl font-bold text-white">50+</h1>
            <p className="text-gray-400 mt-2">Industries Covered</p>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">1000+</h1>
            <p className="text-gray-400 mt-2">Interview Questions</p>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">95%</h1>
            <p className="text-gray-400 mt-2">Success Rate</p>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">24/7</h1>
            <p className="text-gray-400 mt-2">AI Support</p>
          </div>
        </div>
      </div>
      <div className=" mx-auto text-center px-6 bg-black mt-20 mb-20 p-30">
        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          How It Works
        </h1>
        <p className="text-gray-400 mt-2">
          Four simple steps to accelerate your career growth
        </p>

        {/* Steps Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 ">
          {howItWorks.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              {/* Icon circle */}
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-800 text-white text-2xl mb-4">
                {item.icon}
              </div>

              {/* Title */}
              <h2 className="text-lg font-semibold text-white">{item.title}</h2>

              {/* Description */}
              <p className="text-gray-400 mt-2 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className=" py-16 px-6">
        {/* Section Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
          What Our Users Say
        </h2>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonial.map((item, index) => (
            <div
              key={index}
              className="bg-neutral-900 rounded-2xl shadow-lg p-6 text-left flex flex-col"
            >
              {/* User Info */}
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={item.image}
                  alt={item.author}
                  width={50}
                  height={50}
                  className="rounded-full border-2 border-gray-700"
                />
                <div>
                  <h3 className="text-white font-semibold">{item.author}</h3>
                  <p className="text-sm text-gray-400">{item.role}</p>
                  <p className="text-sm text-gray-500 italic">{item.company}</p>
                </div>
              </div>

              {/* Quote */}
              <p className="text-gray-300 text-sm leading-relaxed mt-2 italic">
                “{item.quote}”
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Frequently asked Question Section */}
      <div className="relative py-20 px-6">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-6">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-gray-400 mb-6">
          Find answers to common questions about our platform
        </p>

        {/* FAQ Accordion */}
        <div className="relative py-6 px-6">
          <Accordion
            type="single"
            collapsible
            className="max-w-2xl mx-auto w-full divide-y divide-gray-700"
          >
            {faqs.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="w-full text-left text-white font-medium py-4 hover:text-gray-300">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="w-full text-gray-400 leading-relaxed space-y-3 pb-4">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      <div className=" w-full mb-5 relative flex flex-col items-center justify-center text-center py-20 px-6 rounded-2xl bg-gradient-to-b from-gray-200 to-gray-400 shadow-lg ">
        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Ready to Accelerate Your Career?
        </h1>

        {/* Subheading */}
        <p className="text-gray-700 text-lg mb-8 max-w-2xl">
          Join thousands of professionals who are advancing their careers with
          AI-powered guidance.
        </p>

        {/* Button */}
        <Button className="flex items-center gap-2 px-6 py-3 text-base font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition">
          Start Your Journey Today
          <MoveRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
