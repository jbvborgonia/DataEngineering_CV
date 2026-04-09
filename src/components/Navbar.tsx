import { motion } from "motion/react";
import { resumeData } from "../data/resume";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Certifications", href: "#certifications" },
];

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-bottom border-border/50"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
            JB
          </div>
          <span className="font-bold tracking-tight hidden sm:inline-block">
            {resumeData.name.split(' ')[0]} {resumeData.name.split(' ')[1]}
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {item.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a 
            href={`mailto:${resumeData.contact.email}`}
            className={cn(buttonVariants({ variant: "outline", size: "sm" }), "hidden sm:flex")}
          >
            Contact
          </a>
          <div className="md:hidden">
            {/* Mobile menu could go here, but keeping it minimal for now */}
          </div>
        </div>
      </div>
    </motion.header>
  );
}
