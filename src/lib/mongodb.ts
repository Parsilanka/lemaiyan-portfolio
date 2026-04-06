import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI ||
  'mongodb://localhost:27017/portfolio'

let cached = (global as any).mongoose || { conn: null, promise: null }

export async function connectDB() {
  if (cached.conn) return cached.conn
  
  if (!MONGODB_URI) {
    throw new Error('❌ MONGODB_URI is not defined in environment variables. Set it in .env.local')
  }

  if (!cached.promise) {
    console.log(`🔌 Attempting to connect to MongoDB...`)
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: 'portfolio',
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000, // Fail fast if cluster is unreachable (IP Whitelisting issue)
    }).then((m) => {
      console.log('✅ Successfully connected to MongoDB!')
      return m
    }).catch((err) => {
      console.error('❌ MongoDB Connection Error:', err.message)
      if (err.message.includes('DNS')) {
        console.warn('💡 Tip: Your DNS might be blocking SRV records. Try adding your IP to Atlas Network Access.')
      }
      throw err
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}
