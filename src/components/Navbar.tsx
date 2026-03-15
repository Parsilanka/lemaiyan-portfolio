"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Moon, Sun, Menu, X } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"

const navLinks = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
]

export default function Navbar() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => setMounted(true), [])

    if (!mounted) return null

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <Link href="/" className="text-3xl font-bold tracking-tighter">
                            PORTFOLIO.
                        </Link>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="px-3 py-2 text-sm font-medium transition-colors hover:text-primary/70"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <button
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                className="rounded-md p-2 hover:bg-accent"
                            >
                                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                            </button>
                        </div>
                    </div>

                    <div className="flex md:hidden">
                        <button
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="mr-2 rounded-md p-2 hover:bg-accent"
                        >
                            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="rounded-md p-2 hover:bg-accent"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="md:hidden bg-background border-b"
                    >
                        <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="block px-3 py-2 text-base font-medium hover:bg-accent"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}
