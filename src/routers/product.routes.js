const express = require("express")
const productController = require("../controllers/product.controller")
const upload = require("../middlewares/upload")
const router = express.Router()


router.get("/products", productController.getAll)
router.delete("/products/:id", productController.deleteID)

// upload.single("image") — form-data'dagi "image" nomli faylni qabul qiladi
router.post("/products/create", upload.single("image"), productController.create)


module.exports = router
