"use client"

import { useState } from "react"
import { EditorNavbar } from "./editor-navbar"
import { ProjectSidebar } from "./project-sidebar"
import { ProjectDialogs } from "./project-dialogs"
import { useProjectDialogs, ProjectDialogContext } from "@/hooks/use-project-dialogs"

interface EditorShellProps {
  children: React.ReactNode
}

export function EditorShell({ children }: EditorShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const dialogs = useProjectDialogs()

  return (
    <ProjectDialogContext.Provider value={dialogs}>
      <div className="h-screen bg-bg-base flex flex-col overflow-hidden">
        <EditorNavbar
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        />
        <ProjectSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <main className="flex-1 pt-12 overflow-hidden">{children}</main>
        <ProjectDialogs />
      </div>
    </ProjectDialogContext.Provider>
  )
}
