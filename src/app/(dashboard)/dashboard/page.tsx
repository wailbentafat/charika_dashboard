'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts'
import { 
  AlertTriangle, Trash2, TrendingUp, AlertCircle, 
  CheckCircle2, Clock, Filter, Download, Zap, Map as MapIcon
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const wasteVolumeData = [
  { type: 'Plastic', volume: 450, recycled: 380, fill: 'hsl(var(--primary))' },
  { type: 'Organic', volume: 680, recycled: 610, fill: '#3b82f6' },
  { type: 'Metal', volume: 320, recycled: 290, fill: '#8b5cf6' },
  { type: 'Glass', volume: 210, recycled: 205, fill: '#ec4899' },
  { type: 'Paper', volume: 540, recycled: 490, fill: '#f59e0b' },
  { type: 'E-Waste', volume: 120, recycled: 95, fill: '#64748b' },
]

const collectionTrends = [
  { time: '06:00', active: 12, backlog: 2 },
  { time: '09:00', active: 45, backlog: 5 },
  { time: '12:00', active: 38, backlog: 8 },
  { time: '15:00', active: 52, backlog: 3 },
  { time: '18:00', active: 30, backlog: 1 },
  { time: '21:00', active: 15, backlog: 0 },
]

const alerts = [
  { id: 1, type: 'overflow', message: 'Bin #402 (Zone A) at 98% capacity', severity: 'critical', time: '2m ago' },
  { id: 2, type: 'route', message: 'Vehicle #12 delayed by traffic on Route B', severity: 'high', time: '14m ago' },
  { id: 3, type: 'sensor', message: 'Low battery on Sensor #88 (Zone C)', severity: 'medium', time: '1h ago' },
  { id: 4, type: 'unauthorized', message: 'Bin lid opened at Zone E (Outside Hours)', severity: 'high', time: '2h ago' },
]

const activityLog = [
  { id: 1, user: 'Driver 04', action: 'Completed Route 12', time: 'Just now' },
  { id: 2, user: 'System', action: 'Optimized Zone B Routes', time: '12m ago' },
  { id: 3, user: 'Driver 09', action: 'Reported Broken Lid (Bin 201)', time: '45m ago' },
]

export default function DashboardPage() {
  return (
    <div className="p-8 space-y-8 bg-background min-h-screen max-w-[1600px] mx-auto">
      
      {/* Dynamic Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
            <Zap size={14} /> System Live
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight">Operation Overview</h1>
          <p className="text-muted-foreground">Monitor real-time fleet logistics and waste distribution.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="bg-card shadow-sm"><Filter size={16} className="mr-2" /> Filters</Button>
          <Button className="shadow-md shadow-primary/20"><Download size={16} className="mr-2" /> Export Report</Button>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Active Fleet', val: '42 / 48', sub: '87% utilization', icon: TrendingUp, color: 'text-primary' },
          { label: 'Overflow Risk', val: '18', sub: 'Bins > 90% full', icon: AlertCircle, color: 'text-destructive' },
          { label: 'Carbon Offset', val: '4.2 tons', sub: 'Daily target: 5.0', icon: CheckCircle2, color: 'text-emerald-500' },
          { label: 'Avg Pick Time', val: '4.5 min', sub: '↓ 0.8m from yesterday', icon: Clock, color: 'text-blue-500' },
        ].map((kpi, i) => (
          <Card key={i} className="relative overflow-hidden group border-border/50 shadow-sm hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-[10px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors">
                {kpi.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={cn("text-3xl font-bold tracking-tight", kpi.color)}>{kpi.val}</div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1 font-medium">
                {kpi.sub}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Analytics Center */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Real-time Collections Area Chart */}
        <Card className="lg:col-span-2 border-none shadow-xl bg-card/50 ring-1 ring-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Fleet Activity Load</CardTitle>
              <CardDescription>Live vehicle activity vs backlog across 24h</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-1.5 text-[10px] font-bold"><div className="w-2 h-2 rounded-full bg-primary" /> ACTIVE</div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold"><div className="w-2 h-2 rounded-full bg-muted-foreground/30" /> BACKLOG</div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={collectionTrends}>
                <defs>
                  <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '12px', border: '1px solid hsl(var(--border))' }}
                />
                <Area type="monotone" dataKey="active" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorActive)" />
                <Area type="monotone" dataKey="backlog" stroke="hsl(var(--muted-foreground))" strokeWidth={2} fillOpacity={0.1} fill="hsl(var(--muted-foreground))" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Waste Composition Pie/Bar */}
        <Card className="border-none shadow-xl bg-card/50 ring-1 ring-border">
          <CardHeader>
            <CardTitle>Material Streams</CardTitle>
            <CardDescription>Volume (kg) by material type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={wasteVolumeData} layout="vertical" margin={{ left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                <XAxis type="number" hide />
                <YAxis dataKey="type" type="category" axisLine={false} tickLine={false} tick={{fontSize: 11, fontWeight: 'bold'}} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="volume" radius={[0, 4, 4, 0]} barSize={20}>
                  {wasteVolumeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Actions Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Alerts Panel */}
        <Card className="border-destructive/20 shadow-xl bg-destructive/[0.02]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle size={20} /> Critical Response
            </CardTitle>
            <span className="text-[10px] font-bold bg-destructive/10 text-destructive px-2 py-0.5 rounded-full">4 UNRESOLVED</span>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-center gap-4 p-3 bg-card border border-border rounded-xl group hover:border-destructive/30 transition-all">
                <div className={cn(
                  "p-2 rounded-lg shrink-0",
                  alert.severity === 'critical' ? "bg-red-500/10 text-red-600" : "bg-orange-500/10 text-orange-600"
                )}>
                  <AlertCircle size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold truncate">{alert.message}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">{alert.time}</p>
                </div>
                <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 h-8 text-xs">Dispatch</Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card className="border-border/50 shadow-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">System Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-muted">
              {activityLog.map((log) => (
                <div key={log.id} className="relative pl-8">
                  <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">{log.action}</p>
                    <p className="text-xs text-muted-foreground font-medium">{log.user} • {log.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-6 text-xs font-bold text-muted-foreground hover:text-primary">
              View Full Audit Log
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}