"use client"

import { FolderOpen, Pencil, Plus, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useProjectDialogContext } from "@/hooks/use-project-dialogs"
import { MOCK_PROJECTS, MOCK_SHARED_PROJECTS, type MockProject } from "@/types/project"

interface ProjectSidebarProps {
  isOpen: boolean
  onClose: () => void
}

function ProjectItem({
  project,
  showActions,
}: {
  project: MockProject
  showActions: boolean
}) {
  const { openRename, openDelete } = useProjectDialogContext()

  return (
    <div className="group flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-bg-subtle cursor-pointer">
      <FolderOpen className="h-4 w-4 text-text-muted shrink-0" />
      <span className="flex-1 text-sm text-text-primary truncate">
        {project.name}
      </span>
      {showActions && (
        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon-xs"
            className="text-text-muted hover:text-text-primary"
            aria-label={`Rename ${project.name}`}
            onClick={(e) => {
              e.stopPropagation()
              openRename(project)
            }}
          >
            <Pencil className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon-xs"
            className="text-text-muted hover:text-state-error"
            aria-label={`Delete ${project.name}`}
            onClick={(e) => {
              e.stopPropagation()
              openDelete(project)
            }}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      )}
    </div>
  )
}

export function ProjectSidebar({ isOpen, onClose }: ProjectSidebarProps) {
  const { openCreate } = useProjectDialogContext()

  if (!isOpen) return null

  return (
    <>
      {/* Mobile backdrop scrim */}
      <div
        className="fixed inset-0 z-40 bg-black/50 sm:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      <aside className="fixed left-0 top-0 z-50 h-screen w-72 bg-bg-elevated border-r border-border-default flex flex-col">
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
              className="flex-1 overflow-y-auto mt-2"
            >
              {MOCK_PROJECTS.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-2 text-center px-4">
                  <FolderOpen className="h-8 w-8 text-text-faint" />
                  <p className="text-sm text-text-muted">No projects yet</p>
                </div>
              ) : (
                <div className="flex flex-col gap-0.5">
                  {MOCK_PROJECTS.map((project) => (
                    <ProjectItem
                      key={project.id}
                      project={project}
                      showActions={project.isOwner}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent
              value="shared"
              className="flex-1 overflow-y-auto mt-2"
            >
              {MOCK_SHARED_PROJECTS.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-2 text-center px-4">
                  <FolderOpen className="h-8 w-8 text-text-faint" />
                  <p className="text-sm text-text-muted">No shared projects</p>
                </div>
              ) : (
                <div className="flex flex-col gap-0.5">
                  {MOCK_SHARED_PROJECTS.map((project) => (
                    <ProjectItem
                      key={project.id}
                      project={project}
                      showActions={false}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <div className="p-3 border-t border-border-default">
          <Button
            variant="default"
            className="w-full gap-2"
            onClick={openCreate}
          >
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>
      </aside>
    </>
  )
}
