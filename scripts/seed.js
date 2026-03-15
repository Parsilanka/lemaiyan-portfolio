const mongoose = require('mongoose');
const { Schema, model, models } = mongoose;

const MONGODB_URI = 'mongodb://localhost:27017/portfolio';

const ProjectSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    techStack: [String],
    githubUrl: String,
    liveUrl: String,
    imageUrl: String,
    featured: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

const Project = models.Project || model('Project', ProjectSchema);

const ExperienceSchema = new Schema({
    role: { type: String, required: true },
    company: { type: String, required: true },
    startDate: String,
    endDate: String,
    responsibilities: [String],
    order: { type: Number, default: 0 }
});

const Experience = models.Experience || model('Experience', ExperienceSchema);

const seedData = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing data
        await Project.deleteMany({});
        await Experience.deleteMany({});

        // Sample Projects
        const projects = [
            {
                title: 'Crop Recommendation & Disease Detection System',
                description: 'An AI-powered agricultural support system that recommends ideal crops based on soil/environmental parameters and detects 20+ plant diseases using image classification. Improved precision in traditional farming methods through data-driven insights.',
                techStack: ['Python', 'TensorFlow', 'scikit-learn', 'CNN', 'Random Forest', 'Pandas', 'NumPy'],
                githubUrl: 'https://github.com/Parsilanka/Crop-Recommendation-and-Disease-Detection-System',
                liveUrl: '',
                imageUrl: 'https://placehold.co/600x400?text=AgriAI+System',
                featured: true
            },
            {
                title: 'AgriSmart Mobile App',
                description: 'A cross-platform mobile application providing real-time agricultural advice. Integrated machine learning models for on-field disease diagnosis and crop suitability analysis with an intuitive user interface.',
                techStack: ['Mobile App Dev', 'Machine Learning', 'REST APIs', 'UI/UX'],
                githubUrl: 'https://github.com/Parsilanka/Mobile-App-Development',
                liveUrl: '',
                imageUrl: 'https://placehold.co/600x400?text=AgriSmart+App',
                featured: true
            },
            {
                title: 'Mental Health AI Chatbot',
                description: 'A natural language processing based chatbot designed to provide initial mental health support and resources. Leverages advanced text classification to identify user sentiment and provide empathetic responses.',
                techStack: ['Python', 'NLP', 'TensorFlow', 'Flask'],
                githubUrl: 'https://github.com/Parsilanka/mental-chatbot',
                liveUrl: '',
                imageUrl: 'https://placehold.co/600x400?text=Mental+Health+AI',
                featured: true
            },
            {
                title: 'Lumina Technologies E-commerce',
                description: 'A comprehensive full-stack e-commerce solution featuring secure user authentication, dynamic product catalogs, a centralized cart management system, and an optimized checkout flow.',
                techStack: ['HTML/CSS', 'JavaScript', 'Responsive Design', 'E-commerce'],
                githubUrl: '',
                liveUrl: '',
                imageUrl: 'https://placehold.co/600x400?text=Lumina+E-commerce',
                featured: false
            }
        ];

        // Sample Experience
        const experiences = [
            {
                role: 'Machine Learning Engineer & IT Professional',
                company: 'Freelance / Projects',
                startDate: '2023',
                endDate: 'Present',
                responsibilities: [
                    'Architected and deployed end-to-end Machine Learning pipelines, from data collection and preprocessing to model training and performance optimization.',
                    'Engineered high-accuracy classification models (CNNs & Random Forests) for specialized domains like agriculture and natural language processing.',
                    'Developed responsive web and mobile interfaces to bridge the gap between complex AI models and end-user accessibility.',
                    'Collaborated on full-cycle product development including requirements gathering, UI/UX design, and cross-platform deployment.'
                ],
                order: 1
            },
            {
                role: 'IT Industrial Intern',
                company: 'Kenya Methodist University (KeMU)',
                startDate: '2023',
                endDate: '2023',
                responsibilities: [
                    'Provided comprehensive IT support and systems troubleshooting in a fast-paced university environment.',
                    'Gained hands-on experience in network administration, hardware maintenance, and user support protocols.',
                    'Contributed to the optimization of internal IT workflows and local area network stability.'
                ],
                order: 2
            }
        ];

        await Project.insertMany(projects);
        await Experience.insertMany(experiences);

        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedData();
