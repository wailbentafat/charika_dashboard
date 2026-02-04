'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Plus, ChevronLeft, ChevronRight, X, 
  Calendar as CalendarIcon, Users, MapPin, 
  Clock, ArrowRight, ClipboardList, Filter
} from 'lucide-react'
import { cn } from '@/lib/utils'

// --- Enhanced Mock Data ---
const mockEvents = [
  { id: 'EVT-001', date: '2024-02-05', title: 'Zone A Collection', type: 'collection', drivers: ['John Doe', 'Jane Smith'], notes: 'Standard weekly organic collection', time: '06:00 AM' },
  { id: 'EVT-002', date: '2024-02-06', title: 'Bin Maintenance - Zone D', type: 'maintenance', drivers: ['Mike Johnson'], notes: 'Quarterly sensor maintenance check', time: '09:00 AM' },
  { id: 'EVT-003', date: '2024-02-08', title: 'Green City Campaign', type: 'campaign', drivers: [], notes: 'Community awareness event at Main Square', time: '02:00 PM' },
  { id: 'EVT-004', date: '2024-02-10', title: 'Hazmat Training', type: 'recycling', drivers: ['Sarah Lee', 'Chris Evans'], notes: 'Specialized material handling certs', time: '11:30 AM' },
  { id: 'EVT-005', date: '2024-02-14', title: 'Vehicle Inspection', type: 'maintenance', drivers: ['Mike Johnson'], notes: 'Annual safety fleet check', time: '08:00 AM' },
]

