// controller berfungsi untuk handle request & response
// 1..  import express
// 2..  express.Eouter
// 3..  import service
const express = require('express'); // 1
const router = express.Router(); // 2
const {serviceCreateTechSkill, serviceGetTechSkill} = require('./tech.service') /// 3

// get untuk menampilkan data
router.get('/', async (req, res) => {
    try {
        const showData = await serviceGetTechSkill();
        res.send(showData);
    } catch (error) {
        res.send(error);
    }
});

// post untuk create data baru
router.post('/', async (request, response) => {
    try {

        // request body
        const requestBody = request.body;
        // panggil service dari create techSkill
        const newTechSkill = await serviceCreateTechSkill(requestBody);
        response.send(newTechSkill);

    } catch (error) {
        response.send(error)
    }
});

module.exports = router;