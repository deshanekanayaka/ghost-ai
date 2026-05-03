"use client"

import { useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { useProjectDialogContext } from "@/hooks/use-project-dialogs"

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
}

export function ProjectDialogs() {
  const {
    activeDialog,
    dialogTarget,
    createName,
    setCreateName,
    renameName,
    setRenameName,
    isLoading,
    closeDialog,
  } = useProjectDialogContext()

  const renameInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (activeDialog === "rename") {
      renameInputRef.current?.focus()
    }
  }, [activeDialog])

  const slug = toSlug(createName)

  return (
    <>
      {/* Create Project */}
      <Dialog
        open={activeDialog === "create"}
        onOpenChange={(open) => !open && closeDialog()}
      >
        <DialogContent className="rounded-3xl" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Create Project</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <Input
              placeholder="Project name"
              value={createName}
              onChange={(e) => setCreateName(e.target.value)}
              autoFocus
            />
            <p className="text-xs text-text-muted min-h-[1rem]">
              {createName && (
                <>
                  Slug:{" "}
                  <span className="font-mono text-text-secondary">{slug}</span>
                </>
              )}
            </p>
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <Button variant="ghost" size="sm" onClick={closeDialog}>
              Cancel
            </Button>
            <Button size="sm" disabled={!createName.trim() || isLoading}>
              Create
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Rename Project */}
      <Dialog
        open={activeDialog === "rename"}
        onOpenChange={(open) => !open && closeDialog()}
      >
        <DialogContent className="rounded-3xl" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Rename Project</DialogTitle>
            {dialogTarget && (
              <DialogDescription>
                Renaming &ldquo;{dialogTarget.name}&rdquo;
              </DialogDescription>
            )}
          </DialogHeader>
          <Input
            ref={renameInputRef}
            value={renameName}
            onChange={(e) => setRenameName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && renameName.trim()) closeDialog()
            }}
          />
          <div className="flex justify-end gap-2 pt-1">
            <Button variant="ghost" size="sm" onClick={closeDialog}>
              Cancel
            </Button>
            <Button
              size="sm"
              disabled={!renameName.trim() || isLoading}
              onClick={closeDialog}
            >
              Rename
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Project */}
      <Dialog
        open={activeDialog === "delete"}
        onOpenChange={(open) => !open && closeDialog()}
      >
        <DialogContent className="rounded-3xl" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
            {dialogTarget && (
              <DialogDescription>
                &ldquo;{dialogTarget.name}&rdquo; will be permanently deleted.
                This cannot be undone.
              </DialogDescription>
            )}
          </DialogHeader>
          <div className="flex justify-end gap-2 pt-1">
            <Button variant="ghost" size="sm" onClick={closeDialog}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              disabled={isLoading}
              onClick={closeDialog}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
