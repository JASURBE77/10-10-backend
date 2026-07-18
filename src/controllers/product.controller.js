const Product = require("../models/product.model");
const Jimp = require("jimp");

// Rasmni serverda kichraytiruvchi yordamchi funksiya.
// Eng katta tomonini 600px'ga cheklaydi va JPEG sifatini 70% ga tushiradi.
// Natijada rasm "hamma joyni egallab ketmaydi" va DB'da kam joy oladi.
async function resizeImage(buffer) {
    const image = await Jimp.read(buffer);
    // scaleToFit — nisbatni saqlagan holda 300x300 ichiga sig'diradi (kattalashtirmaydi)
    // Kichik o'lcham + kuchli siqish => base64 hajmi kichik, rasm joyni egallamaydi
    image.scaleToFit(300, 300);
    image.quality(60);
    const outBuffer = await image.getBufferAsync(Jimp.MIME_JPEG);
    return `data:image/jpeg;base64,${outBuffer.toString("base64")}`;
}


class Products {
    async create(req, res) {
        try {
            const {name, description, category, price, discount, rating} = req.body;
            const imageUrl = req.body.image; // ixtiyoriy: to'g'ridan-to'g'ri rasm URL manzili

            // Rasm YO fayl sifatida (req.file) YO URL sifatida (body.image) kelishi mumkin
            if(!name || !description || !category || !price || (!req.file && !imageUrl)) {
                return res.status(400).json({message: "Iltimos barcha malumotlarni to'ldiring (rasm: fayl yoki URL)"})
            }

            // Agar URL berilgan bo'lsa — shuni qisqa qator sifatida saqlaymiz.
            // Aks holda yuklangan faylni kichraytirib base64 qilamiz.
            const image = imageUrl
                ? imageUrl
                : await resizeImage(req.file.buffer);

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
