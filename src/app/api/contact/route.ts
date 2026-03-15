import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Contact from '@/lib/models/Contact'

export async function POST(request: Request) {
    try {
        await connectDB()
        const body = await request.json()
        const { name, email, message } = body

        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const contact = await Contact.create({ name, email, message })
        return NextResponse.json(contact, { status: 201 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
