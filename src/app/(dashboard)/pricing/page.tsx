'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Plus, Edit2, Trash2, AlertCircle, 
  Settings2, Calculator, ArrowDownCircle, 
  CheckCircle2, XCircle, Info, DollarSign,
  GripVertical, Percent
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

// --- Enhanced Mock Data ---
interface PricingRule {
  id: string
  name: string
  type: 'Waste Type' | 'Volume' | 'Time' | 'Bulk'
  condition: string
  basePrice: number
  multiplier: number
  description: string
  active: boolean
}

const mockRules: PricingRule[] = [
  { id: 'RULE-001', name: 'Standard Rate', type: 'Waste Type', condition: 'All Categories', basePrice: 0.5, multiplier: 1.0, description: 'Default baseline price for collection.', active: true },
  { id: 'RULE-002', name: 'Bulk Plastic Discount', type: 'Volume', condition: 'Plastic > 50kg', basePrice: 0.5, multiplier: 0.9, description: 'Reduction for large-scale plastic recycling.', active: true },
  { id: 'RULE-003', name: 'Peak Surcharge', type: 'Time', condition: '09:00 - 17:00', basePrice: 0.5, multiplier: 1.15, description: 'Traffic & demand adjustment for business hours.', active: true },
  { id: 'RULE-004', name: 'Organic Premium', type: 'Waste Type', condition: 'Organic / Compost', basePrice: 0.65, multiplier: 1.0, description: 'Increased handling cost for organic waste.', active: false },
]

