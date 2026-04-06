const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

async function testContact() {
    // Manually search for MONGODB_URI in multiple potential .env files
    function findMongoURI() {
        const envFiles = ['.env.production.local', '.env.local', '.env'];
        for (const file of envFiles) {
            const envPath = path.resolve(process.cwd(), file);
            if (fs.existsSync(envPath)) {
                const content = fs.readFileSync(envPath, 'utf8');
                const match = content.match(/^MONGODB_URI=["']?([^"'\s]+)["']?$/m);
                if (match) {
                    console.log(`📡 Found MONGODB_URI in ${file}`);
                    return match[1];
                }
            }
        }
        return null;
    }

    const MONGODB_URI = findMongoURI();

    if (!MONGODB_URI) {
        console.error("❌ MONGODB_URI not found.");
        process.exit(1);
    }

    const ContactSchema = new mongoose.Schema({
        name: { type: String, required: true },
        email: { type: String, required: true },
        message: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
    });

    const Contact = mongoose.models.Contact || mongoose.model('Contact', ContactSchema);

    try {
        console.log("🔌 Connecting to Atlas...");
        await mongoose.connect(MONGODB_URI, { dbName: 'portfolio' });
        console.log("✅ Connected!");

        console.log("📝 Creating test contact...");
        const contact = await Contact.create({
            name: "Test User",
            email: "test@example.com",
            message: "This is a test message from Antigravity."
        });
        console.log("✨ Contact created successfully:", contact._id);
        
        await mongoose.disconnect();
        process.exit(0);
    } catch (err) {
        console.error("❌ Test failed:", err.message);
        process.exit(1);
    }
}

testContact();
