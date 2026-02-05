'use client'

import { GripVertical } from 'lucide-react'
import * as ResizablePrimitive from 'react-resizable-panels'

import { cn } from '@/lib/utils'

const ResizablePanelGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.Group>) => (
  <ResizablePrimitive.Group
    className={cn(
      'flex h-full w-full data-[panel-group-direction=vertical]:flex-col',
      className,
    )}
    {...props}
  />
)

ResizablePanelGroup.displayName = 'ResizablePanelGroup'

const ResizablePanel = ResizablePrimitive.Panel

// Simple handle stub - implement actual resizing when needed
const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  withHandle?: boolean
}) => (
  <div
    className={cn(
      'relative flex w-px items-center justify-center bg-border hover:bg-primary cursor-col-resize',
      withHandle && 'w-2',
      className,
    )}
    {...props}
  >
    <GripVertical className="h-4 w-3" />
  </div>
)

ResizableHandle.displayName = 'ResizableHandle'

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }