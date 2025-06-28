"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Plus, Loader2, Users } from "lucide-react"
import { organization } from "@/lib/auth-client"
import { toast } from "sonner"

interface CreateTeamPopoverProps {
  children: React.ReactNode
  onTeamCreated?: () => void
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function CreateTeamPopover({
  children,
  onTeamCreated,
  open: controlledOpen,
  onOpenChange,
}: CreateTeamPopoverProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const open = controlledOpen ?? internalOpen
  const setOpen = onOpenChange ?? setInternalOpen
  const [teamName, setTeamName] = useState("")
  const [teamSlug, setTeamSlug] = useState("")
  const [isCreating, setIsCreating] = useState(false)

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
  }

  const handleTeamNameChange = (value: string) => {
    setTeamName(value)
    setTeamSlug(generateSlug(value))
  }

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!teamName.trim() || !teamSlug.trim()) {
      toast.error("Please enter a team name")
      return
    }

    setIsCreating(true)
    try {
      await organization.create({
        name: teamName.trim(),
        slug: teamSlug.trim(),
      })

      toast.success("Team created successfully!")
      setTeamName("")
      setTeamSlug("")
      setOpen(false)

      // Call the callback to refresh data
      if (onTeamCreated) {
        onTeamCreated()
      }
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Failed to create team"
      )
    } finally {
      setIsCreating(false)
    }
  }

  const handleCancel = () => {
    setTeamName("")
    setTeamSlug("")
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        className="w-80 p-0"
        align="start"
        side="right"
        sideOffset={8}
        onInteractOutside={(e) => {
          // Prevent the popover from closing when clicking inside the dropdown
          if (
            e.target instanceof Element &&
            e.target.closest("[data-radix-dropdown-menu-content]")
          ) {
            e.preventDefault()
          }
        }}
      >
        <div className="p-4">
          <div className="mb-4 flex items-center gap-2">
            <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-md">
              <Users className="text-primary h-4 w-4" />
            </div>
            <div>
              <h4 className="text-sm font-semibold">Create a team</h4>
              <p className="text-muted-foreground text-xs">
                Continue to start collaborating on Pro with increased usage,
                additional security features, and support.
              </p>
            </div>
          </div>

          <form onSubmit={handleCreateTeam} className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="team-name"
                className="text-muted-foreground text-xs font-medium"
              >
                Team Name
              </Label>
              <Input
                id="team-name"
                placeholder="Acme Inc."
                value={teamName}
                onChange={(e) => handleTeamNameChange(e.target.value)}
                disabled={isCreating}
                className="h-8"
                autoFocus
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="team-slug"
                className="text-muted-foreground text-xs font-medium"
              >
                Team URL
              </Label>
              <Input
                id="team-slug"
                placeholder="acme-inc"
                value={teamSlug}
                onChange={(e) => setTeamSlug(e.target.value)}
                disabled={isCreating}
                className="h-8"
              />
              <p className="text-muted-foreground text-xs">
                This will be used in URLs and must be unique
              </p>
            </div>

            <div className="text-muted-foreground text-xs">
              Continuing will start a monthly Pro plan subscription.{" "}
              <button type="button" className="text-blue-600 hover:underline">
                Learn More ↗
              </button>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleCancel}
                disabled={isCreating}
                className="h-8 flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                disabled={isCreating || !teamName.trim()}
                className="h-8 flex-1"
              >
                {isCreating ? (
                  <>
                    <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Continue"
                )}
              </Button>
            </div>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  )
}
