const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
    } catch (error) {
        // MUHIM: process.exit(1) ishlatmaymiz — aks holda ulanish uzilsa
        // butun server o'chib, Render'da crash loop (502) yuzaga keladi.
        // Xatoni log qilib, serverni tirik qoldiramiz.
        console.error('Error connecting to MongoDB:', error.message);
    }
}


module.exports = connectDB;