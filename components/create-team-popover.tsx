"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Loader2, Users } from "lucide-react"
import { organization } from "@/lib/auth-client"
import { toast } from "sonner"

interface CreateTeamDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

interface FormData {
  teamName: string
  teamSlug: string
}

const generateSlugFromName = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
}
export function CreateTeamDialog({
  open,
  onOpenChange,
  onSuccess,
}: CreateTeamDialogProps) {
  const [formData, setFormData] = React.useState<FormData>({
    teamName: "",
    teamSlug: "",
  })
  const [isLoading, setIsLoading] = React.useState(false)

  const generateSlug = React.useCallback(generateSlugFromName, [])

  const resetForm = React.useCallback(() => {
    setFormData({ teamName: "", teamSlug: "" })
    setIsLoading(false)
  }, [])

  const updateTeamName = React.useCallback(
    (name: string) => {
      setFormData((prev) => ({
        ...prev,
        teamName: name,
        teamSlug: generateSlug(name),
      }))
    },
    [generateSlug]
  )

  const updateTeamSlug = React.useCallback((slug: string) => {
    setFormData((prev) => ({ ...prev, teamSlug: slug }))
  }, [])

  React.useEffect(() => {
    if (!open) {
      resetForm()
    }
  }, [open, resetForm])
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const trimmedName = formData.teamName.trim()
    if (!trimmedName) {
      toast.error("Please enter a team name")
      return
    }

    setIsLoading(true)

    try {
      await organization.create({
        name: trimmedName,
        slug: formData.teamSlug.trim() || generateSlug(trimmedName),
      })

      toast.success("Team created successfully!")
      onOpenChange(false)
      onSuccess?.()
    } catch (error) {
      console.error("Create team error:", error)
      const errorMessage =
        error instanceof Error ? error.message : "Failed to create team"
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-md">
              <Users className="text-primary h-4 w-4" />
            </div>
            <div>
              <DialogTitle>Create a team</DialogTitle>
              <DialogDescription>
                Start collaborating with your team members.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="team-name">Team Name</Label>
            <Input
              id="team-name"
              placeholder="Acme Inc."
              value={formData.teamName}
              onChange={(e) => updateTeamName(e.target.value)}
              disabled={isLoading}
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="team-slug">Team URL</Label>
            <Input
              id="team-slug"
              placeholder="acme-inc"
              value={formData.teamSlug}
              onChange={(e) => updateTeamSlug(e.target.value)}
              disabled={isLoading}
            />
            <p className="text-muted-foreground text-xs">
              This will be used in URLs and must be unique
            </p>
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !formData.teamName.trim()}
              className="flex-1"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Team"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export function useCreateTeamDialog() {
  const [open, setOpen] = React.useState(false)

  const openDialog = React.useCallback(() => {
    setOpen(true)
  }, [])

  const closeDialog = React.useCallback(() => {
    setOpen(false)
  }, [])

  return {
    open,
    openDialog,
    closeDialog,
    setOpen,
  }
}
