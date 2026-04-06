const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Manually parse .env.production.local for MONGODB_URI
const envPath = path.resolve(process.cwd(), '.env.production.local');
let uri = '';

if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  const match = content.match(/^MONGODB_URI=["']?([^"'\n]+)["']?$/m);
  if (match) {
    uri = match[1];
  }
}

async function testConnection() {
  if (!uri) {
    console.error('❌ MONGODB_URI not found in .env.production.local');
    process.exit(1);
  }

  console.log(`🔌 Connecting to: ${uri.replace(/:([^:@]{1,})@/, ':****@')}`);
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('✅ Successfully connected to MongoDB Atlas!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    process.exit(1);
  }
}

testConnection();
