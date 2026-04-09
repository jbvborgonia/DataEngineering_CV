import { motion } from "motion/react";
import { resumeData } from "../data/resume";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Briefcase, Calendar, GraduationCap, MapPin } from "lucide-react";

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="py-20 bg-secondary/10">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Experience & Education</h2>
          <p className="text-muted-foreground">My professional and academic journey</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
          {/* Experience Section */}
          {resumeData.experience.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
            >
              {/* Icon */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-background shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <Briefcase className="w-5 h-5 text-primary" />
              </div>

              {/* Content */}
              <Card className="w-[calc(100%-4rem)] md:w-[45%] p-4 border-none bg-background shadow-lg">
                <CardHeader className="p-0 mb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <CardTitle className="text-xl">{exp.role}</CardTitle>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground font-mono">
                      <Calendar className="w-3 h-3" />
                      {exp.period}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-primary font-semibold">{exp.company}</p>
                    {exp.location && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {exp.location}
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <ul className="space-y-2 list-disc list-inside text-sm text-muted-foreground">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="leading-relaxed">
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {/* Education Section */}
          {resumeData.education && resumeData.education.map((edu, index) => (
            <motion.div
              key={edu.school}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (resumeData.experience.length + index) * 0.1 }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
            >
              {/* Icon */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-background shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <GraduationCap className="w-5 h-5 text-blue-500" />
              </div>

              {/* Content */}
              <Card className="w-[calc(100%-4rem)] md:w-[45%] p-4 border-none bg-background shadow-lg">
                <CardHeader className="p-0 mb-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <CardTitle className="text-xl">{edu.degree}</CardTitle>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground font-mono">
                      <Calendar className="w-3 h-3" />
                      {edu.period}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-blue-500 font-semibold">{edu.school}</p>
                    {edu.location && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {edu.location}
                      </div>
                    )}
                  </div>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