export default function PricingPage() {
  const [showNewRuleForm, setShowNewRuleForm] = useState(false)
  const [activeTab, setActiveTab] = useState<'rules' | 'calculator'>('rules')

  return (
    <div className="p-8 space-y-8 bg-background min-h-screen max-w-[1400px] mx-auto">
      
      {/* Header with System Status */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
            <Settings2 size={14} /> Global Rates
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight">Pricing Engine</h1>
          <p className="text-muted-foreground">Manage dynamic multipliers and logistical surcharges.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-11 shadow-sm"><Info size={16} className="mr-2" /> Documentation</Button>
          <Button onClick={() => setShowNewRuleForm(!showNewRuleForm)} className="h-11 shadow-lg shadow-primary/20 px-6">
            <Plus size={18} className="mr-2" /> Create Rule
          </Button>
        </div>
      </div>

      {/* Logic Alert Banner */}
      <div className="bg-primary/[0.03] border border-primary/20 rounded-2xl p-4 flex gap-4 items-center">
        <div className="bg-primary/10 p-2 rounded-lg text-primary shrink-0">
          <AlertCircle size={20} />
        </div>
        <p className="text-sm font-medium text-foreground/80">
          <span className="font-bold text-primary">Priority Logic:</span> Our engine uses <span className="underline decoration-primary/30 underline-offset-4">Waterfall Processing</span>. 
          Rules at the top are applied first. Final pricing is calculated as: $Base \times Multiplier$.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Rules Stack - Left Side */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Create Rule Form (Condensed & Modern) */}
          {showNewRuleForm && (
            <Card className="border-primary/30 shadow-xl bg-card animate-in fade-in slide-in-from-top-4 duration-300 overflow-hidden">
              <CardHeader className="bg-primary/[0.02] border-b border-border">
                <CardTitle className="text-lg flex items-center gap-2 italic">
                  <Plus className="text-primary" size={20} /> New Logic Definition
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Rule Name</label>
                    <Input placeholder="e.g., Seasonal Winter Rate" className="h-10 border-border" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Type</label>
                    <select className="w-full h-10 px-3 bg-background border border-border rounded-md text-sm">
                      <option>Waste Type</option>
                      <option>Volume</option>
                      <option>Time Window</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Logic Condition</label>
                    <Input placeholder="e.g., Weight > 100kg" className="h-10 border-border" />
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1 space-y-2">
                      <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Base ($)</label>
                      <Input type="number" placeholder="0.50" className="h-10" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Multiplier</label>
                      <Input type="number" placeholder="1.0" step="0.05" className="h-10" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <Button variant="ghost" onClick={() => setShowNewRuleForm(false)}>Discard</Button>
                  <Button className="px-8">Deploy Rule</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Rules List */}
          <div className="space-y-4 relative">
            {mockRules.map((rule, idx) => (
              <div key={rule.id} className="relative group">
                {idx < mockRules.length - 1 && (
                  <div className="absolute left-[26px] top-[72px] bottom-[-24px] w-[2px] bg-muted-foreground/10 group-hover:bg-primary/20 transition-colors z-0" />
                )}
                
                <Card className={cn(
                  "relative z-10 border-border shadow-sm transition-all group-hover:shadow-md group-hover:border-primary/20",
                  !rule.active && "opacity-60 grayscale"
                )}>
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row items-stretch">
                      {/* Priority Icon */}
                      <div className="w-14 bg-muted/30 flex flex-col items-center justify-center border-r border-border shrink-0 gap-2">
                        <GripVertical size={16} className="text-muted-foreground/30" />
                        <span className="text-[10px] font-black text-muted-foreground">{idx + 1}</span>
                      </div>
                      
                      {/* Rule Info */}
                      <div className="flex-1 p-5">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <div className="flex items-center gap-3">
                              <h3 className="text-lg font-bold tracking-tight">{rule.name}</h3>
                              <span className={cn(
                                "text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter",
                                rule.active ? "bg-emerald-500/10 text-emerald-600" : "bg-muted text-muted-foreground"
                              )}>
                                {rule.active ? 'Active' : 'Inactive'}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground font-medium mt-1">{rule.description}</p>
                          </div>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary"><Edit2 size={14} /></Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive"><Trash2 size={14} /></Button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-2">
                          <div className="space-y-1">
                            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Category</p>
                            <p className="text-sm font-bold flex items-center gap-1.5"><CheckCircle2 size={14} className="text-primary" /> {rule.type}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Logic</p>
                            <p className="text-sm font-mono font-bold bg-muted/50 px-1.5 rounded">{rule.condition}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Rate Change</p>
                            <p className={cn(
                              "text-sm font-black",
                              rule.multiplier > 1 ? "text-amber-600" : rule.multiplier < 1 ? "text-emerald-600" : "text-foreground"
                            )}>
                              {rule.multiplier > 1 ? '+' : rule.multiplier < 1 ? '-' : ''}
                              {Math.abs(Math.round((1 - rule.multiplier) * 100))}%
                            </p>
                          </div>
                          <div className="space-y-1 text-right">
                            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Calculated Rate</p>
                            <p className="text-lg font-black text-primary">${(rule.basePrice * rule.multiplier).toFixed(2)}<span className="text-[10px] text-muted-foreground ml-1">/kg</span></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Price Sandbox - Right Side */}
        <div className="lg:col-span-4 sticky top-8">
          <Card className="border-border shadow-2xl bg-card overflow-hidden">
            <CardHeader className="bg-muted/30 border-b border-border">
              <div className="flex items-center gap-2">
                <Calculator className="text-primary" size={20} />
                <CardTitle className="text-lg">Price Sandbox</CardTitle>
              </div>
              <CardDescription>Test the current rule stack logic.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Simulate Waste Stream</label>
                  <select className="w-full h-11 px-3 bg-background border border-border rounded-xl text-sm font-bold outline-none ring-primary/20 focus:ring-2">
                    <option>Mixed Plastic</option>
                    <option>Organic Waste</option>
                    <option>Industrial Metal</option>
                    <option>Bulk Glass</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Simulate Weight (kg)</label>
                  <div className="relative">
                    <Input type="number" defaultValue="85" className="h-11 rounded-xl font-bold pr-12 border-border" />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-black text-muted-foreground">KG</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Collection Time</label>
                  <div className="flex gap-2">
                    <Button variant="secondary" className="flex-1 text-[10px] font-black rounded-lg border border-border bg-background">OFF-PEAK</Button>
                    <Button variant="secondary" className="flex-1 text-[10px] font-black rounded-lg border border-primary/40 bg-primary/5 text-primary">PEAK (9-5)</Button>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-border space-y-4">
                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  <span>Calculation Audit</span>
                  <Percent size={14} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-muted-foreground">Base Rate (85kg @ $0.50)</span>
                    <span className="font-mono">$42.50</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium text-emerald-600">
                    <span className="flex items-center gap-1.5"><ArrowDownCircle size={14} /> Bulk Plastic (-10%)</span>
                    <span className="font-mono">-$4.25</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium text-amber-600">
                    <span className="flex items-center gap-1.5"><Plus size={14} className="rotate-45" /> Peak Surcharge (+15%)</span>
                    <span className="font-mono">+$6.38</span>
                  </div>
                </div>

                <div className="bg-primary p-4 rounded-2xl shadow-inner text-primary-foreground relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-500">
                    <DollarSign size={80} />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Estimated Quote</p>
                  <p className="text-4xl font-black mt-1">$44.63</p>
                  <div className="mt-3 pt-3 border-t border-white/20 text-[10px] italic font-medium">
                    *Quote subject to final weight verification.
                  </div>
                </div>
              </div>

              <Button className="w-full h-12 bg-card border border-border text-foreground hover:bg-muted font-bold text-xs uppercase tracking-widest shadow-sm">
                Export Quote as PDF
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}