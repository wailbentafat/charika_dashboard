'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Plus, MoreVertical, Trash2, Edit2, Search, 
  Trash, Info, AlertTriangle, CheckCircle2, MapPin, Truck 
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const mockBins = [
  { id: 'BIN-001', location: 'Zone A - Main St', type: 'Organic', fillLevel: 95, status: 'active', lastCollection: '2h ago', driver: 'John Doe' },
  { id: 'BIN-002', location: 'Zone B - Park Ave', type: 'Plastic', fillLevel: 65, status: 'active', lastCollection: '4h ago', driver: 'Jane Smith' },
  { id: 'BIN-003', location: 'Zone C - River Rd', type: 'Mixed', fillLevel: 42, status: 'active', lastCollection: '1d ago', driver: 'Mike Johnson' },
  { id: 'BIN-004', location: 'Zone D - Oak Ln', type: 'Metal', fillLevel: 88, status: 'maintenance', lastCollection: '6h ago', driver: 'Sarah Lee' },
  { id: 'BIN-005', location: 'Zone A - Station', type: 'Glass', fillLevel: 12, status: 'active', lastCollection: '15m ago', driver: 'John Doe' },
  { id: 'BIN-006', location: 'Zone E - High St', type: 'Paper', fillLevel: 78, status: 'inactive', lastCollection: '3d ago', driver: 'N/A' },
  { id: 'BIN-007', location: 'Zone B - Mall', type: 'Plastic', fillLevel: 91, status: 'active', lastCollection: '1h ago', driver: 'Jane Smith' },
]

const mockRecyclingPoints = [
  { id: 'RP-001', name: 'Central Recycling Hub', materials: ['Plastic', 'Paper', 'Glass', 'Metal'], capacity: 5000, usageRate: 72, location: 'Downtown HQ', health: 'Excellent' },
  { id: 'RP-002', name: 'Community Center', materials: ['Organic', 'Paper'], capacity: 3000, usageRate: 58, location: 'Midtown East', health: 'Good' },
  { id: 'RP-003', name: 'North Industrial Port', materials: ['Metal', 'Hazmat', 'E-Waste'], capacity: 12000, usageRate: 89, location: 'North Harbor', health: 'Critical' },
  { id: 'RP-004', name: 'Green Way Center', materials: ['Glass', 'Organic'], capacity: 2500, usageRate: 15, location: 'West Park', health: 'Excellent' },
]

