"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

export default function Hero() {
    return (
        <section className="relative flex min-h-[calc(100vh-64px)] items-center justify-center overflow-hidden">
            <div className="container relative z-10 px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative mx-auto mb-8 h-32 w-32 overflow-hidden rounded-full border-4 border-primary/20 sm:h-48 sm:w-48"
                >
                    <Image
                        src="/images/profile.png"
                        alt="Parsilanka Samuel Lemaiyan"
                        fill
                        className="object-cover"
                        priority
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h2 className="mb-2 text-lg font-medium text-muted-foreground uppercase tracking-widest">Parsilanka Samuel Lemaiyan</h2>
                    <h1 className="mb-4 text-5xl font-extrabold tracking-tight sm:text-7xl">
                        Machine Learning Engineer
                    </h1>
                    <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground">
                        Architecting intelligent systems and crafting high-performance
                        web solutions with a focus on AI integration and IT infrastructure.
                    </p>
                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link
                            href="#projects"
                            className="rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground transition-transform hover:scale-105"
                        >
                            View My Work
                        </Link>
                        <Link
                            href="#contact"
                            className="rounded-full border border-input bg-background px-8 py-3 font-semibold transition-transform hover:scale-105 hover:bg-accent"
                        >
                            Contact Me
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Decorative background elements */}
            <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        </section>
    )
}
