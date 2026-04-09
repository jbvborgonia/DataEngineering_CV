import React from "react";
import { motion } from "motion/react";
import { resumeData } from "../data/resume";
import { Button, buttonVariants } from "./ui/button";
import { Github, Linkedin, Mail, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import resumePdf from "../assets/Data_Engineering.pdf";

export default function Hero() {
  const handleDownload = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(resumePdf);
      if (!response.ok) throw new Error("Network response was not ok");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = "John_Benedick_Borgonia_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      // Fallback to direct navigation if fetch fails
      window.open(resumePdf, '_blank');
    }
  };

  return (
    <section id="home" className="py-20 flex flex-col items-center text-center space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
          {resumeData.name}
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground font-mono">
          {resumeData.title}
        </p>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="max-w-2xl text-lg text-muted-foreground leading-relaxed"
      >
        {resumeData.summary}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="flex flex-wrap justify-center gap-4"
      >
        <a 
          href={resumePdf} 
          onClick={handleDownload}
          className={cn(buttonVariants({ variant: "default", size: "lg" }), "rounded-full gap-2")}
        >
          <FileText className="w-4 h-4" /> Download Resume
        </a>
        <div className="flex gap-2">
          <a 
            href={resumeData.contact.github} 
            target="_blank" 
            rel="noreferrer"
            className={cn(buttonVariants({ variant: "outline", size: "icon" }), "rounded-full")}
          >
            <Github className="w-5 h-5" />
          </a>
          <a 
            href={resumeData.contact.linkedin} 
            target="_blank" 
            rel="noreferrer"
            className={cn(buttonVariants({ variant: "outline", size: "icon" }), "rounded-full")}
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a 
            href={`mailto:${resumeData.contact.email}`}
            className={cn(buttonVariants({ variant: "outline", size: "icon" }), "rounded-full")}
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
