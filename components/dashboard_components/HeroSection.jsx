"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { features } from "@/data/features";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
        <Button size="lg">Get Started</Button>
        <Button size="lg" variant="outline">
          Get Started
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
          <CardTitle className="text-4xl text-white">{feature?.icon}</CardTitle>
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

    </section>
  );
};

export default HeroSection;
