"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface ExperienceEntry {
    _id: string
    role: string
    company: string
    startDate: string
    endDate: string
    responsibilities: string[]
}

export default function Experience() {
    const [experiences, setExperiences] = useState<ExperienceEntry[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("/api/experience")
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                if (Array.isArray(data)) {
                    setExperiences(data)
                } else {
                    console.error("Experience API returned invalid data:", data)
                    setExperiences([])
                }
            })
            .catch((err) => {
                console.error("Error fetching experience:", err);
                setExperiences([])
            })
            .finally(() => {
                setLoading(false)
            });
    }, [])

    return (
        <section id="experience" className="bg-muted/30 py-24">
            <div className="container mx-auto px-4">
                <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl">Experience</h2>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                    </div>
                ) : (
                    <div className="mx-auto max-w-3xl space-y-8 relative">
                        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary/20 md:left-1/2 md:-ml-px"></div>

                        {experiences.map((exp, index) => (
                            <motion.div
                                key={exp._id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="relative pl-12 md:pl-0"
                            >
                                <div className="absolute left-2.5 top-1 h-3.5 w-3.5 rounded-full bg-primary md:left-1/2 md:-ml-[7px]"></div>

                                <div className={`md:flex md:justify-between items-start ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                    <div className="md:w-[45%] bg-card p-6 rounded-2xl border shadow-sm transition-all hover:shadow-md">
                                        <span className="text-sm font-bold text-primary">{exp.startDate} - {exp.endDate}</span>
                                        <h3 className="mt-1 text-xl font-bold leading-none">{exp.role}</h3>
                                        <p className="text-muted-foreground font-medium mb-4">{exp.company}</p>
                                        <ul className="space-y-2">
                                            {exp.responsibilities.map((res, i) => (
                                                <li key={i} className="text-sm text-muted-foreground flex gap-2">
                                                    <span className="shrink-0">•</span>
                                                    {res}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="hidden md:block md:w-[45%]"></div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
