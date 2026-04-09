/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SkillsDashboard from "./components/SkillsDashboard";
import ExperienceTimeline from "./components/ExperienceTimeline";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import ChatBot from "./components/ChatBot";
import { Separator } from "./components/ui/separator";

export default function App() {
  useEffect(() => {
    // Force dark mode
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-16">
        <Hero />
        <Separator className="opacity-20" />
        <SkillsDashboard />
        <Separator className="opacity-20" />
        <ExperienceTimeline />
        <Separator className="opacity-20" />
        <Projects />
        <Separator className="opacity-20" />
        <Certifications />
        
        <section className="py-20 text-center">
          <h2 className="text-2xl font-bold mb-4">Let's Connect</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Interested in collaborating or just want to say hi? Feel free to reach out!
          </p>
          <div className="flex justify-center gap-4">
            <a 
              href="mailto:jbvborgonia@gmail.com" 
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Send an Email
            </a>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-border/50 bg-secondary/10">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} John Benedick V. Borgonia. Built with React & Gemini AI.</p>
        </div>
      </footer>

      <ChatBot />
    </div>
  );
}
