'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
} from 'recharts'
import { Button } from '@/components/ui/button'
import { Download, Filter, TrendingUp, ArrowUpRight, ArrowDownRight, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'

// --- Expanded Mock Data ---

const wasteByTypeData = [
  { type: 'Plastic', volume: 1450, recycled: 1100, energy: 200 },
  { type: 'Organic', volume: 2100, recycled: 1900, energy: 150 },
  { type: 'Metal', volume: 850, recycled: 810, energy: 40 },
  { type: 'Glass', volume: 620, recycled: 590, energy: 10 },
  { type: 'Paper', volume: 1100, recycled: 1020, energy: 50 },
  { type: 'E-Waste', volume: 300, recycled: 240, energy: 60 },
  { type: 'Hazmat', volume: 150, recycled: 30, energy: 100 },
]

const recyclingEfficiencyData = [
  { month: 'Jan', efficiency: 62, target: 70, cost: 4200 },
  { month: 'Feb', efficiency: 65, target: 70, cost: 4100 },
  { month: 'Mar', efficiency: 68, target: 70, cost: 3900 },
  { month: 'Apr', efficiency: 72, target: 75, cost: 3800 },
  { month: 'May', efficiency: 75, target: 75, cost: 3700 },
  { month: 'Jun', efficiency: 74, target: 75, cost: 3750 },
  { month: 'Jul', efficiency: 78, target: 80, cost: 3600 },
  { month: 'Aug', efficiency: 81, target: 80, cost: 3400 },
  { month: 'Sep', efficiency: 84, target: 80, cost: 3300 },
  { month: 'Oct', efficiency: 82, target: 85, cost: 3350 },
  { month: 'Nov', efficiency: 86, target: 85, cost: 3200 },
  { month: 'Dec', efficiency: 89, target: 85, cost: 3100 },
]

const binUsageHeatmapData = [
  { zone: 'Alpha (North)', Mon: 85, Tue: 88, Wed: 92, Thu: 78, Fri: 95, Sat: 65, Sun: 42 },
  { zone: 'Beta (Industrial)', Mon: 92, Tue: 94, Wed: 98, Thu: 91, Fri: 82, Sat: 30, Sun: 15 },
  { zone: 'Gamma (Residential)', Mon: 45, Tue: 50, Wed: 48, Thu: 52, Fri: 88, Sat: 96, Sun: 92 },
  { zone: 'Delta (Downtown)', Mon: 78, Tue: 82, Wed: 87, Thu: 75, Fri: 92, Sat: 88, Sun: 60 },
  { zone: 'Epsilon (Park)', Mon: 20, Tue: 25, Wed: 30, Thu: 28, Fri: 45, Sat: 90, Sun: 95 },
]

const driverPerformanceData = [
  { name: 'John Doe', onTime: 94, efficiency: 82, safety: 98, fuelEcon: 88 },
  { name: 'Jane Smith', onTime: 97, efficiency: 91, safety: 99, fuelEcon: 94 },
  { name: 'Mike Johnson', onTime: 82, efficiency: 75, safety: 92, fuelEcon: 70 },
  { name: 'Sarah Lee', onTime: 96, efficiency: 88, safety: 97, fuelEcon: 91 },
  { name: 'Chris Evans', onTime: 89, efficiency: 92, safety: 85, fuelEcon: 82 },
]

export default function AnalyticsPage() {
  return (
    <div className="p-8 space-y-8 bg-background min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 bg-primary/10 rounded-md text-primary">
              <TrendingUp size={18} />
            </div>
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Performance Hub</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground">Analytics & Reporting</h1>
          <p className="text-muted-foreground text-lg">Real-time waste management efficiency and driver metrics.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="shadow-sm border-border bg-card hover:bg-accent transition-all">
            <Calendar size={16} className="mr-2" /> Schedule Report
          </Button>
          <Button className="shadow-md bg-primary hover:bg-primary/90 text-primary-foreground transition-all">
            <Download size={16} className="mr-2" /> Download CSV
          </Button>
        </div>
      </div>

      {/* Modern Filter Bar */}
      <div className="flex flex-wrap items-center gap-3 p-2 bg-muted/30 border border-border rounded-2xl">
        <div className="flex items-center gap-2 px-3 py-1 text-muted-foreground border-r border-border mr-2">
          <Filter size={16} />
          <span className="text-sm font-medium">Global Filters</span>
        </div>
        {['FY 2025/26', 'All Regions', 'Fleet Wide', 'All Material Types'].map((label) => (
          <select 
            key={label}
            className="bg-card border-none text-sm font-medium rounded-lg px-3 py-2 ring-1 ring-border focus:ring-2 focus:ring-primary outline-none transition-all cursor-pointer hover:bg-accent"
          >
            <option>{label}</option>
            <option>Custom Range</option>
          </select>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Annual Waste Volume', val: '14,280 tons', trend: '+14.2%', up: true },
          { label: 'Diversion Rate', val: '82.4%', trend: '+3.1%', up: true },
          { label: 'CO2 Offset', val: '2,840 MT', trend: '+18%', up: true },
          { label: 'Operational OpEx', val: '$142,500', trend: '-4.2%', up: false },
        ].map((stat, i) => (
          <Card key={i} className="border-border/50 shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors">
                {stat.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tracking-tight">{stat.val}</div>
              <div className={cn(
                "flex items-center gap-1 text-sm mt-2 font-medium",
                stat.up === true ? "text-emerald-500" : stat.up === false ? "text-emerald-500" : "text-muted-foreground"
              )}>
                {stat.up === true ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                {stat.trend} <span className="text-muted-foreground font-normal ml-1">vs L/Y</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Waste Volume Chart */}
        <Card className="border-none shadow-xl bg-card/50 backdrop-blur-md ring-1 ring-border">
          <CardHeader>
            <CardTitle>Material Stream Composition</CardTitle>
            <CardDescription>Volume (tons) vs Recycled tonnage across all categories</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={wasteByTypeData} margin={{ top: 20 }}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={1}/>
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.6}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="type" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '12px', border: '1px solid hsl(var(--border))' }} 
                  cursor={{ fill: 'hsl(var(--muted)/0.4)' }}
                />
                <Legend iconType="circle" />
                <Bar name="Total Collected" dataKey="volume" radius={[6, 6, 0, 0]} fill="url(#barGradient)" barSize={35} />
                <Bar name="Successfully Recycled" dataKey="recycled" radius={[6, 6, 0, 0]} fill="hsl(var(--muted-foreground)/0.2)" barSize={35} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Efficiency Trend */}
        <Card className="border-none shadow-xl bg-card/50 backdrop-blur-md ring-1 ring-border">
          <CardHeader>
            <CardTitle>System Efficiency & Cost</CardTitle>
            <CardDescription>Recovery rate % vs. Processing cost per ton</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={recyclingEfficiencyData}>
                <defs>
                  <linearGradient id="colorEff" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Area name="Actual Efficiency %" type="monotone" dataKey="efficiency" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorEff)" />
                <Line name="Target Threshold" type="monotone" dataKey="target" stroke="hsl(var(--muted-foreground))" strokeDasharray="8 4" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Heatmap Section */}
        <Card className="border-none shadow-xl bg-card/50 ring-1 ring-border">
          <CardHeader>
            <CardTitle>Regional Fill Intensity</CardTitle>
            <CardDescription>Average bin capacity utilized by zone and day</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {binUsageHeatmapData.map((row) => (
                <div key={row.zone} className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <span className="text-xs font-bold text-foreground/80">{row.zone}</span>
                    <span className="text-[10px] text-muted-foreground font-mono">AVG: {Math.round((row.Mon + row.Sun)/2)}%</span>
                  </div>
                  <div className="flex gap-1.5">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => {
                      const value = row[day as keyof typeof row] as number
                      return (
                        <div
                          key={day}
                          className="group relative flex-1 h-12 rounded-md flex items-center justify-center transition-all hover:scale-110 hover:z-10 cursor-help"
                          style={{
                            backgroundColor: value > 90 ? 'hsl(var(--primary))' : value > 75 ? 'hsl(var(--primary)/0.7)' : value > 50 ? 'hsl(var(--primary)/0.4)' : 'hsl(var(--muted))',
                            color: value > 75 ? 'white' : 'hsl(var(--muted-foreground))'
                          }}
                        >
                          <span className="text-[10px] font-bold">{day[0]}</span>
                          <div className="absolute bottom-full mb-2 bg-popover text-popover-foreground text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity border border-border whitespace-nowrap z-20">
                            {day}: {value}% Full
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Radar Performance */}
        <Card className="border-none shadow-xl bg-card/50 ring-1 ring-border">
          <CardHeader>
            <CardTitle>Fleet Compliance Radar</CardTitle>
            <CardDescription>Normalized performance metrics for top 5 drivers</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart data={driverPerformanceData} margin={{ top: 20, right: 30, left: 30, bottom: 20 }}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="name" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
                <Radar name="Jane Smith" dataKey="onTime" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.4} />
                <Radar name="Operational Avg" dataKey="efficiency" stroke="hsl(var(--muted-foreground))" fill="transparent" strokeDasharray="4 4" />
                <Tooltip contentStyle={{ borderRadius: '12px' }} />
                <Legend verticalAlign="bottom" />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}