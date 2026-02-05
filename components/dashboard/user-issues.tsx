"use client"
import React, { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { useAuth } from "@/lib/auth"
import api from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

type IssueStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED" | "REJECTED"

type Issue = {
    id: string
    title: string
    description: string
    address?: string | null
    status: IssueStatus
    createdAt?: string
    department?: { id: string; name: string } | null
    reporterId?: string
    latitude?: number | null
    longitude?: number | null
}

function getStatusVariant(status: IssueStatus): { label: string; className: string } {
    switch (status) {
        case "OPEN":
            return { label: "Open", className: "bg-blue-100 text-blue-700" }
        case "IN_PROGRESS":
            return { label: "In Progress", className: "bg-amber-100 text-amber-700" }
        case "RESOLVED":
            return { label: "Resolved", className: "bg-green-100 text-green-700" }
        case "REJECTED":
            return { label: "Rejected", className: "bg-red-100 text-red-700" }
        default:
            return { label: status, className: "bg-muted text-muted-foreground" }
    }
}

export function UserIssues() {
    const { user, loading: authLoading } = useAuth()
    const [issues, setIssues] = useState<Issue[] | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>("")

    useEffect(() => {
        if (authLoading) return
        let cancelled = false
        async function fetchIssues() {
            try {
                setLoading(true)
                const res = await api.get<Issue[]>("/issues")
                if (!cancelled) setIssues(res.data)
            } catch (e) {
                if (!cancelled) setError("Failed to load your reports")
            } finally {
                if (!cancelled) setLoading(false)
            }
        }
        fetchIssues()
        return () => {
            cancelled = true
        }
    }, [authLoading])

    const myIssues = useMemo(() => {
        if (!issues || !user?.id) return []
        // Backend includes reporterId; we filter on client
        return (issues as any[]).filter((iss) => iss.reporterId === user.id)
    }, [issues, user?.id])

    if (authLoading || loading) {
        return (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                    <Card key={i} className="overflow-hidden border-muted/40">
                        {/* Image area skeleton */}
                        <div className="relative h-40 w-full overflow-hidden">
                            <Skeleton className="absolute inset-0 h-full w-full" />
                            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-background/90 to-transparent" />
                        </div>
                        <CardHeader className="pb-2">
                            <div className="flex items-start justify-between gap-3">
                                <Skeleton className="h-6 w-40" />
                                <Skeleton className="h-5 w-16 rounded-full" />
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-5">
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-3/4" />
                            </div>
                            {/* Pills */}
                            <div className="flex flex-wrap gap-2">
                                <Skeleton className="h-6 w-20 rounded-full" />
                                <Skeleton className="h-6 w-28 rounded-full" />
                                <Skeleton className="h-6 w-24 rounded-full" />
                            </div>
                            <div className="h-px bg-border" />
                            <Skeleton className="h-4 w-5/6" />
                            <div className="flex items-center justify-between">
                                <Skeleton className="h-4 w-40" />
                                <Skeleton className="h-9 w-20 rounded-md" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        )
    }

    if (error) {
        return (
            <Card>
                <CardContent className="pt-6 text-sm text-red-600">{error}</CardContent>
            </Card>
        )
    }

    if (!myIssues.length) {
        return (
            <Card>
                <CardContent className="pt-6 text-sm text-muted-foreground">You have not reported any issues yet.</CardContent>
            </Card>
        )
    }

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {myIssues.map((issue) => {
                const variant = getStatusVariant(issue.status)
                const created = issue.createdAt ? new Date(issue.createdAt).toLocaleDateString() : undefined
                const imageSrc = (issue as any)?.imageUrl || (issue as any)?.image || "/placeholder.jpg"
                return (
                    <Card
                        key={issue.id}
                        className="overflow-hidden border-muted/40 hover:shadow-md hover:border-primary/20 transition-shadow duration-200"
                    >
                        <div className="relative h-40 w-full bg-muted m-0 p-0 -mt-px rounded-t-lg overflow-hidden">
                            {/* Image area */}
                            <Image
                                src={imageSrc}
                                alt={issue.title}
                                fill
                                className="object-cover object-center"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                priority={false}
                            />
                            {/* Bottom fade overlay for dashboard card */}
                            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-background/90 to-transparent" />
                        </div>
                        <CardHeader className="pb-2">
                            <div className="flex items-start justify-between gap-3">
                                <CardTitle className="text-xl font-semibold tracking-tight line-clamp-1">
                                    {issue.title}
                                </CardTitle>
                                <Badge className={`${variant.className} whitespace-nowrap`}>{variant.label}</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-5">
                            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                                {issue.description}
                            </p>
                            {/* Meta pills */}
                            <div className="flex flex-wrap gap-2 text-xs">
                                {created ? (
                                    <span className="rounded-full border bg-background px-2.5 py-1 text-muted-foreground">{created}</span>
                                ) : null}
                                {issue.department?.name ? (
                                    <span className="rounded-full border bg-background px-2.5 py-1 text-muted-foreground">{issue.department.name}</span>
                                ) : null}
                                {typeof issue.latitude === "number" && typeof issue.longitude === "number" ? (
                                    <span className="rounded-full border bg-background px-2.5 py-1 text-muted-foreground">{issue.latitude}, {issue.longitude}</span>
                                ) : null}
                            </div>

                            <div className="h-px bg-border" />

                            <div className="grid grid-cols-1 gap-2 text-sm">
                                {issue.address ? (
                                    <div className="truncate">
                                        <span className="font-medium">Address: </span>
                                        <span className="text-muted-foreground">{issue.address}</span>
                                    </div>
                                ) : null}
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-xs text-muted-foreground">ID: {issue.id}</span>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button size="sm" variant="secondary">Details</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[720px] p-0 overflow-hidden rounded-xl">
                                        {/* Accessible hidden header for screen readers */}
                                        <DialogHeader className="sr-only">
                                            <DialogTitle>{issue.title}</DialogTitle>
                                            <DialogDescription>Full report details</DialogDescription>
                                        </DialogHeader>
                                        {/* Banner */}
                                        <div className="relative h-48 w-full bg-muted m-0 p-0">
                                            <Image
                                                src={imageSrc}
                                                alt={issue.title}
                                                fill
                                                className="object-cover object-center"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 720px"
                                            />
                                            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between gap-3">
                                                <h3 className="text-base sm:text-lg font-semibold tracking-tight line-clamp-1">
                                                    {issue.title}
                                                </h3>
                                                <Badge className={`${variant.className} backdrop-blur-md`}>{variant.label}</Badge>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 space-y-6">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                                                {created ? (
                                                    <div className="rounded-md border bg-background p-3">
                                                        <div className="text-xs text-muted-foreground">Created</div>
                                                        <div className="mt-1 font-medium">{created}</div>
                                                    </div>
                                                ) : null}
                                                {issue.department?.name ? (
                                                    <div className="rounded-md border bg-background p-3">
                                                        <div className="text-xs text-muted-foreground">Department</div>
                                                        <div className="mt-1 font-medium">{issue.department.name}</div>
                                                    </div>
                                                ) : null}
                                                {typeof issue.latitude === "number" ? (
                                                    <div className="rounded-md border bg-background p-3">
                                                        <div className="text-xs text-muted-foreground">Latitude</div>
                                                        <div className="mt-1 font-medium">{issue.latitude}</div>
                                                    </div>
                                                ) : null}
                                                {typeof issue.longitude === "number" ? (
                                                    <div className="rounded-md border bg-background p-3">
                                                        <div className="text-xs text-muted-foreground">Longitude</div>
                                                        <div className="mt-1 font-medium">{issue.longitude}</div>
                                                    </div>
                                                ) : null}
                                            </div>

                                            <div className="h-px bg-border" />

                                            {issue.address ? (
                                                <div className="text-sm">
                                                    <div className="font-medium">Address</div>
                                                    <div className="text-muted-foreground mt-1 leading-relaxed">{issue.address}</div>
                                                </div>
                                            ) : null}

                                            <div className="text-sm">
                                                <div className="font-medium">Description</div>
                                                <p className="text-muted-foreground mt-1 whitespace-pre-wrap leading-relaxed">
                                                    {issue.description}
                                                </p>
                                            </div>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    )
}
