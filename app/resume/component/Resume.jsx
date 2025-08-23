"use client";

import { Button } from "@/components/ui/button";
import { Save, Download } from "lucide-react";
import ResumeForm from "./ResumeForm";
import Markdown from "./Markdown";
import { useState, useRef } from "react";
import html2pdf from "html2pdf.js";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Resume = () => {
  const [resumeData, setResumeData] = useState({});
  const resumeRef = useRef();

  const handleDownload = () => {
    const element = resumeRef.current;

    if (!element) return;

    // Create a temporary style element to override problematic CSS
    const style = document.createElement('style');
    style.textContent = `
      * {
        color: #000000 !important;
        background-color: #ffffff !important;
        border-color: #000000 !important;
      }
      .text-gray-900, .text-gray-800, .text-gray-700, .text-gray-600, .text-gray-500 {
        color: #000000 !important;
      }
      .text-blue-600, .text-blue-400 {
        color: #0066cc !important;
      }
      .border-gray-800, .border-gray-300, .border-gray-200 {
        border-color: #cccccc !important;
      }
      .bg-white {
        background-color: #ffffff !important;
      }
      .shadow-lg {
        box-shadow: none !important;
      }
    `;
    document.head.appendChild(style);

    const opt = {
      margin: [0.5, 0.5, 0.5, 0.5],
      filename: `${resumeData?.name || "resume"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { 
        scale: 2, 
        useCORS: true, 
        backgroundColor: "#ffffff",
        logging: false,
        allowTaint: true
      },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };
    
    html2pdf().set(opt).from(element).save().then(() => {
      // Remove the temporary style after PDF generation
      document.head.removeChild(style);
    }).catch((error) => {
      console.error('PDF generation failed:', error);
      // Remove the temporary style even if PDF generation fails
      document.head.removeChild(style);
    });
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent leading-tight max-w-4xl">
          Resume Builder
        </h1>
        <div className="flex items-center gap-2">
          <Button className="flex items-center gap-2" onClick={handleDownload}>
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
        </div>
      </div>

      <Tabs defaultValue="form" className="mt-3">
        <TabsList>
          <TabsTrigger value="form">Form</TabsTrigger>
          <TabsTrigger value="markdown">Resume</TabsTrigger>
        </TabsList>

        <TabsContent value="form" className="mt-6">
          <ResumeForm onDataChange={setResumeData} />
        </TabsContent>

        {/* ✅ Yaha ref lagana jaruri hai */}
        <TabsContent value="markdown">
          <div ref={resumeRef}>
            <Markdown data={resumeData} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Resume;
