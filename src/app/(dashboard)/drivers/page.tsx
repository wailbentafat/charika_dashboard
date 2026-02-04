'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Plus, MoreVertical, MapPin, Clock, TrendingUp, 
  Search, Truck, ShieldCheck, AlertCircle, Phone, 
  ExternalLink, User, Gauge, History 
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

// --- Extended Mock Data ---
const mockDrivers = [
  { id: 'DRV-001', name: 'John Doe', status: 'on-route', assignedBins: 45, collectionsToday: 12, avgDelay: 5, onTime: 94, fuel: 8.2, missed: 1, phone: '+1 555-0101', vehicle: 'Truck-A1' },
  { id: 'DRV-002', name: 'Jane Smith', status: 'online', assignedBins: 52, collectionsToday: 8, avgDelay: 3, onTime: 97, fuel: 8.5, missed: 0, phone: '+1 555-0102', vehicle: 'Truck-B4' },
  { id: 'DRV-003', name: 'Mike Johnson', status: 'offline', assignedBins: 38, collectionsToday: 5, avgDelay: 12, onTime: 87, fuel: 7.8, missed: 3, phone: '+1 555-0103', vehicle: 'Truck-C2' },
  { id: 'DRV-004', name: 'Sarah Lee', status: 'on-route', assignedBins: 48, collectionsToday: 10, avgDelay: 4, onTime: 96, fuel: 8.4, missed: 0, phone: '+1 555-0104', vehicle: 'Truck-A5' },
  { id: 'DRV-005', name: 'Robert Chen', status: 'online', assignedBins: 50, collectionsToday: 15, avgDelay: 2, onTime: 99, fuel: 8.9, missed: 0, phone: '+1 555-0105', vehicle: 'Truck-D1' },
  { id: 'DRV-006', name: 'Elena Rodriguez', status: 'on-route', assignedBins: 42, collectionsToday: 9, avgDelay: 8, onTime: 91, fuel: 7.9, missed: 1, phone: '+1 555-0106', vehicle: 'Truck-B2' },
]

