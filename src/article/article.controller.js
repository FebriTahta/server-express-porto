// khusus untuk handle request & response
const articleServices = require('./article.service');
const { createSlug, errorDataFormatter } = require("../utils");

class ArticleController {
    async articleList(req, res) {
        try {
            // page termasuk request jadi dihandle oleh controller
            let page = parseInt(req.query.page) || 1; // Ambil parameter page dari request
            if (page < 1) {
                page = 1
            }
            const articles = await articleServices.ArticleList(page);
            res.send(articles);
    
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'something error when fetching data',
                error: errorDataFormatter(error.message),
            });
        }
    }

    async findArticle(req, res) {
        const { slug } = req.params;
        let article;
        
        try {
            article = await articleServices.findArticle(slug);
            res.status(200).json(
                article,
            );
        } catch (error) {
            res.status(500).json({
                message: 'something error when fetching data',
                error: errorDataFormatter(error.message),
            });
        }
    }

    async createArticle(req, res) {
        try {
            const requestBody = req.body;
    
            const slug = createSlug(requestBody.title);
            requestBody.slug = slug;
            
            const newArticle = await articleServices.createArticle(requestBody);
    
            res.status(201).json(newArticle);
    
        } catch (error) {
            res.status(500).json({
                message: 'An error occurred while creating the article',
                error: errorDataFormatter(error.message),
            });
        }
    }
}

module.exports = new ArticleController();