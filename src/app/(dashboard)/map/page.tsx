'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  MapPin, Filter, Trash2, Clock, User, 
  Search, Navigation, AlertTriangle, 
  Info, Layers, Maximize2, Activity
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import {
  Map,
  MapMarker,
  MarkerContent,
  MarkerTooltip,
  MarkerPopup,
  MapControls,
} from '@/components/ui/map'

interface Bin {
  id: string
  location: string
  fillLevel: number
  type: 'Organic' | 'Plastic' | 'Mixed' | 'Metal' | 'Glass'
  lastCollection: string
  driver: string
  latitude: number
  longitude: number
  battery: number
}

const mockBins: Bin[] = [
  { id: 'BIN-772', location: 'Didouche Mourad, Algiers', fillLevel: 95, type: 'Organic', lastCollection: '2h ago', driver: 'John Doe', latitude: 36.7538, longitude: 3.0588, battery: 82 },
  { id: 'BIN-104', location: 'The Casbah, Algiers', fillLevel: 65, type: 'Plastic', lastCollection: '4h ago', driver: 'Jane Smith', latitude: 36.7794, longitude: 3.0500, battery: 12 },
  { id: 'BIN-901', location: 'City Center, Oran', fillLevel: 42, type: 'Mixed', lastCollection: '1d ago', driver: 'Mike Johnson', latitude: 35.6911, longitude: -0.6417, battery: 94 },
  { id: 'BIN-332', location: 'Cirta, Constantine', fillLevel: 88, type: 'Metal', lastCollection: '6h ago', driver: 'Sarah Lee', latitude: 36.3650, longitude: 6.6147, battery: 65 },
  { id: 'BIN-005', location: 'Bab El Oued, Algiers', fillLevel: 15, type: 'Glass', lastCollection: '3h ago', driver: 'John Doe', latitude: 36.7833, longitude: 3.0600, battery: 45 },
]

