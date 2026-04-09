import { motion } from "motion/react";
import { resumeData } from "../data/resume";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Badge } from "./ui/badge";
import { Database, Cloud, BarChart3 } from "lucide-react";
import SQLOptimizationDetail from "./SQLOptimizationDetail";
import ETLPipelineDetail from "./ETLPipelineDetail";

const icons = [Database, Cloud, BarChart3];

export default function Projects() {
  // Projects that are explicitly featured with their own detailed components
  const featuredTitles = ["SQL Optimization Project", "Data Pipeline Project"];
  
  // Projects to show in the grid (excluding the ones featured above)
  const gridProjects = resumeData.projects.filter(p => 
    !featuredTitles.includes(p.title)
  );

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Featured Case Studies</h2>
          <p className="text-muted-foreground">In-depth look at technical solutions and engineering workflows</p>
        </div>

        {/* Featured SQL Optimization Project */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6 justify-center md:justify-start">
            <Badge variant="outline" className="text-primary border-primary/20">SQL Performance</Badge>
          </div>
          <SQLOptimizationDetail />
        </div>

        {/* Featured ETL Pipeline Project */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6 justify-center md:justify-start">
            <Badge variant="outline" className="text-primary border-primary/20">Data Engineering</Badge>
          </div>
          <ETLPipelineDetail />
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-bold mb-6 text-center md:text-left">Additional Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {gridProjects.map((project, index) => {
              const Icon = icons[index % icons.length];
              return (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full flex flex-col border-none bg-secondary/20 hover:bg-secondary/30 transition-all duration-300 group">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{project.problem}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-4">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Approach</h4>
                        <p className="text-sm leading-relaxed">{project.approach}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Tools Used</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.tools.map(tool => (
                            <Badge key={tool} variant="secondary" className="font-mono text-[10px]">
                              {tool}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="pt-4 border-t border-border/50">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-2">Results</h4>
                        <p className="text-sm font-medium">{project.results}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
