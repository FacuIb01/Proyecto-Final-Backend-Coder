require(`dotenv`).config()


module.exports = {
    mongoUri: process.env.MONGO_URI || "",
    Firebase: process.env.FIREBASE_URI || "",
}