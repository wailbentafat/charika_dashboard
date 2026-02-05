'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

// Simple stub chart components to allow build to succeed
// Replace with actual recharts implementation when needed

const ChartContainer = React.forwardRef<any, any>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('w-full h-full', className)} {...props} />
))
ChartContainer.displayName = 'ChartContainer'

const ChartTooltip = React.forwardRef<any, any>(({ children, ...props }, ref) => (
  <div ref={ref} {...props}>
    {children}
  </div>
))
ChartTooltip.displayName = 'ChartTooltip'

const ChartTooltipContent = React.forwardRef<any, any>(({ children, className, ...props }, ref) => (
  <div ref={ref} className={cn('bg-popover border rounded-md shadow-md p-3', className)} {...props}>
    {children}
  </div>
))
ChartTooltipContent.displayName = 'ChartTooltipContent'

export { ChartContainer, ChartTooltip, ChartTooltipContent }