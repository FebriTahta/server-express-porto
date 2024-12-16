const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { dbConnect } = require("./db");
const router = require('./routes');
const path = require('path');

dotenv.config(); // config agar bisa memanggil value pada .env
const PORT = process.env.PORT || 2020; // memanggil value port pada .env

const app = express(); // set project ke express

(async () => { // tes koneksi ke database
    await dbConnect();
})();

// middleware
app.use(express.json()); // set response dalam bentuk json

// cors
app.use(cors({
    origin: 'http://localhost:3000', // Ganti dengan domain asal yang diizinkan
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


// router
app.use('/', router); // router

// start server
app.listen(PORT, () => { // console starting project
    console.log('Express API running on PORT : ' + PORT);
});

// Middleware untuk menyajikan folder uploads sebagai folder publik
app.use('/uploads', express.static('uploads'));