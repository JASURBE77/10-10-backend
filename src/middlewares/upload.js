const multer = require("multer")

// Fayl diskka emas, xotiraga (memory) yuklanadi — so'ng buffer sifatida DB'ga saqlaymiz
const storage = multer.memoryStorage()

// Faqat rasm fayllariga ruxsat beramiz
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true)
    } else {
        cb(new Error("Faqat rasm (image) fayllarini yuklash mumkin"), false)
    }
}

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // maksimal 5MB
})

module.exports = upload
