// khusus untuk handle request & response

const express = require("express");
const {serviceArticleList, serviceCreateArticle, serviceFindArticle} = require('./article.service');
const { createSlug, errorDataFormatter } = require("../utils");

// router
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        // page termasuk request jadi dihandle oleh controller
        let page = parseInt(req.query.page) || 1; // Ambil parameter page dari request
        if (page < 1) {
            page = 1
        }
        const articles = await serviceArticleList(page);
        res.send(articles);

    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Something went wrong while fetching data.' + error});
    }
});

router.get('/:slug', async (req, res) => {
    const { slug } = req.params;
    let article;
    
    try {
        article = await serviceFindArticle(slug);
    } catch (error) {
        return res.status(500).send({ error: 'Something went wrong while fetching data' + article});
    }
    
    res.status(200).json(
        article,
    );
});

router.post('/', async (req, res) => {
    try {
        const requestBody = req.body;

        const slug = createSlug(requestBody.title);
        requestBody.slug = slug;
        
        const newArticle = await serviceCreateArticle(requestBody);

        res.status(201).json(newArticle);

    } catch (error) {
        res.status(500).json({
            message: 'An error occurred while creating the article',
            error: errorDataFormatter(error.message),
        });
    }
});

module.exports = router ;