export default function DriversPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDriver, setSelectedDriver] = useState<typeof mockDrivers[0] | null>(null)

  const filteredDrivers = mockDrivers.filter(d =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) || d.id.includes(searchTerm)
  )

  return (
    <div className="p-8 space-y-8 bg-background min-h-screen max-w-[1600px] mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">Fleet Personnel</h1>
          <p className="text-muted-foreground text-lg">Managing {mockDrivers.length} active operators across 4 zones.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="shadow-sm border-border bg-card">Export Metrics</Button>
          <Button className="bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:opacity-90">
            <Plus size={18} className="mr-2" /> Add Driver
          </Button>
        </div>
      </div>

      {/* Fleet Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Drivers On-Route', val: '12', sub: 'Active now', icon: Truck, color: 'text-blue-500' },
          { label: 'Fleet Health', val: '96.4%', sub: 'Avg On-time', icon: Gauge, color: 'text-emerald-500' },
          { label: 'Assigned Bins', val: '412', sub: 'Total capacity', icon: MapPin, color: 'text-primary' },
          { label: 'Critical Delays', val: '2', sub: 'Needs attention', icon: AlertCircle, color: 'text-destructive' },
        ].map((stat, i) => (
          <div key={i} className="bg-card border border-border p-5 rounded-2xl flex items-center gap-5 shadow-sm">
            <div className={cn("p-3 rounded-xl bg-muted/50", stat.color)}> <stat.icon size={24} /> </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.1em] text-muted-foreground">{stat.label}</p>
              <p className={cn("text-2xl font-bold", stat.color)}>{stat.val}</p>
              <p className="text-xs text-muted-foreground font-medium">{stat.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Drivers Main Table */}
        <Card className="lg:col-span-8 border-border bg-card/50 backdrop-blur-sm shadow-xl overflow-hidden">
          <CardHeader className="bg-muted/20 border-b border-border">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <CardTitle className="text-xl">Operator Directory</CardTitle>
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <Input 
                  placeholder="Filter drivers..." 
                  className="pl-10 bg-background border-border"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border bg-muted/10">
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Driver / ID</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Live Status</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-center">Load</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-center">Performance</th>
                  <th className="px-6 py-4 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredDrivers.map((driver) => (
                  <tr
                    key={driver.id}
                    onClick={() => setSelectedDriver(driver)}
                    className={cn(
                      "hover:bg-accent/40 cursor-pointer transition-all group",
                      selectedDriver?.id === driver.id ? "bg-primary/[0.03] border-l-4 border-l-primary" : "border-l-4 border-l-transparent"
                    )}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-bold text-primary group-hover:bg-primary/10 transition-colors">
                          {driver.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-bold text-foreground leading-none">{driver.name}</p>
                          <p className="text-[10px] font-mono text-muted-foreground mt-1 uppercase">{driver.id} • {driver.vehicle}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-tighter ring-1 ring-inset",
                        driver.status === 'on-route' ? "bg-blue-500/10 text-blue-500 ring-blue-500/20" : 
                        driver.status === 'online' ? "bg-emerald-500/10 text-emerald-500 ring-emerald-500/20" : 
                        "bg-muted text-muted-foreground ring-border"
                      )}>
                        <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", 
                          driver.status === 'on-route' ? "bg-blue-500" : driver.status === 'online' ? "bg-emerald-500" : "bg-muted-foreground"
                        )} />
                        {driver.status.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <p className="text-sm font-bold text-foreground">{driver.collectionsToday}</p>
                      <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter">of {driver.assignedBins} bins</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col items-center gap-1">
                        <span className={cn(
                          "text-xs font-black",
                          driver.onTime > 90 ? "text-emerald-500" : "text-amber-500"
                        )}>{driver.onTime}%</span>
                        <div className="w-16 h-1 bg-muted rounded-full overflow-hidden">
                          <div className={cn("h-full transition-all", driver.onTime > 90 ? "bg-emerald-500" : "bg-amber-500")} style={{ width: `${driver.onTime}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="icon" className="text-muted-foreground group-hover:text-primary transition-colors">
                        <ExternalLink size={16} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Dynamic Details Sidebar */}
        <div className="lg:col-span-4 h-full">
          {selectedDriver ? (
            <Card className="border-border shadow-2xl bg-card animate-in fade-in slide-in-from-right-4 duration-300 sticky top-8">
              <div className="h-32 bg-muted relative overflow-hidden rounded-t-xl">
                {/* Simulated Map Background */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-background to-background" />
                <div className="absolute inset-0 flex items-center justify-center">
                   <MapPin className="text-primary animate-bounce" size={32} />
                </div>
              </div>
              
              <CardHeader className="text-center -mt-12 relative pb-2">
                <div className="w-20 h-20 rounded-2xl bg-card border-4 border-background shadow-lg mx-auto flex items-center justify-center text-2xl font-black text-primary mb-2">
                  {selectedDriver.name[0]}
                </div>
                <CardTitle className="text-2xl font-extrabold tracking-tight">{selectedDriver.name}</CardTitle>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{selectedDriver.id}</span>
                  <div className="w-1 h-1 rounded-full bg-muted-foreground" />
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{selectedDriver.vehicle}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-6 pt-4">
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-10 text-xs font-bold gap-2">
                    <Phone size={14} /> Call Driver
                  </Button>
                  <Button className="h-10 text-xs font-bold gap-2">
                    <History size={14} /> Activity
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/30 rounded-2xl border border-border/50">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Fuel Economy</p>
                    <p className="text-xl font-bold flex items-baseline gap-1">
                      {selectedDriver.fuel} <span className="text-xs font-medium text-muted-foreground uppercase">km/L</span>
                    </p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-2xl border border-border/50">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Avg Delay</p>
                    <p className="text-xl font-bold flex items-baseline gap-1">
                      {selectedDriver.avgDelay} <span className="text-xs font-medium text-muted-foreground uppercase">min</span>
                    </p>
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="text-emerald-500" size={16} />
                      <span className="text-sm font-bold">Reliability Score</span>
                    </div>
                    <span className="text-sm font-black text-emerald-500">EXCELLENT</span>
                  </div>
                  
                  <div className="space-y-2 bg-muted/50 p-4 rounded-xl border border-border/50">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-muted-foreground">Today's Progress</span>
                      <span>{selectedDriver.collectionsToday} / {selectedDriver.assignedBins}</span>
                    </div>
                    <div className="h-2 bg-background rounded-full overflow-hidden border border-border/50">
                      <div className="h-full bg-primary" style={{ width: `${(selectedDriver.collectionsToday / selectedDriver.assignedBins) * 100}%` }} />
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-primary h-12 text-sm font-bold shadow-lg shadow-primary/20">
                  Open Real-Time Route View
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-dashed border-2 border-border bg-muted/10 h-[500px] flex flex-col items-center justify-center p-8 text-center sticky top-8">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4 text-muted-foreground">
                <User size={32} />
              </div>
              <h3 className="text-lg font-bold">No Driver Focus</h3>
              <p className="text-xs text-muted-foreground mt-1 max-w-[200px]">Select a driver from the list to view live telemetry, fuel efficiency, and route progress.</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}