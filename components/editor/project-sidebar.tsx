"use client"

import { FolderOpen, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ProjectSidebarProps {
  isOpen: boolean
  onClose: () => void
}

/**
 * Render the fixed left "Projects" sidebar with tabbed "My Projects" and "Shared" views and a primary "New Project" action.
 *
 * @param isOpen - Controls whether the sidebar is visible (applies slide-in/out transform)
 * @param onClose - Callback invoked when the sidebar's close button is clicked
 * @returns The sidebar JSX element
 */
export function ProjectSidebar({ isOpen, onClose }: ProjectSidebarProps) {
  if (!isOpen) return null

  return (
    <aside
      className="fixed left-0 top-0 z-50 h-screen w-72 bg-bg-elevated border-r border-border-default flex flex-col"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-border-default">
        <span className="text-sm font-medium text-text-primary">Projects</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          aria-label="Close sidebar"
          className="h-7 w-7 text-text-muted hover:text-text-primary"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>

      <div className="flex-1 flex flex-col px-3 pt-3 min-h-0">
        <Tabs defaultValue="my-projects" className="flex-1 flex flex-col">
          <TabsList className="w-full">
            <TabsTrigger value="my-projects" className="flex-1 text-xs">
              My Projects
            </TabsTrigger>
            <TabsTrigger value="shared" className="flex-1 text-xs">
              Shared
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="my-projects"
            className="flex-1 flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-2 text-center px-4">
              <FolderOpen className="h-8 w-8 text-text-faint" />
              <p className="text-sm text-text-muted">No projects yet</p>
            </div>
          </TabsContent>

          <TabsContent
            value="shared"
            className="flex-1 flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-2 text-center px-4">
              <FolderOpen className="h-8 w-8 text-text-faint" />
              <p className="text-sm text-text-muted">No shared projects</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="p-3 border-t border-border-default">
        <Button variant="default" className="w-full gap-2">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>
    </aside>
  )
}
