"use client"

import { useState } from "react"
import { EditorNavbar } from "./editor-navbar"
import { ProjectSidebar } from "./project-sidebar"

interface EditorShellProps {
  children: React.ReactNode
}

/**
 * Provides the editor layout including a top navbar, a project sidebar, and a main content area.
 *
 * The component manages the sidebar open/close state and wires toggle/close handlers to the navbar and sidebar.
 *
 * @param children - Content to render inside the main editor area
 * @returns The editor shell element containing the navbar, project sidebar, and main content container
 */
export function EditorShell({ children }: EditorShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
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
    </div>
  )
}
