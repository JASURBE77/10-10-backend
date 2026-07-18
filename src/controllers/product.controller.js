const Product = require("../models/product.model");


class Products {
    async create(req, res) {
        try {
            const {name, description, category, price, discount, rating} = req.body;

            // Rasm multer orqali fayl sifatida keladi (req.file)
            if(!name || !description || !category || !price || !req.file) {
                return res.status(400).json({message: "Iltimos barcha malumotlarni to'ldiring (rasm ham majburiy)"})
            }

            // Rasmni base64 (data:image/...) matniga aylantirib DB'ga saqlaymiz
            const image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

            const newProduct = new Product({
                name,
                description,
                image,
                category,
                price,
                discount,
                rating
            })

            await newProduct.save();
            res.status(201).json({message: "Product created successfully", product: newProduct})

        } catch (error) {
            res.status(500).json({message: "Error creating product", error: error.message})
        }
    }


    async getAll(req, res) {
        try {
            const products = await Product.find();

            res.status(200).json({message: "Products fetched successfully", products})
        } catch (error) {
            res.status(500).json({message: "Error fetching products", error: error.message})
        }
    }


    async deleteID(req, res) {
        try {
            const {id} = req.params;

            if (!id) {
                return res.status(400).json({message: "ID is required"})
            }

            const deletedProduct = await Product.findByIdAndDelete(id);

            if (!deletedProduct) {
                return res.status(404).json({message: "Bunday product topilmadi"})
            }

            res.status(200).json({message: "Product deleted successfully", product: deletedProduct})
        } catch (error) {
            res.status(500).json({message: "Error deleting product", error: error.message})
        }
    }
}



module.exports = new Products()
