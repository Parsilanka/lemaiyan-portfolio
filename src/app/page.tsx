import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import About from "@/components/About"
import Projects from "@/components/Projects"
import Experience from "@/components/Experience"
import Contact from "@/components/Contact"
import { Github, Mail } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Contact />

      <footer className="border-t py-12 bg-muted/20">
        <div className="container mx-auto px-4">
          
          {/* Top section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-8">
            
            {/* Left - Name & Role */}
            <div>
              <h2 className="text-2xl font-serif font-normal text-foreground">
                Parsilanka Samuel <span className="italic text-muted-foreground">Lemaiyan.</span>
              </h2>
              <p className="text-xs tracking-widest text-muted-foreground uppercase mt-1">
                Machine Learning Engineer · Kenya
              </p>
              <nav className="mt-4 flex gap-5 text-sm text-muted-foreground">
                <a href="#work"     className="hover:text-foreground transition-colors">Work</a>
                <a href="#about"    className="hover:text-foreground transition-colors">About</a>
                <a href="#research" className="hover:text-foreground transition-colors">Research</a>
                <a href="#contact"  className="hover:text-foreground transition-colors">Contact</a>
              </nav>
            </div>

            {/* Right - Socials & Email */}
            <div className="flex flex-col items-start md:items-end gap-3">
              <div className="flex gap-2">
                <a href="https://github.com/Parsilanka"
                   target="_blank" rel="noopener noreferrer"
                   className="w-9 h-9 flex items-center justify-center rounded-md border border-border hover:bg-muted transition-colors">
                  <Github className="w-4 h-4 text-muted-foreground" />
                </a>
                <a href="mailto:lemaiyansamuel901@gmail.com"
                   className="w-9 h-9 flex items-center justify-center rounded-md border border-border hover:bg-muted transition-colors">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                </a>
              </div>
              <span className="text-xs text-muted-foreground">lemaiyansamuel901@gmail.com</span>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border" />

          {/* Bottom row */}
          <div className="mt-5 flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Parsilanka Samuel Lemaiyan. All rights reserved.
            </p>
            <span className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" />
              Open to opportunities
            </span>
          </div>

        </div>
      </footer>
    </main>
  )
}
