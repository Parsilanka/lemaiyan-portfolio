"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Github, ExternalLink } from "lucide-react"

interface Project {
    _id: string
    title: string
    description: string
    techStack: string[]
    githubUrl?: string
    liveUrl?: string
    imageUrl?: string
}

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>([])
    const [filter, setFilter] = useState("All")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("/api/projects")
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                if (Array.isArray(data)) {
                    setProjects(data)
                } else {
                    console.error("Projects API returned invalid data:", data)
                    setProjects([])
                }
            })
            .catch((err) => {
                console.error("Error fetching projects:", err);
                setProjects([])
            })
            .finally(() => {
                setLoading(false)
            });
    }, [])

    const allTags = ["All", ...Array.from(new Set(projects.flatMap(p => p.techStack)))]
    const filteredProjects = filter === "All"
        ? projects
        : projects.filter(p => p.techStack.includes(filter))

    return (
        <section id="projects" className="py-24">
            <div className="container mx-auto px-4">
                <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl">Featured Projects</h2>

                <div className="mb-12 flex flex-wrap justify-center gap-2">
                    {allTags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => setFilter(tag)}
                            className={`rounded-full px-4 py-1 text-sm font-medium transition-colors ${filter === tag
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted hover:bg-muted/80"
                                }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                        <p className="mt-4 text-muted-foreground font-medium">Loading projects...</p>
                    </div>
                ) : (
                    <motion.div
                        layout
                        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                    >
                        <AnimatePresence>
                            {filteredProjects.map((project) => (
                                <motion.div
                                    key={project._id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3 }}
                                    className="group overflow-hidden rounded-2xl border bg-card transition-all hover:shadow-xl"
                                >
                                    <div className="aspect-video overflow-hidden">
                                        <img
                                            src={project.imageUrl || "https://placehold.co/600x400"}
                                            alt={project.title}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="mb-2 text-xl font-bold">{project.title}</h3>
                                        <p className="mb-4 text-sm text-muted-foreground line-clamp-3">
                                            {project.description}
                                        </p>
                                        <div className="mb-6 flex flex-wrap gap-2">
                                            {project.techStack.map(tag => (
                                                <span key={tag} className="rounded bg-accent px-2 py-0.5 text-xs font-semibold">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex gap-4">
                                            {project.githubUrl && (
                                                <a href={project.githubUrl} className="flex items-center gap-1 text-sm font-medium hover:text-primary">
                                                    <Github size={18} /> GitHub
                                                </a>
                                            )}
                                            {project.liveUrl && (
                                                <a href={project.liveUrl} className="flex items-center gap-1 text-sm font-medium hover:text-primary">
                                                    <ExternalLink size={18} /> Demo
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>
        </section>
    )
}
