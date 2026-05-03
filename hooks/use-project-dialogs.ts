"use client"

import { createContext, useContext, useState } from "react"
import type { MockProject } from "@/types/project"

type DialogKind = "create" | "rename" | "delete" | null

export interface ProjectDialogsState {
  activeDialog: DialogKind
  dialogTarget: MockProject | null
  createName: string
  setCreateName: (v: string) => void
  renameName: string
  setRenameName: (v: string) => void
  isLoading: boolean
  openCreate: () => void
  openRename: (project: MockProject) => void
  openDelete: (project: MockProject) => void
  closeDialog: () => void
}

export function useProjectDialogs(): ProjectDialogsState {
  const [activeDialog, setActiveDialog] = useState<DialogKind>(null)
  const [dialogTarget, setDialogTarget] = useState<MockProject | null>(null)
  const [createName, setCreateName] = useState("")
  const [renameName, setRenameName] = useState("")
  const [isLoading] = useState(false)

  function openCreate() {
    setCreateName("")
    setDialogTarget(null)
    setActiveDialog("create")
  }

  function openRename(project: MockProject) {
    setRenameName(project.name)
    setDialogTarget(project)
    setActiveDialog("rename")
  }

  function openDelete(project: MockProject) {
    setDialogTarget(project)
    setActiveDialog("delete")
  }

  function closeDialog() {
    setActiveDialog(null)
    setDialogTarget(null)
  }

  return {
    activeDialog,
    dialogTarget,
    createName,
    setCreateName,
    renameName,
    setRenameName,
    isLoading,
    openCreate,
    openRename,
    openDelete,
    closeDialog,
  }
}

export const ProjectDialogContext = createContext<ProjectDialogsState | null>(null)

export function useProjectDialogContext(): ProjectDialogsState {
  const ctx = useContext(ProjectDialogContext)
  if (!ctx) throw new Error("useProjectDialogContext used outside of provider")
  return ctx
}
