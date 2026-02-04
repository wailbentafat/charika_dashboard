'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, AreaChart, Area, Cell 
} from 'recharts'
import { 
  TrendingUp, AlertTriangle, MapPin, DollarSign, 
  Zap, Target, BrainCircuit, ArrowRight, Sparkles, ShieldCheck 
} from 'lucide-react'
import { cn } from '@/lib/utils'

// --- Enhanced Mock Data ---
const overflowPredictionData = [
  { bin: 'BIN-001', currentFill: 95, predictedDays: 0.5, risk: 'Critical', zone: 'Downtown' },
  { bin: 'BIN-004', currentFill: 88, predictedDays: 1.2, risk: 'High', zone: 'West End' },
  { bin: 'BIN-012', currentFill: 78, predictedDays: 2.5, risk: 'Medium', zone: 'North Park' },
  { bin: 'BIN-028', currentFill: 72, predictedDays: 3.1, risk: 'Medium', zone: 'Industrial' },
  { bin: 'BIN-045', currentFill: 65, predictedDays: 4.0, risk: 'Low', zone: 'East Side' },
]

const optimizationMetrics = [
  { category: 'Route Distance', current: 1420, optimized: 1080, unit: 'km' },
  { category: 'Fuel Burn', current: 520, optimized: 390, unit: 'L' },
  { category: 'CO2 Emission', current: 12.4, optimized: 9.1, unit: 't' },
]

const recyclingProjectionData = [
  { month: 'Jan', current: 62, predicted: 62 },
  { month: 'Feb', current: 65, predicted: 68 },
  { month: 'Mar', current: 68, predicted: 74 },
  { month: 'Apr', current: null, predicted: 79 },
  { month: 'May', current: null, predicted: 83 },
  { month: 'Jun', current: null, predicted: 88 },
]

