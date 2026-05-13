import mongoose, { type Connection } from "mongoose"

let connection: Connection | null = null

export async function connectToDatabase(): Promise<Connection> {
  if (connection) {
    return connection
  }

  try {
    const mongodbUri = process.env.MONGODB_URI

    if (!mongodbUri) {
      throw new Error("MONGODB_URI environment variable is not defined")
    }

    const result = await mongoose.connect(mongodbUri, {
      bufferCommands: false,
    })

    connection = result.connection

    return connection
  } catch (error) {
    console.error("MongoDB connection error:", error)
    throw error
  }
}

export async function disconnectDatabase(): Promise<void> {
  try {
    if (connection) {
      await mongoose.disconnect()
      connection = null
    }
  } catch (error) {
    console.error("MongoDB disconnection error:", error)
    throw error
  }
}

export function getConnection(): Connection | null {
  return connection
}
