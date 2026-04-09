import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { 
  Download, 
  RefreshCw, 
  Database, 
  ArrowRight, 
  Copy, 
  Check, 
  FileJson, 
  Table, 
  BarChart,
  Info
} from "lucide-react";

const ETL_CODE = `import pandas as pd
from sqlalchemy import create_engine

# 1. EXTRACT
df = pd.read_csv("raw_sales_data.csv")

# 2. TRANSFORM
df["total_price"] = df["quantity"] * df["unit_price"]
df = df.dropna()

# 3. LOAD
engine = create_engine("postgresql://user:password@localhost:5432/sales_db")
df.to_sql("clean_sales", engine, if_exists="replace", index=False)`;

const stages = [
  {
    id: "extract",
    title: "Extract",
    icon: Download,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    description: "Ingesting raw CSV sales data from external sources.",
    details: "Handles multiple file formats and initial data validation."
  },
  {
    id: "transform",
    title: "Transform",
    icon: RefreshCw,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    description: "Cleaning data and calculating business metrics.",
    details: "Calculates total_price and removes null values for consistency."
  },
  {
    id: "load",
    title: "Load",
    icon: Database,
    color: "text-green-500",
    bg: "bg-green-500/10",
    description: "Loading structured data into PostgreSQL database.",
    details: "Ensures data integrity and prepares tables for analytics."
  }
];

export default function ETLPipelineDetail() {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(ETL_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-5xl mx-auto mt-12"
    >
      <Card className="border-none bg-secondary/10 backdrop-blur-sm overflow-hidden">
        <CardHeader className="border-b border-border/50 bg-secondary/20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <RefreshCw className="w-6 h-6 text-purple-500" />
                Python ETL Data Pipeline
              </CardTitle>
              <CardDescription className="mt-1">
                Automated data processing from raw ingestion to analytics-ready storage
              </CardDescription>
            </div>
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 px-3 py-1">
              Result: Clean dataset ready for analytics
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-10">
          {/* Problem/Solution Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-4 rounded-xl bg-destructive/5 border border-destructive/10">
              <h4 className="text-sm font-bold uppercase tracking-wider text-destructive mb-2">The Problem</h4>
              <p className="text-sm text-muted-foreground">
                Raw sales data is inconsistent, contains missing values, and lacks calculated metrics, making it unusable for direct business analysis.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/10">
              <h4 className="text-sm font-bold uppercase tracking-wider text-green-500 mb-2">The Solution</h4>
              <p className="text-sm text-muted-foreground">
                Built a robust ETL pipeline using Python (Pandas) and SQLAlchemy to automate data cleaning, metric calculation, and database loading.
              </p>
            </div>
          </div>

          {/* ETL Flow Diagram */}
          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 z-0" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              {stages.map((stage, index) => (
                <div key={stage.id} className="flex flex-col items-center group">
                  <div className={`w-16 h-16 rounded-2xl ${stage.bg} flex items-center justify-center mb-4 border border-border/50 group-hover:scale-110 transition-transform duration-300`}>
                    <stage.icon className={`w-8 h-8 ${stage.color}`} />
                  </div>
                  <div className="text-center bg-background p-4 rounded-xl border border-border shadow-sm w-full">
                    <h5 className="font-bold text-foreground mb-1">{stage.title}</h5>
                    <p className="text-xs text-muted-foreground mb-2">{stage.description}</p>
                    <div className="flex items-center justify-center gap-1 text-[10px] text-primary/60 font-medium">
                      <Info className="w-3 h-3" />
                      {stage.details}
                    </div>
                  </div>
                  {index < stages.length - 1 && (
                    <div className="md:hidden flex justify-center py-4">
                      <ArrowRight className="w-6 h-6 text-muted-foreground rotate-90" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Code Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Pipeline Implementation (Python)</h4>
              <Button variant="ghost" size="sm" onClick={copyCode} className="gap-2">
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                <span className="text-xs">{copied ? "Copied" : "Copy Code"}</span>
              </Button>
            </div>
            <div className="relative group">
              <pre className="p-6 rounded-xl bg-black/50 border border-border/50 font-mono text-sm overflow-x-auto text-blue-300/90 leading-relaxed">
                <code>{ETL_CODE}</code>
              </pre>
              <div className="absolute top-4 right-4 flex gap-2">
                <FileJson className="w-4 h-4 text-muted-foreground/30" />
                <Table className="w-4 h-4 text-muted-foreground/30" />
                <BarChart className="w-4 h-4 text-muted-foreground/30" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
