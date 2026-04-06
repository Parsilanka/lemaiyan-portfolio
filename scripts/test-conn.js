
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env.production.local') });

async function run() {
  const uri = process.env.MONGODB_URI;
  console.log("URI:", uri ? uri.split('@')[1] : "NOT FOUND");
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log("CONNECTED");
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("COLLECTIONS:", collections.map(c => c.name));
    process.exit(0);
  } catch (e) {
    console.error("ERROR:", e.message);
    process.exit(1);
  }
}
run();
