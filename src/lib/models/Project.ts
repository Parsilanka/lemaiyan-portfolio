import mongoose, { Schema, model, models } from 'mongoose'

const ProjectSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    techStack: [String],
    githubUrl: String,
    liveUrl: String,
    imageUrl: String,
    featured: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
})

const Project = models.Project || model('Project', ProjectSchema, 'projects')
export default Project
