import mongoose, { Schema, model, models } from 'mongoose'

const ExperienceSchema = new Schema({
    role: { type: String, required: true },
    company: { type: String, required: true },
    startDate: String,
    endDate: String,
    responsibilities: [String],
    order: { type: Number, default: 0 }
})

const Experience = models.Experience || model('Experience', ExperienceSchema, 'experience')
export default Experience
