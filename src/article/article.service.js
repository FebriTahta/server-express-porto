// handle logika bisnis if else dsb
// function yang reusable
const { articleCount, articleList, findArticle, createArticle } = require("./article.repository");
const { pagination } = require("../utils");

const serviceArticleList = async (page) => {
    const totalCount = await articleCount(); // Hitung total artikel dari repository
    const { offset, totalPages, nextPage, previousPage, limit } = pagination(page, totalCount); // panggil pagination dari utils / helpers
    const articles = await articleList(offset, limit) // menampilkan daftar artikel berdasarkan offet
    // return value sebagai response
    return {
        message: 'Showing article list with pagination',
        currentPage: page,
        nextPage: nextPage,
        previousPage: previousPage,
        totalPages: totalPages,
        totalCount: totalCount,
        data: articles,
        res: true
    };
}

const serviceFindArticle = async (slug) => {
    const article = await findArticle(slug);
    if (!article) {
        return { 
            status: 'error',
            message: 'Article Not Found',
            res: false
        }; // Tangani jika artikel tidak ditemukan
    }
    return {
        status: 'success',
        message: 'Showing detail article : ' + article.title,
        data: article,
        res: true
    };
}

const serviceCreateArticle = async (requestBody) => {

    const existingArticle = await serviceFindArticle(requestBody.slug); // reusable service
    if (existingArticle.res == true) {
        return {
            status: 'error',
            message: 'Article with the same title already exist',
            res: false
        }
    }

    const newArticle = await createArticle(requestBody);
    return {
        status: 'success',
        message: 'Create new article success',
        data: newArticle,
        res: true
    };
}

module.exports = {
    serviceArticleList, serviceCreateArticle, serviceFindArticle
}