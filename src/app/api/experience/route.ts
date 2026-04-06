import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Experience from '@/lib/models/Experience'


const MOCK_EXPERIENCES = [
    {
        _id: "1",
        role: "Lead Full-Stack Developer",
        company: "TechNova Solutions",
        startDate: "Jan 2024",
        endDate: "Present",
        responsibilities: [
            "Architected and deployed enterprise-level SaaS applications using Next.js and AWS.",
            "Reduced application load time by 40% through server-side optimizations.",
            "Mentored junior developers and led the agile development team."
        ],
        order: 1
    },
    {
        _id: "2",
        role: "Software Engineering Intern",
        company: "Vortex Labs",
        startDate: "Jun 2023",
        endDate: "Dec 2023",
        responsibilities: [
            "Developed responsive UI components using React and Tailwind CSS.",
            "Implemented RESTful API endpoints for internal dashboard services.",
            "Improved test coverage by 25% using Jest."
        ],
        order: 2
    }
];

export async function GET() {
    try {
        await connectDB()
        const experience = await Experience.find({}).sort({ order: 1 })
        
        // If DB is empty, return mock data
        if (experience.length === 0) {
            console.log("📂 Database is empty, returning mock experiences.")
            return NextResponse.json(MOCK_EXPERIENCES)
        }
        
        return NextResponse.json(experience)
    } catch (error: any) {
        console.error("❌ Experience API Error (Using Fallback):", error.message)
        return NextResponse.json(MOCK_EXPERIENCES) // Fallback so UI loads
    }
}
