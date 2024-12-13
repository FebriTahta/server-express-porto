// controller berfungsi untuk handle request & response
// 1..  import express
// 2..  import service
const express = require('express'); // 1
const techServices = require('./tech.service') /// 2

class TechController {
    async techList(req, res) {
        try {
            const showData = await techServices.techList();
            res.send(showData);
        } catch (error) {
            res.send(error);
        }
    }

    async createTech(req, res) {
        console.log("Request Body:", req.body); // Cek body yang diterima
        try {
            // request body
            const requestBody = req.body;
            // panggil service dari create techSkill
            const newTechSkill = await techServices.createTech(requestBody);
            res.status(newTechSkill.code).send(newTechSkill);
    
        } catch (error) {
            res.send(error)
        }
    }

    async findTech(req, res) {
        try {
            const params = req.params;
            const find = await techServices.findTech(params.techName);
            res.send(find);
        } catch (error) {
            res.send(error) 
        }
    }
}

module.exports = new TechController();