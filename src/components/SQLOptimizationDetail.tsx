import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Copy, Check, ChevronDown, ChevronUp, Zap, AlertCircle, Lightbulb } from "lucide-react";

const BEFORE_SQL = `SELECT * FROM orders 
WHERE YEAR(order_date) = 2024;`;

const AFTER_SQL = `SELECT order_id, customer_id, order_date, total_amount
FROM orders
WHERE order_date >= '2024-01-01'
AND order_date < '2025-01-01';`;

export default function SQLOptimizationDetail() {
  const [copiedBefore, setCopiedBefore] = useState(false);
  const [copiedAfter, setCopiedAfter] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const copyToClipboard = (text: string, type: 'before' | 'after') => {
    navigator.clipboard.writeText(text);
    if (type === 'before') {
      setCopiedBefore(true);
      setTimeout(() => setCopiedBefore(false), 2000);
    } else {
      setCopiedAfter(true);
      setTimeout(() => setCopiedAfter(false), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-5xl mx-auto"
    >
      <Card className="border-none bg-secondary/10 backdrop-blur-sm overflow-hidden">
        <CardHeader className="border-b border-border/50 bg-secondary/20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Zap className="w-6 h-6 text-yellow-500" />
                SQL Query Optimization
              </CardTitle>
              <CardDescription className="mt-1">
                Optimizing index-unfriendly queries for high-performance data retrieval
              </CardDescription>
            </div>
            <Badge variant="default" className="bg-green-500/10 text-green-500 border-green-500/20 px-3 py-1 text-sm font-bold">
              Performance Improvement: +25%
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-8">
          {/* Problem & Solution Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-destructive font-semibold text-sm uppercase tracking-wider">
                <AlertCircle className="w-4 h-4" />
                Problem
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Slow query using functions (<code>YEAR()</code>) on indexed columns, causing a <strong>full table scan</strong> instead of an index seek.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-green-500 font-semibold text-sm uppercase tracking-wider">
                <Lightbulb className="w-4 h-4" />
                Solution
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Rewrote the query using <strong>SARGable</strong> (Search ARGumentable) range filtering to enable efficient index usage.
              </p>
            </div>
          </div>

          {/* Side-by-Side Code Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Before */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Before (Non-SARGable)</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0" 
                  onClick={() => copyToClipboard(BEFORE_SQL, 'before')}
                >
                  {copiedBefore ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
              <div className="relative group">
                <pre className="p-4 rounded-lg bg-black/40 border border-destructive/20 font-mono text-sm overflow-x-auto text-destructive/90">
                  <code>{BEFORE_SQL}</code>
                </pre>
                <div className="absolute inset-0 border border-destructive/0 group-hover:border-destructive/30 rounded-lg transition-colors pointer-events-none" />
              </div>
            </div>

            {/* After */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-green-500">After (Optimized)</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0" 
                  onClick={() => copyToClipboard(AFTER_SQL, 'after')}
                >
                  {copiedAfter ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
              <div className="relative group">
                <pre className="p-4 rounded-lg bg-black/40 border border-green-500/20 font-mono text-sm overflow-x-auto text-green-400">
                  <code>{AFTER_SQL}</code>
                </pre>
                <div className="absolute inset-0 border border-green-500/0 group-hover:border-green-500/30 rounded-lg transition-colors pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Collapsible Explanation */}
          <div className="border-t border-border/50 pt-4">
            <Button
              variant="ghost"
              className="w-full flex justify-between items-center hover:bg-secondary/20"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <span className="font-semibold">Technical Deep Dive</span>
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
            
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="py-4 space-y-4 text-sm text-muted-foreground leading-relaxed">
                    <div className="p-4 rounded-lg bg-secondary/10 border border-border/50">
                      <h5 className="font-bold text-foreground mb-2">Why the "Before" query was slow:</h5>
                      <p>
                        When you wrap a column in a function like <code>YEAR(order_date)</code>, the database engine cannot use the index on <code>order_date</code> directly. It must calculate the year for <em>every single row</em> in the table to see if it matches 2024. This is called a <strong>Non-SARGable</strong> expression.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                      <h5 className="font-bold text-foreground mb-2">The Optimization Strategy:</h5>
                      <ul className="list-disc list-inside space-y-2">
                        <li><strong>Index Seek:</strong> By using a range (<code>&gt;= '2024-01-01'</code>), the engine can jump directly to the relevant part of the index.</li>
                        <li><strong>Column Selection:</strong> Replaced <code>SELECT *</code> with specific columns to reduce I/O and memory usage.</li>
                        <li><strong>SARGability:</strong> The column <code>order_date</code> is now "naked" (no functions applied), allowing the query optimizer to utilize the index statistics effectively.</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
