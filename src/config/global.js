require(`dotenv`).config()


module.exports = {
    mongoUri: process.env.MONGO_URI || "",
    Firebase: process.env.FIREBASE_URI || "",
    email: process.env.EMAIL || "",
    modo: process.env.MODO || "",
    PORT: parseInt(process.env.PORT) || 8080,
}