export default function BinsPage() {
  const [activeTab, setActiveTab] = useState<'bins' | 'recycling'>('bins')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredBins = mockBins.filter(b => 
    b.location.toLowerCase().includes(searchTerm.toLowerCase()) || b.id.includes(searchTerm)
  )

  return (
    <div className="p-8 space-y-8 bg-background min-h-screen max-w-[1600px] mx-auto">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground">Assets & Inventory</h1>
          <p className="text-muted-foreground text-lg">Real-time status of {mockBins.length} bins and {mockRecyclingPoints.length} hubs.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-64 hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <Input 
              placeholder="Quick search..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-card border-border"
            />
          </div>
          <Button className="bg-primary text-primary-foreground shadow-lg hover:opacity-90">
            <Plus size={18} className="mr-2" /> Add Asset
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Critical Bins (>90%)', val: '3', color: 'text-destructive', icon: AlertTriangle },
          { label: 'Active Drivers', val: '12', color: 'text-primary', icon: Truck },
          { label: 'Avg Fill Level', val: '54%', color: 'text-foreground', icon: Trash },
          { label: 'System Health', val: '98.2%', color: 'text-emerald-500', icon: CheckCircle2 },
        ].map((s, i) => (
          <div key={i} className="bg-card border border-border p-4 rounded-xl flex items-center gap-4 shadow-sm">
            <div className={cn("p-2 rounded-lg bg-muted", s.color)}> <s.icon size={20} /> </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{s.label}</p>
              <p className={cn("text-xl font-bold", s.color)}>{s.val}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex p-1 bg-muted/50 w-fit rounded-xl border border-border">
        <button
          onClick={() => setActiveTab('bins')}
          className={cn(
            "px-6 py-2 text-sm font-semibold rounded-lg transition-all",
            activeTab === 'bins' ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
          )}
        >
          Waste Bins
        </button>
        <button
          onClick={() => setActiveTab('recycling')}
          className={cn(
            "px-6 py-2 text-sm font-semibold rounded-lg transition-all",
            activeTab === 'recycling' ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
          )}
        >
          Recycling Points
        </button>
      </div>

     
      {activeTab === 'bins' ? (
        <Card className="border-border shadow-md overflow-hidden bg-card/50 backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-muted/30 border-b border-border">
                  <th className="px-6 py-4 text-xs font-bold uppercase text-muted-foreground">Reference</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-muted-foreground">Location & Driver</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-muted-foreground">Material</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-muted-foreground">Capacity</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-muted-foreground">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredBins.map((bin) => (
                  <tr key={bin.id} className="hover:bg-accent/30 transition-colors group">
                    <td className="px-6 py-4 font-mono text-sm font-bold text-primary">{bin.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-foreground">{bin.location}</span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Truck size={12} /> {bin.driver}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">{bin.type}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 min-w-[100px] h-2 bg-muted rounded-full overflow-hidden border border-border/50">
                          <div
                            className={cn(
                              "h-full transition-all duration-500",
                              bin.fillLevel > 90 ? "bg-destructive" : bin.fillLevel > 70 ? "bg-orange-500" : "bg-primary"
                            )}
                            style={{ width: `${bin.fillLevel}%` }}
                          />
                        </div>
                        <span className={cn(
                          "text-xs font-bold w-8",
                          bin.fillLevel > 90 ? "text-destructive" : "text-foreground"
                        )}>{bin.fillLevel}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-tighter ring-1 ring-inset",
                        bin.status === 'active' ? "bg-emerald-500/10 text-emerald-500 ring-emerald-500/20" : 
                        bin.status === 'maintenance' ? "bg-orange-500/10 text-orange-500 ring-orange-500/20" : 
                        "bg-muted text-muted-foreground ring-border"
                      )}>
                        <div className={cn("w-1.5 h-1.5 rounded-full", 
                          bin.status === 'active' ? "bg-emerald-500" : bin.status === 'maintenance' ? "bg-orange-500" : "bg-muted-foreground"
                        )} />
                        {bin.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                          <Edit2 size={14} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {mockRecyclingPoints.map((point) => (
            <Card key={point.id} className="group border-border hover:shadow-xl hover:border-primary/20 transition-all duration-300 overflow-hidden">
              <div className={cn(
                "h-1 w-full",
                point.health === 'Critical' ? "bg-destructive" : "bg-primary"
              )} />
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl font-bold">{point.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <MapPin size={12} /> {point.location}
                    </CardDescription>
                  </div>
                  <span className={cn(
                    "text-[10px] px-2 py-0.5 rounded font-bold uppercase",
                    point.health === 'Critical' ? "bg-destructive/10 text-destructive" : "bg-emerald-500/10 text-emerald-500"
                  )}>{point.health} Health</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 pt-4">
                <div className="grid grid-cols-2 gap-4 bg-muted/30 p-3 rounded-lg">
                  <div>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tight">Capacity</p>
                    <p className="text-sm font-bold">{point.capacity.toLocaleString()} kg</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tight">Load</p>
                    <p className="text-sm font-bold text-primary">{point.usageRate}% utilized</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-foreground mb-3 uppercase tracking-wider">Accepted Stream</p>
                  <div className="flex flex-wrap gap-1.5">
                    {point.materials.map((m) => (
                      <span key={m} className="px-2 py-1 bg-background border border-border rounded text-[10px] font-medium text-muted-foreground group-hover:border-primary/30 transition-colors">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 bg-transparent hover:bg-accent text-xs h-9">Manage Assets</Button>
                  <Button variant="secondary" className="px-3 h-9">
                    <MoreVertical size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {/* Add Hub Placeholder Card */}
          <button className="border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center p-8 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all group">
            <div className="p-4 bg-muted rounded-full group-hover:bg-primary/10 mb-3 transition-colors">
              <Plus size={32} />
            </div>
            <p className="font-bold">Register New Hub</p>
            <p className="text-xs">Expand your recycling network</p>
          </button>
        </div>
      )}
    </div>
  )
}