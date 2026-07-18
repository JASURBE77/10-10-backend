const express = require('express');
const productRoutes = require('./src/routers/product.routes');
const app = express();
require('dotenv').config();
const connectDB = require('./src/config/db');

connectDB();

app.use(express.json());

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