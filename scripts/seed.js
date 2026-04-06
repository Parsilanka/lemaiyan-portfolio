const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Function to find ALL MONGODB_URIs in multiple potential .env files
function getAllMongoURIs() {
    const uris = new Set();
    const envFiles = ['.env.production.local', '.env.local', '.env'];
    
    for (const file of envFiles) {
        const envPath = path.resolve(process.cwd(), file);
        if (fs.existsSync(envPath)) {
            const content = fs.readFileSync(envPath, 'utf8');
            const lines = content.split('\n');
            for (let line of lines) {
                line = line.trim();
                const match = line.match(/^MONGODB_URI=["']?([^"'\s]+)["']?.*$/);
                if (match && !line.startsWith('#')) {
                    const uri = match[1];
                    console.log(`📡 Found MONGODB_URI in ${file}: ${uri.split('@').pop()}`);
                    uris.add(uri);
                }
            }
        }
    }
    
    // Add localhost as a fallback if nothing found
    if (uris.size === 0) {
        console.warn("⚠️ No MONGODB_URI found in .env files, adding localhost fallback.");
        uris.add('mongodb://localhost:27017/portfolio');
    }
    
    return Array.from(uris);
}

const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    techStack: [String],
    githubUrl: String,
    liveUrl: String,
    imageUrl: String,
    featured: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

const ExperienceSchema = new mongoose.Schema({
    role: { type: String, required: true },
    company: { type: String, required: true },
    startDate: String,
    endDate: String,
    responsibilities: [String],
    order: { type: Number, default: 0 }
});

const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema, 'projects');
const Experience = mongoose.models.Experience || mongoose.model('Experience', ExperienceSchema, 'experience');

const projects = [
    {
        title: "Crop Recommendation & Disease Detection",
        description: "AI-powered crop recommendation and plant disease detection using machine learning and computer vision to help farmers optimize yields.",
        techStack: ["Python", "TensorFlow", "Jupyter Notebook", "Machine Learning"],
        githubUrl: "https://github.com/Parsilanka/Crop-Recommendation-and-Disease-Detection-System",
        imageUrl: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&q=80&w=600",
        featured: true
    },
    {
        title: "Decentralized Voting System",
        description: "A secure, transparent, and immutable voting platform built on blockchain technology to ensure election integrity.",
        techStack: ["TypeScript", "Solidity", "Blockchain", "React"],
        githubUrl: "https://github.com/Parsilanka/DECENTRALIZED-VOTING-SYSTEM",
        imageUrl: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&q=80&w=600",
        featured: true
    },
    {
        title: "Vantage Mobile App",
        description: "A high-performance mobile application providing seamless user interaction and responsive design for modern mobile platforms.",
        techStack: ["Kotlin", "Android", "Material UI"],
        githubUrl: "https://github.com/Parsilanka/Vantage_Mobile-App",
        imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=600",
        featured: true
    },
    {
        title: "AgriSmart App",
        description: "An innovative agricultural management application optimizing farming practices through data-driven insights and technology.",
        techStack: ["Kotlin", "Android", "IoT"],
        githubUrl: "https://github.com/Parsilanka/AgriSmart",
        imageUrl: "https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&q=80&w=600",
        featured: false
    },
    {
        title: "GraphicsGlu Agency Website",
        description: "A comprehensive and aesthetically pleasing website for a graphic design agency, showcasing a wide range of visual solutions.",
        techStack: ["HTML", "CSS", "JavaScript", "UI/UX"],
        githubUrl: "https://github.com/Parsilanka/GraphicsGlu-website",
        imageUrl: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=600",
        featured: false
    },
    
    
    
];

const experiences = [
    {
        role: "Machine learning Engineer",
        company: "Meru University Of Science and Technology",
        startDate: "Sep 2023",
        endDate: "Present",
        responsibilities: [
            "Developed and deployed a crop recommendation system using supervised learning models trained on soil, climate, and regional agricultural data.",
    "Built a plant disease detection pipeline leveraging CNN-based image classification, achieving 92%+ accuracy on leaf disease datasets.",
    "Optimized model inference and preprocessing workflows, reducing prediction latency by 40% for real-time field applications.",
        ],
        order: 1
    },
    {
        role: "Industrial Attachment",
        company: "Vortex Labs",
        startDate: "May 2026",
        endDate: "Aug 2026",
        responsibilities: [
            "Developed responsive UI components using React and Tailwind CSS.",
            "Implemented RESTful API endpoints for internal dashboard services.",
            "Improved test coverage by 25% using Jest and React Testing Library."
        ],
        order: 2
    }
];

async function seed() {
    const uris = getAllMongoURIs();
    console.log(`🚀 Starting seeding process for ${uris.length} environment(s)...`);

    for (const uri of uris) {
        try {
            const host = uri.split('@').pop().split('/')[0];
            console.log(`\n🔌 Connecting to: ${host}...`);
            
            // Create a new connection for each URI to ensure clean state
            const conn = await mongoose.connect(uri, { 
                dbName: 'portfolio',
                serverSelectionTimeoutMS: 5000 
            });
            
            console.log("✅ Connection Successful!");

            console.log("🧹 Cleaning up existing data...");
            await Project.deleteMany({});
            await Experience.deleteMany({});

            console.log("🚀 Seeding Projects...");
            await Project.insertMany(projects);

            console.log("🚀 Seeding Experiences...");
            await Experience.insertMany(experiences);

            console.log(`✨ Seed Successful for ${host}!`);
            
            // Disconnect to allow next connection
            await mongoose.disconnect();
        } catch (err) {
            console.error(`❌ Seed failed for URI: ${err.message}`);
            // Continue to next URI even if one fails
        }
    }
    
    console.log("\n🏁 Seeding process completed.");
    process.exit(0);
}

seed();
