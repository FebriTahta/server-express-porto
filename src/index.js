const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors")

dotenv.config(); // config agar bisa memanggil value pada .env
const PORT = process.env.PORT; // memanggil value port pada .env

const app = express(); // set project ke express

app.use(express.json()); // set response dalam bentuk json
app.use(cors()); // atur cors untuk komunikasi dengan front end
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Ganti dengan domain asal yang diizinkan
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.listen(PORT, () => { // console starting project
    console.log('Express API running on PORT : ' + PORT);
});

// middleware untuk menggunakan route controller (layered architechture)
const articleController = require('./article/article.controller');
app.use('/articles', articleController);
