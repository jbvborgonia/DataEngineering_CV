import { motion } from "motion/react";
import { resumeData } from "../data/resume";
import { Card, CardContent } from "./ui/card";
import { Award, CheckCircle2, ExternalLink } from "lucide-react";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

const CREDLY_URL = "https://www.credly.com/users/john-benedick-borgonia.4b0cf0a5/badges#credly";

export default function Certifications() {
  return (
    <section id="certifications" className="py-20 bg-secondary/5">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Certifications</h2>
          <p className="text-muted-foreground mb-6">Validated expertise in Cloud and Data Engineering</p>
          <a 
            href={CREDLY_URL} 
            target="_blank" 
            rel="noreferrer"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }), "rounded-full gap-2")}
          >
            <ExternalLink className="w-4 h-4" />
            View all on Credly
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {resumeData.certifications.map((cert, index) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <a href={CREDLY_URL} target="_blank" rel="noreferrer" className="block group">
                <Card className="border-none bg-background shadow-sm group-hover:shadow-md group-hover:bg-secondary/10 transition-all duration-300">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Award className="w-5 h-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-sm leading-tight">{cert.name}</h3>
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                        <CheckCircle2 className="w-3 h-3 text-green-500" />
                        {cert.issuer}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
