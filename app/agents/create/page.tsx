"use client"

import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Mail,
  MessageCircle,
  FileText,
  Globe,
  HelpCircle,
  FileUp,
  ArrowLeft,
  Check,
  Bot,
  Zap,
  X,
} from "lucide-react"
import Link from "next/link"
import { IntegrationLogo } from "@/components/integration-logo"
import { useState } from "react"

const dataSourceChannels = [
  {
    id: "support",
    name: "Channels",
    description: "All communication channels and platforms",
    icon: MessageCircle,
    comingSoon: false,
  },
  {
    id: "documents",
    name: "Files",
    description: "Upload files and documents",
    icon: FileText,
    comingSoon: true,
  },
  {
    id: "text",
    name: "Text",
    description: "Direct text input and content",
    icon: FileText,
    comingSoon: true,
  },
  {
    id: "website",
    name: "Website",
    description: "Web content and pages",
    icon: Globe,
    comingSoon: true,
  },
  {
    id: "qa",
    name: "Q&A",
    description: "Question and answer pairs",
    icon: HelpCircle,
    comingSoon: true,
  },
]

const dataSources = [
  {
    id: "intercom",
    name: "Intercom",
    description: "Import chat history and tickets",
    logo: "/integration-logo/intercom.svg",
    category: "support",
  },
  {
    id: "zendesk",
    name: "Zendesk",
    description: "Import support tickets and conversations",
    logo: "/integration-logo/zendesk.svg",
    category: "support",
  },
  {
    id: "helpscout",
    name: "HelpScout",
    description: "Import customer conversations",
    logo: "/integration-logo/helpscout.svg",
    category: "support",
  },
  {
    id: "crisp",
    name: "Crisp",
    description: "Import chat conversations",
    logo: "/integration-logo/crisp-logo.svg",
    category: "support",
  },
  {
    id: "fernand",
    name: "Fernand",
    description: "Import customer support data",
    logo: "/integration-logo/fernand.svg",
    category: "support",
  },
  {
    id: "missive",
    name: "Missive",
    description: "Import team conversations",
    logo: "/integration-logo/missive.svg",
    category: "support",
  },
  {
    id: "gmail",
    name: "Gmail",
    description: "Import email conversations",
    logo: "/integration-logo/gmail.svg",
    category: "support",
  },
]