export default function MapPage() {
  const [selectedBin, setSelectedBin] = useState<Bin | null>(null)
  const [filterType, setFilterType] = useState('all')
  const [search, setSearch] = useState('')

  const filteredBins = useMemo(() => {
    return mockBins.filter(bin => {
      const matchesFilter = filterType === 'all' || bin.type === filterType
      const matchesSearch = bin.id.toLowerCase().includes(search.toLowerCase()) || 
                            bin.location.toLowerCase().includes(search.toLowerCase())
      return matchesFilter && matchesSearch
    })
  }, [filterType, search])

  return (
    <div className="p-8 space-y-8 bg-background min-h-screen max-w-[1600px] mx-auto">
      
      {/* Header with Live Status Pulse */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 text-primary">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest">Live Telemetry</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight">Interactive Network</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <Input 
              placeholder="Find bin ID..." 
              className="pl-10 w-64 bg-card border-border shadow-sm h-11"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button className="h-11 px-6 shadow-lg shadow-primary/20">
            <Navigation size={18} className="mr-2" /> Optimize All Routes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        
        {/* Map Interface Area */}
        <div className="xl:col-span-3 relative group">
          <Card className="h-[750px] overflow-hidden border-none shadow-2xl relative">
            <Map center={[3.0, 36.7]} zoom={12}>
              <MapControls 
                showZoom={true}
                showLocate={true}
                showCompass={true}
                showFullscreen={true}
                position="top-right"
              />
              
              {/* Filter Buttons Overlay */}
              <div className="absolute top-6 left-6 z-10 space-y-2 pointer-events-none">
                <div className="flex flex-wrap gap-2 pointer-events-auto">
                  {['All', 'Organic', 'Plastic', 'Glass', 'Metal'].map(t => (
                    <Button 
                      key={t}
                      variant={filterType === t || (t === 'All' && filterType === 'all') ? 'default' : 'secondary'}
                      size="sm"
                      className="rounded-full font-bold text-[10px] uppercase h-8 px-4 shadow-md"
                      onClick={() => setFilterType(t.toLowerCase())}
                    >
                      {t}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Additional Map Action Buttons */}
              <div className="absolute top-6 right-20 z-10 flex flex-col gap-2 pointer-events-none">
                <Button size="icon" variant="secondary" className="bg-card shadow-md h-10 w-10 pointer-events-auto"><Layers size={18} /></Button>
                <Button size="icon" variant="secondary" className="bg-card shadow-md h-10 w-10 pointer-events-auto"><Maximize2 size={18} /></Button>
              </div>

              {/* Real Map Markers */}
              {filteredBins.map((bin) => (
                <MapMarker
                  key={bin.id}
                  longitude={bin.longitude}
                  latitude={bin.latitude}
                  onClick={() => setSelectedBin(bin)}
                >
                  <MarkerContent>
                    <div className="relative">
                      {bin.fillLevel > 80 && (
                        <div className="absolute inset-0 bg-destructive rounded-full animate-ping opacity-40 scale-150" />
                      )}
                      <div className={cn(
                        "w-10 h-10 rounded-2xl border-2 border-white shadow-xl flex items-center justify-center transition-colors cursor-pointer hover:scale-110",
                        bin.fillLevel > 80 ? "bg-destructive" : bin.fillLevel > 50 ? "bg-amber-500" : "bg-emerald-500"
                      )}>
                        <Trash2 size={18} className="text-white" />
                        <div className="absolute -bottom-1 -right-1 px-1 rounded bg-white text-[8px] font-black border border-border shadow-sm">
                          {bin.fillLevel}%
                        </div>
                      </div>
                    </div>
                  </MarkerContent>
                  <MarkerTooltip>
                    <div className="text-sm space-y-1">
                      <p className="font-medium">{bin.id}</p>
                      <p className="text-muted-foreground">{bin.location}</p>
                      <p className="text-xs">Fill: {bin.fillLevel}%</p>
                    </div>
                  </MarkerTooltip>
                  <MarkerPopup>
                    <div className="w-64 space-y-3">
                      {/* Header */}
                      <div className="flex items-center justify-between border-b pb-2">
                        <div>
                          <h3 className="font-semibold text-base">{bin.id}</h3>
                          <p className="text-xs text-muted-foreground">{bin.location}</p>
                        </div>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center`}
                          style={{ backgroundColor: bin.fillLevel > 80 ? '#dc3545' : bin.fillLevel > 50 ? '#f0ad4e' : '#34b27b' }}
                        >
                          <Trash2 size={14} className="text-white" />
                        </div>
                      </div>

                      {/* Fill Level */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Fill Level</span>
                          <span className="font-medium">{bin.fillLevel}%</span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full transition-all duration-300"
                            style={{ 
                              width: `${bin.fillLevel}%`,
                              backgroundColor: bin.fillLevel > 80 ? '#dc3545' : bin.fillLevel > 50 ? '#f0ad4e' : '#34b27b'
                            }}
                          />
                        </div>
                      </div>

                      {/* Other Info */}
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Type</p>
                          <p className="font-medium">{bin.type}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Last Collection</p>
                          <p className="font-medium">{bin.lastCollection}</p>
                        </div>
                      </div>

                      {/* Driver Info */}
                      <div className="flex items-center gap-2 text-sm">
                        <User size={14} className="text-muted-foreground" />
                        <span className="text-muted-foreground">Driver:</span>
                        <span className="font-medium">{bin.driver}</span>
                      </div>

                      {/* Action Button */}
                      <Button className="w-full bg-primary text-white hover:bg-primary/90 text-sm">
                        Schedule Collection
                      </Button>
                    </div>
                  </MarkerPopup>
                </MapMarker>
              ))}

              {/* Floating Legend */}
              <div className="absolute bottom-6 left-6 bg-card/80 backdrop-blur-md p-4 rounded-xl border border-border shadow-lg space-y-3 min-w-[140px] pointer-events-none">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground border-b pb-2">Status Key</p>
                <div className="space-y-2">
                  {[
                    { label: 'Critical (>80%)', color: 'bg-destructive' },
                    { label: 'Moderate (50-80%)', color: 'bg-amber-500' },
                    { label: 'Normal (<50%)', color: 'bg-emerald-500' }
                  ].map(item => (
                    <div key={item.label} className="flex items-center gap-2">
                      <div className={cn("w-2 h-2 rounded-full", item.color)} />
                      <span className="text-[10px] font-bold text-foreground/80">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Map>
          </Card>
        </div>

        {/* Dynamic Detail Panel */}
        <div className="xl:col-span-1 space-y-6">
          {selectedBin ? (
            <Card className="border-border shadow-xl bg-card animate-in slide-in-from-bottom-4 duration-300">
              <CardHeader className="pb-4 relative overflow-hidden rounded-t-xl">
                <div className={cn(
                  "absolute inset-0 opacity-5", 
                  selectedBin.fillLevel > 80 ? "bg-destructive" : "bg-primary"
                )} />
                <div className="relative">
                  <div className="flex justify-between items-start mb-4">
                    <Badge variant="outline" className="bg-background/50 font-mono tracking-tighter">
                      {selectedBin.id}
                    </Badge>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setSelectedBin(null)}>
                      <Layers size={14} className="rotate-45" />
                    </Button>
                  </div>
                  <CardTitle className="text-2xl font-bold">{selectedBin.location}</CardTitle>
                  <CardDescription className="font-medium text-primary mt-1 flex items-center gap-1">
                    <MapPin size={12} /> Live Coordinates Verified
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="space-y-6 pt-2">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1 bg-muted/30 p-3 rounded-xl border border-border/50">
                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Battery</p>
                    <div className="flex items-center gap-2">
                      <div className={cn("text-lg font-bold", selectedBin.battery < 20 ? "text-destructive" : "text-foreground")}>
                        {selectedBin.battery}%
                      </div>
                      <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                        <div className={cn("h-full", selectedBin.battery < 20 ? "bg-destructive" : "bg-primary")} style={{ width: `${selectedBin.battery}%` }} />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1 bg-muted/30 p-3 rounded-xl border border-border/50">
                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Last Pickup</p>
                    <p className="text-lg font-bold">{selectedBin.lastCollection}</p>
                  </div>
                </div>

                {/* Fill Capacity Visual */}
                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Current Saturation</p>
                    <span className={cn("text-2xl font-black", selectedBin.fillLevel > 80 ? "text-destructive" : "text-emerald-500")}>
                      {selectedBin.fillLevel}%
                    </span>
                  </div>
                  <div className="h-4 bg-muted rounded-lg border border-border overflow-hidden p-0.5">
                    <div 
                      className={cn(
                        "h-full rounded-[4px] transition-all duration-1000",
                        selectedBin.fillLevel > 80 ? "bg-destructive" : selectedBin.fillLevel > 50 ? "bg-amber-500" : "bg-emerald-500"
                      )} 
                      style={{ width: `${selectedBin.fillLevel}%` }} 
                    />
                  </div>
                </div>

                {/* Driver Context */}
                <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-2xl border border-primary/10">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-black">
                    {selectedBin.driver[0]}
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Assigned Operator</p>
                    <p className="text-sm font-bold">{selectedBin.driver}</p>
                  </div>
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-primary"><Info size={16} /></Button>
                </div>

                <div className="space-y-2 pt-2">
                  <Button className="w-full h-12 font-bold shadow-md">Dispatch Immediate Pickup</Button>
                  <Button variant="outline" className="w-full h-12 font-bold border-border">Report Sensor Issue</Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="h-full border-dashed border-2 bg-muted/10 flex flex-col items-center justify-center p-8 text-center min-h-[400px]">
              <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mb-4 text-muted-foreground rotate-3">
                <Activity size={32} />
              </div>
              <h3 className="text-lg font-bold">Node Monitoring Offline</h3>
              <p className="text-[11px] text-muted-foreground mt-2 max-w-[200px]">
                Click any asset marker on the map to begin real-time sensor diagnostics and operational management.
              </p>
            </Card>
          )}

          {/* Map Statistics Mini-Card */}
          {!selectedBin && (
            <Card className="bg-card shadow-md border-border p-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4">Coverage Stats</p>
              <div className="space-y-4">
                {[
                  { label: 'Active Sensors', val: '1,240', color: 'text-primary' },
                  { label: 'Avg Fill Rate', val: '42%', color: 'text-emerald-500' },
                  { label: 'Offline Nodes', val: '3', color: 'text-destructive' }
                ].map(stat => (
                  <div key={stat.label} className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-muted-foreground">{stat.label}</span>
                    <span className={cn("font-bold text-sm", stat.color)}>{stat.val}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}