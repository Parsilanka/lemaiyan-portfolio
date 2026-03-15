import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Experience from '@/lib/models/Experience'

export async function GET() {
    try {
        await connectDB()
        const experience = await Experience.find({}).sort({ order: 1 })
        return NextResponse.json(experience)
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