export default function DecisionSupportPage() {
  return (
    <div className="p-8 space-y-8 bg-background min-h-screen max-w-[1600px] mx-auto">
      
      {/* AI Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-card border border-border p-6 rounded-2xl shadow-sm overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8 opacity-5 text-primary">
          <BrainCircuit size={120} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-[0.2em] mb-2">
            <Sparkles size={14} /> Intelligence Engine Active
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight">Decision Support</h1>
          <p className="text-muted-foreground mt-1 max-w-xl">
            Our neural model has processed 48,000 data points to generate these fleet and resource optimizations.
          </p>
        </div>
        <div className="flex gap-3 relative z-10">
          <Button variant="outline" className="h-12 px-6">Model Settings</Button>
          <Button className="h-12 px-6 bg-primary shadow-lg shadow-primary/20">Apply All Optimizations</Button>
        </div>
      </div>

      {/* Primary Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { 
            title: 'Critical Risk', 
            desc: '4 Bins require immediate pickup', 
            action: 'Generate Route', 
            icon: AlertTriangle, 
            theme: 'text-destructive bg-destructive/10 border-destructive/20' 
          },
          { 
            title: 'Efficiency Gain', 
            desc: 'Save 24% on today\'s fuel cost', 
            action: 'Optimize Fleet', 
            icon: Zap, 
            theme: 'text-amber-600 bg-amber-500/10 border-amber-500/20' 
          },
          { 
            title: 'Compliance', 
            desc: 'ESG target 85% is within reach', 
            action: 'View Strategy', 
            icon: ShieldCheck, 
            theme: 'text-emerald-600 bg-emerald-500/10 border-emerald-500/20' 
          },
        ].map((card, i) => (
          <Card key={i} className={cn("border shadow-none transition-transform hover:scale-[1.02]", card.theme)}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 rounded-lg bg-background/50">
                  <card.icon size={24} />
                </div>
                <ArrowRight size={16} className="opacity-40" />
              </div>
              <h3 className="text-lg font-bold">{card.title}</h3>
              <p className="text-sm opacity-80 mb-4 font-medium">{card.desc}</p>
              <Button variant="secondary" className="w-full bg-background/80 hover:bg-background shadow-sm text-xs font-bold uppercase tracking-wider">
                {card.action}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Overflow Prediction - Redesigned as a Visual List */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <Card className="lg:col-span-3 border-border shadow-md overflow-hidden bg-card">
          <CardHeader className="border-b border-border bg-muted/30">
            <CardTitle>Sensor-Based Overflow Forecast</CardTitle>
            <CardDescription>Predicted time to full capacity based on current disposal velocity.</CardDescription>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/10">
                  <th className="px-6 py-4 text-[10px] font-black uppercase text-muted-foreground tracking-widest text-left">Asset</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase text-muted-foreground tracking-widest text-left">Fill Level</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase text-muted-foreground tracking-widest text-left">Est. Time</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase text-muted-foreground tracking-widest text-center">Risk</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {overflowPredictionData.map((bin) => (
                  <tr key={bin.bin} className="hover:bg-accent/50 transition-colors cursor-default">
                    <td className="px-6 py-4">
                      <div className="font-mono text-sm font-bold">{bin.bin}</div>
                      <div className="text-[10px] text-muted-foreground font-semibold">{bin.zone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-2 bg-muted rounded-full overflow-hidden border border-border">
                          <div 
                            className={cn("h-full transition-all duration-1000", bin.currentFill > 90 ? "bg-destructive" : "bg-primary")} 
                            style={{ width: `${bin.currentFill}%` }} 
                          />
                        </div>
                        <span className="text-xs font-bold">{bin.currentFill}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium italic text-muted-foreground">~{bin.predictedDays} days</td>
                    <td className="px-6 py-4 text-center">
                      <span className={cn(
                        "px-2 py-1 rounded text-[10px] font-black uppercase tracking-tighter ring-1 ring-inset",
                        bin.risk === 'Critical' ? "bg-red-500/10 text-red-600 ring-red-500/20" : "bg-orange-500/10 text-orange-600 ring-orange-500/20"
                      )}>
                        {bin.risk}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Route Optimization Impact */}
        <Card className="lg:col-span-2 border-border shadow-md bg-card">
          <CardHeader>
            <CardTitle>Optimization ROI</CardTitle>
            <CardDescription>Estimated savings with AI routing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-2">
            {optimizationMetrics.map((m) => (
              <div key={m.category} className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  <span>{m.category}</span>
                  <span className="text-primary">-{Math.round((1 - m.optimized / m.current) * 100)}%</span>
                </div>
                <div className="h-6 bg-muted rounded-md relative overflow-hidden group">
                  <div className="absolute inset-y-0 left-0 bg-muted-foreground/20 rounded-md transition-all group-hover:bg-muted-foreground/30" style={{ width: '100%' }} />
                  <div className="absolute inset-y-0 left-0 bg-primary rounded-md shadow-sm transition-all" style={{ width: `${(m.optimized / m.current) * 100}%` }} />
                  <div className="absolute inset-0 flex items-center justify-between px-3 text-[10px] font-bold text-foreground">
                    <span>{m.optimized} {m.unit} (Opt)</span>
                    <span className="opacity-50">{m.current} {m.unit}</span>
                  </div>
                </div>
              </div>
            ))}
            <div className="bg-primary/5 p-4 rounded-xl border border-primary/20 mt-4">
              <p className="text-xs font-bold text-primary mb-1 uppercase tracking-widest">Projection</p>
              <p className="text-lg font-bold">Estimated Monthly Savings: $14,200</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Future Projections Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recycling Rate Trend Chart */}
        <Card className="lg:col-span-2 border-border shadow-md bg-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Sustainability Path</CardTitle>
              <CardDescription>Actual vs predicted recycling rate growth</CardDescription>
            </div>
            <Target className="text-muted-foreground/20" size={32} />
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={recyclingProjectionData}>
                <defs>
                  <linearGradient id="colorRec" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 11, fontWeight: 'bold'}} />
                <YAxis domain={[50, 100]} axisLine={false} tickLine={false} tick={{fontSize: 11}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '12px', border: '1px solid hsl(var(--border))' }}
                />
                <Area type="monotone" dataKey="predicted" stroke="#10b981" strokeWidth={3} strokeDasharray="5 5" fill="url(#colorRec)" />
                <Area type="monotone" dataKey="current" stroke="#10b981" strokeWidth={3} fill="#10b981" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bin Placement Logic */}
        <Card className="border-border shadow-md bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 italic">
              <MapPin className="text-primary" size={20} /> Expansion Zones
            </CardTitle>
            <CardDescription>AI-identified coverage gaps.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { zone: 'Zone F - Mall District', reason: '92% Average Saturation', type: 'Add 3 Bins' },
              { zone: 'Zone E - New Suburb', reason: 'Predicted Pop. Growth', type: 'Add 1 Hub' },
              { zone: 'Zone A - Rail Station', reason: 'High Footfall/Paper', type: 'Recycling Hub' },
            ].map((rec, i) => (
              <div key={i} className="group p-4 bg-muted/30 hover:bg-muted/50 border border-transparent hover:border-border rounded-xl transition-all">
                <div className="flex justify-between items-start mb-1">
                  <p className="font-bold text-sm text-foreground">{rec.zone}</p>
                  <span className="text-[10px] font-black text-primary uppercase">{rec.type}</span>
                </div>
                <p className="text-xs text-muted-foreground italic font-medium">Reason: {rec.reason}</p>
              </div>
            ))}
            <Button className="w-full mt-2 font-bold text-xs" variant="secondary">Run New Placement Simulation</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}