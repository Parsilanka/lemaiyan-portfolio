"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, CheckCircle2, AlertCircle } from "lucide-react"

export default function Contact() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" })
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus("loading")

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })

            if (res.ok) {
                setStatus("success")
                setFormData({ name: "", email: "", message: "" })
            } else {
                setStatus("error")
            }
        } catch (error) {
            setStatus("error")
        }
    }

    return (
        <section id="contact" className="py-24">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Get In Touch</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Have a project in mind or just want to say hello? Drop me a message below!
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="bg-card border rounded-3xl p-8 md:p-12 shadow-sm"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold">Name</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full rounded-xl border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold">Email</label>
                                <input
                                    required
                                    type="email"
                                    className="w-full rounded-xl border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold">Message</label>
                            <textarea
                                required
                                rows={5}
                                placeholder="How can I help you?"
                                className="w-full rounded-xl border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                                value={formData.message}
                                onChange={e => setFormData({ ...formData, message: e.target.value })}
                            />
                        </div>

                        <button
                            disabled={status === "loading"}
                            type="submit"
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 text-base font-bold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50"
                        >
                            {status === "loading" ? "Sending..." : (
                                <>
                                    <Send size={18} />
                                    Send Message
                                </>
                            )}
                        </button>

                        {status === "success" && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-green-600 font-medium">
                                <CheckCircle2 size={18} /> Message sent successfully!
                            </motion.div>
                        )}
                        {status === "error" && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-red-600 font-medium">
                                <AlertCircle size={18} /> Something went wrong. Please try again.
                            </motion.div>
                        )}
                    </form>
                </motion.div>
            </div>
        </section>
    )
}
