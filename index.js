const express = require('express');
const cors = require('cors');
const productRoutes = require('./src/routers/product.routes');
const app = express();
require('dotenv').config();
const connectDB = require('./src/config/db');

connectDB();

app.use(cors());
// base64 rasmlar katta bo'lishi mumkin — JSON limitini oshiramiz
app.use(express.json({ limit: '15mb' }));

// Root route — server tirikligini ko'rsatadi (Render tekshiruvi uchun)
app.get('/', (req, res) => {
    res.json({
        status: 'ok',
        message: '1010 o\'quvchila backend ishlayapti',
        endpoints: {
            list: 'GET /api/products',
            create: 'POST /api/products/create',
            delete: 'DELETE /api/products/:id'
        }
    });
});

app.use('/api', productRoutes);

// Multer va boshqa xatolar uchun umumiy error handler
app.use((err, req, res, next) => {
    if (err) {
        return res.status(400).json({ message: err.message });
    }
    next();
});

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});