export default function CreateAgentPage() {
  const [selectedChannel, setSelectedChannel] = useState("support")
  const [selectedSources, setSelectedSources] = useState<string[]>([])

  const filteredSources = dataSources.filter(
    (source) => source.category === selectedChannel
  )

  const toggleSource = (sourceId: string) => {
    setSelectedSources((prev) =>
      prev.includes(sourceId)
        ? prev.filter((id) => id !== sourceId)
        : [...prev, sourceId]
    )
  }

  const removeSource = (sourceId: string) => {
    setSelectedSources((prev) => prev.filter((id) => id !== sourceId))
  }

  const clearAllSources = () => {
    setSelectedSources([])
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">flowdesk</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/agents">agents</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>create</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
          <p className="text-muted-foreground">
            Create your agent by connecting your data sources and training it on
            your data.
          </p>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Column 1: Data Sources */}
            <div className="lg:col-span-2">
              <Card className="shadow-none">
                <CardHeader>
                  <CardTitle className="text-base">Data Sources</CardTitle>
                  <CardDescription>
                    Choose channel type and select data sources for training
                    your AI agent
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs
                    value={selectedChannel}
                    onValueChange={setSelectedChannel}
                    className="w-full"
                  >
                    <TabsList className="mb-4 grid w-full grid-cols-5">
                      {dataSourceChannels.map((channel) => (
                        <TabsTrigger
                          key={channel.id}
                          value={channel.id}
                          disabled={channel.comingSoon}
                          className="text-xs"
                        >
                          <channel.icon className="mr-1 h-3.5 w-3.5" />
                          {channel.name}
                        </TabsTrigger>
                      ))}
                    </TabsList>

                    <TabsContent value={selectedChannel} className="mt-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">
                          Available Sources
                        </Label>
                        {filteredSources.length === 0 ? (
                          <div className="text-muted-foreground py-8 text-center">
                            <FileUp className="mx-auto mb-2 h-8 w-8 opacity-50" />
                            <p className="text-sm">
                              No sources available for this channel type
                            </p>
                          </div>
                        ) : (
                          <div className="grid grid-cols-3 gap-2">
                            {filteredSources.map((source) => (
                              <div
                                key={source.id}
                                className={`group relative cursor-pointer rounded-lg border p-3 transition-all duration-150 hover:shadow-sm ${
                                  selectedSources.includes(source.id)
                                    ? "border-primary bg-primary/5 shadow-sm"
                                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                                }`}
                                onClick={() => toggleSource(source.id)}
                              >
                                <div className="flex items-start gap-2">
                                  <IntegrationLogo
                                    integrationId={source.id}
                                    integrationName={source.name}
                                    size="md"
                                    selected={selectedSources.includes(
                                      source.id
                                    )}
                                  />
                                  <div className="min-w-0 flex-1">
                                    <h3 className="mb-1 text-xs leading-tight font-medium">
                                      {source.name}
                                    </h3>
                                    <p className="text-muted-foreground overflow-hidden text-xs leading-tight">
                                      {source.description}
                                    </p>
                                  </div>
                                </div>

                                {/* Selection indicator */}
                                <div
                                  className={`absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full border transition-all ${
                                    selectedSources.includes(source.id)
                                      ? "border-primary bg-primary scale-100"
                                      : "scale-0 border-gray-300 bg-white group-hover:scale-100"
                                  }`}
                                >
                                  {selectedSources.includes(source.id) && (
                                    <Check className="h-2.5 w-2.5 text-white" />
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {selectedSources.length > 0 && (
                          <div className="bg-muted/50 mt-4 rounded-lg p-3">
                            <p className="mb-2 text-sm font-medium">
                              Selected sources ({selectedSources.length})
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {selectedSources.map((sourceId) => {
                                const source = dataSources.find(
                                  (s) => s.id === sourceId
                                )
                                return source ? (
                                  <div
                                    key={sourceId}
                                    className="inline-flex items-center gap-1 rounded-full bg-black px-2 py-1 text-xs font-medium text-white"
                                  >
                                    <IntegrationLogo
                                      integrationId={source.id}
                                      integrationName={source.name}
                                      variant="chip"
                                    />
                                    <span>{source.name}</span>
                                    <button
                                      onClick={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        removeSource(sourceId)
                                      }}
                                      className="rounded-full p-0.5 transition-colors hover:bg-white/20"
                                    >
                                      <X className="h-2.5 w-2.5" />
                                    </button>
                                  </div>
                                ) : null
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Column 2: Agent Configuration */}
            <div className="lg:col-span-1">
              <Card className="shadow-none">
                <CardHeader>
                  <CardTitle className="text-base">
                    Agent Configuration
                  </CardTitle>
                  <CardDescription>
                    Set up your AI agent details and behavior
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Agent Name *</Label>
                    <Input
                      id="name"
                      placeholder="Customer Support Agent"
                      className="focus:ring-primary/20 shadow-none transition-all focus:ring-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe what this agent will help with. This helps the AI understand its role and respond appropriately."
                      rows={4}
                      className="focus:ring-primary/20 resize-none shadow-none transition-all focus:ring-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Training Data</Label>
                    <div className="text-muted-foreground space-y-1 text-sm">
                      <p>• Historical chat conversations</p>
                      <p>• Support ticket resolutions</p>
                      <p>• FAQ and help documentation</p>
                    </div>
                  </div>

                  <div className="space-y-3 border-t pt-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Selected sources:
                      </span>
                      <span className="font-medium">
                        {selectedSources.length}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 pt-4">
                    <Button
                      className="w-full"
                      disabled={selectedSources.length === 0}
                      size="lg"
                    >
                      {selectedSources.length === 0
                        ? "Select data sources first"
                        : "Create & Train Agent"}
                    </Button>
                    <Link href="/agents" className="w-full">
                      <Button variant="outline" className="w-full">
                        Cancel
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
