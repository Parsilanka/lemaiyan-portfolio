"use client"

import { motion } from "framer-motion"
import { Download } from "lucide-react"

const skills = [
    "Python", "TensorFlow", "scikit-learn", "Deep Learning",
    "NLP", "Flask", "React", "Next.js", "Node.js", "MongoDB", "Git"
]

export default function About() {
    return (
        <section id="about" className="py-24 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">About Me</h2>
                        <p className="mb-4 text-lg text-muted-foreground">
                            <strong>Education:</strong> Meru University of Science and Technology
                        </p>
                        <p className="mb-6 text-lg text-muted-foreground">
                            As a specialized Machine Learning Engineer and IT Professional, I bridge the gap
                            between complex AI algorithms and real-world application. My work focuses on
                            building intelligent systems that solve practical problems in agriculture, mental health, and e-commerce.
                        </p>
                        <p className="mb-8 text-lg text-muted-foreground">
                            With a strong foundation in both deep learning and modern web development,
                            I deliver end-to-end solutions from model training to production-ready deployment.
                        </p>
                        <a
                            href="/cv.pdf"
                            download="Samuel_Lemaiyan_CV.pdf"
                            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                        >
                            <Download size={20} />
                            Download CV
                        </a>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="grid grid-cols-2 gap-4 sm:grid-cols-3"
                    >
                        {skills.map((skill, index) => (
                            <div
                                key={skill}
                                className="flex items-center justify-center rounded-xl border bg-card p-6 text-center transition-all hover:shadow-lg"
                            >
                                <span className="font-semibold">{skill}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