const typeConfig = {
  collection: { color: 'bg-blue-500/10 text-blue-600 border-blue-200 ring-blue-500', dot: 'bg-blue-500' },
  maintenance: { color: 'bg-orange-500/10 text-orange-600 border-orange-200 ring-orange-500', dot: 'bg-orange-500' },
  campaign: { color: 'bg-purple-500/10 text-purple-600 border-purple-200 ring-purple-500', dot: 'bg-purple-500' },
  recycling: { color: 'bg-emerald-500/10 text-emerald-600 border-emerald-200 ring-emerald-500', dot: 'bg-emerald-500' },
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 1, 1))
  const [selectedEvent, setSelectedEvent] = useState<typeof mockEvents[0] | null>(null)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()
  const calendarDays = Array.from({ length: firstDay }, () => null).concat(Array.from({ length: daysInMonth }, (_, i) => i + 1))

  const getEventsForDate = (day: number) => {
    const dateStr = `2024-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return mockEvents.filter((e) => e.date === dateStr)
  }

  return (
    <div className="p-8 space-y-8 bg-background min-h-screen max-w-[1600px] mx-auto">
      
      {/* Dynamic Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 bg-primary/10 rounded-md text-primary">
              <CalendarIcon size={18} />
            </div>
            <span className="text-xs font-bold text-primary uppercase tracking-widest">Operations Schedule</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground">Fleet Calendar</h1>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="hidden sm:flex border-border bg-card">
            <Filter size={16} className="mr-2" /> Filter Views
          </Button>
          <Button className="bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:opacity-90 transition-all">
            <Plus size={18} className="mr-2" /> New Entry
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Main Calendar View */}
        <Card className="xl:col-span-3 border-border bg-card/50 backdrop-blur-sm shadow-xl">
          <CardHeader className="border-b border-border/50 pb-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-2xl font-bold">
                  {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </CardTitle>
                <CardDescription>Click a date to manage local events</CardDescription>
              </div>
              <div className="flex items-center bg-muted/50 p-1 rounded-xl border border-border">
                <Button variant="ghost" size="icon" onClick={prevMonth} className="rounded-lg h-9 w-9">
                  <ChevronLeft size={18} />
                </Button>
                <Button variant="ghost" className="text-xs font-bold px-4 h-9 uppercase tracking-tighter hover:bg-transparent">Today</Button>
                <Button variant="ghost" size="icon" onClick={nextMonth} className="rounded-lg h-9 w-9">
                  <ChevronRight size={18} />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {/* Weekday Labels */}
            <div className="grid grid-cols-7 border-b border-border bg-muted/20">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="py-3 text-center text-[10px] font-black uppercase tracking-widest text-muted-foreground/70">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7">
              {calendarDays.map((day, idx) => {
                const events = day ? getEventsForDate(day) : []
                const dateStr = day ? `2024-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}` : null
                const isSelected = selectedDate === dateStr

                return (
                  <div
                    key={idx}
                    onClick={() => day && setSelectedDate(dateStr)}
                    className={cn(
                      "min-h-[140px] p-3 border-r border-b border-border transition-all duration-200 cursor-pointer relative group",
                      !day && "bg-muted/30 pointer-events-none",
                      isSelected ? "bg-primary/[0.03]" : "hover:bg-accent/40"
                    )}
                  >
                    {day && (
                      <>
                        <span className={cn(
                          "inline-flex items-center justify-center w-7 h-7 text-sm font-bold rounded-full mb-2 transition-colors",
                          isSelected ? "bg-primary text-primary-foreground" : "text-foreground/60 group-hover:text-foreground"
                        )}>
                          {day}
                        </span>
                        <div className="space-y-1.5">
                          {events.map((event) => (
                            <div
                              key={event.id}
                              onClick={(e) => { e.stopPropagation(); setSelectedEvent(event); }}
                              className={cn(
                                "text-[10px] px-2 py-1.5 rounded-md border shadow-sm flex items-center gap-1.5 transition-transform hover:scale-[1.02]",
                                typeConfig[event.type as keyof typeof typeConfig].color
                              )}
                            >
                              <div className={cn("w-1.5 h-1.5 rounded-full shrink-0", typeConfig[event.type as keyof typeof typeConfig].dot)} />
                              <span className="truncate font-bold uppercase tracking-tighter">{event.title}</span>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Sidebar: Details & Legend */}
        <div className="space-y-6">
          {/* Detailed Context Panel */}
          {selectedEvent ? (
            <Card className="border-primary/20 shadow-2xl bg-card animate-in fade-in slide-in-from-right-4 duration-300">
              <CardHeader className="pb-4 relative overflow-hidden rounded-t-xl">
                <div className={cn(
                  "absolute inset-0 opacity-5", 
                  typeConfig[selectedEvent.type as keyof typeof typeConfig].color.split(' ')[0]
                )} />
                <div className="flex justify-between items-start relative">
                  <div className={cn(
                    "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border mb-3",
                    typeConfig[selectedEvent.type as keyof typeof typeConfig].color
                  )}>
                    {selectedEvent.type}
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setSelectedEvent(null)} className="h-6 w-6 -mr-2">
                    <X size={14} />
                  </Button>
                </div>
                <CardTitle className="text-xl font-bold leading-tight">{selectedEvent.title}</CardTitle>
                <div className="flex items-center gap-2 text-muted-foreground text-xs mt-2">
                  <Clock size={12} /> {selectedEvent.time} — {selectedEvent.date}
                </div>
              </CardHeader>
              <CardContent className="space-y-6 pt-4 border-t border-border/50">
                <div className="space-y-3">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Assigned Personnel</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedEvent.drivers.length > 0 ? (
                      selectedEvent.drivers.map((d) => (
                        <div key={d} className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-lg border border-border">
                          <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
                            {d[0]}
                          </div>
                          <span className="text-xs font-semibold">{d}</span>
                        </div>
                      ))
                    ) : (
                      <span className="text-xs text-muted-foreground italic">No drivers assigned</span>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Description</p>
                  <div className="bg-muted/30 p-4 rounded-xl text-sm leading-relaxed border border-border/50 italic text-foreground/80">
                    "{selectedEvent.notes}"
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button className="flex-1 text-xs font-bold h-10 shadow-md">Edit Task</Button>
                  <Button variant="outline" className="flex-1 text-xs font-bold h-10 border-destructive/20 text-destructive hover:bg-destructive/10">Archive</Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-dashed border-2 border-border bg-muted/10">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4 text-muted-foreground">
                  <ClipboardList size={24} />
                </div>
                <h3 className="text-sm font-bold">No Event Selected</h3>
                <p className="text-[11px] text-muted-foreground mt-1 max-w-[180px]">Select a calendar item to view operational details and assignments.</p>
              </CardContent>
            </Card>
          )}

          {/* Quick Legend Card */}
          <Card className="border-border bg-card/50">
            <CardHeader className="py-4">
              <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground">Category Map</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pb-6">
              {Object.entries(typeConfig).map(([type, config]) => (
                <div key={type} className="flex items-center justify-between group cursor-help">
                  <div className="flex items-center gap-3">
                    <div className={cn("w-2 h-2 rounded-full", config.dot)} />
                    <span className="text-xs font-bold capitalize text-foreground/80 group-hover:text-primary transition-colors">{type}</span>
                  </div>
                  <ArrowRight size={12} className="text-muted-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}