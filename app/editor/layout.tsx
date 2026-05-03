import { EditorShell } from "@/components/editor/editor-shell"

export const dynamic = 'force-dynamic'

/**
 * Wraps the provided children with the EditorShell layout for editor routes.
 *
 * @param children - Content to render inside the EditorShell
 * @returns The React element that renders the provided `children` inside `EditorShell`
 */
export default function EditorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <EditorShell>{children}</EditorShell>
}
