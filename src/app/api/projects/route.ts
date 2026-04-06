import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Project from '@/lib/models/Project'

export const dynamic = 'force-dynamic'

const MOCK_PROJECTS = [
    {
        _id: "1",
        title: "Crop Recommendation & Disease Detection",
        description: "AI-powered crop recommendation and plant disease detection using machine learning and computer vision to help farmers optimize yields.",
        techStack: ["Python", "TensorFlow", "Jupyter Notebook", "Machine Learning"],
        githubUrl: "https://github.com/Parsilanka/Crop-Recommendation-and-Disease-Detection-System",
        imageUrl: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&q=80&w=600",
        featured: true
    },
    {
        _id: "2",
        title: "Decentralized Voting System",
        description: "A secure, transparent, and immutable voting platform built on blockchain technology to ensure election integrity.",
        techStack: ["TypeScript", "Solidity", "Blockchain", "React"],
        githubUrl: "https://github.com/Parsilanka/DECENTRALIZED-VOTING-SYSTEM",
        imageUrl: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&q=80&w=600",
        featured: true
    },
    {
        _id: "3",
        title: "Vantage Mobile App",
        description: "A high-performance mobile application providing seamless user interaction and responsive design for modern mobile platforms.",
        techStack: ["Kotlin", "Android", "Material UI"],
        githubUrl: "https://github.com/Parsilanka/Vantage_Mobile-App",
        imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=600",
        featured: true
    },
    {
        _id: "4",
        title: "AgriSmart",
        description: "An innovative agricultural management application optimizing farming practices through data-driven insights and technology.",
        techStack: ["Kotlin", "Android", "IoT"],
        githubUrl: "https://github.com/Parsilanka/AgriSmart",
        imageUrl: "https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&q=80&w=600",
        featured: false
    },
    {
        _id: "5",
        title: "GraphicsGlu Agency Website",
        description: "A comprehensive and aesthetically pleasing website for a graphic design agency, showcasing a wide range of visual solutions.",
        techStack: ["HTML", "CSS", "JavaScript", "UI/UX"],
        githubUrl: "https://github.com/Parsilanka/GraphicsGlu-website",
        imageUrl: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=600",
        featured: false
    }
];

export async function GET() {
    try {
        await connectDB()
        const projects = await Project.find({}).sort({ createdAt: -1 })
        
        // If DB is empty, return mock data
        if (projects.length === 0) {
            console.log("📂 Database is empty, returning mock projects.")
            return NextResponse.json(MOCK_PROJECTS)
        }
        
        return NextResponse.json(projects)
    } catch (error: any) {
        console.error("❌ Projects API Error (Using Fallback):", error.message)
        return NextResponse.json(MOCK_PROJECTS) // Fallback so UI loads
    }
}
