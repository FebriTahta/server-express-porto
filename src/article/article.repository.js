// berfungsi untuk handle segala urusan database berupa query
const masterPrisma = require('../db')

const articleCount = () => {
    const data = masterPrisma.Article.count();
    return data;
}

const articleList = (offset, limit) => {
    const data = masterPrisma.Article.findMany({
        where: {status: 1},
        include: {tags: true},
        skip: offset,
        take: limit,
        orderBy: {id: 'desc'}
    })

    return data;
}

const findArticle = (slug) => {
    const data = masterPrisma.Article.findUnique({ 
        where: { slug: slug },
        include: { tags: true }, // Sertakan tags dalam respons
    });

    return data;
}

const createArticle = (requestBody) => {
    const data = masterPrisma.Article.create({
        data: {
            title: requestBody.title,
            body: requestBody.body,
            slug: requestBody.slug,
        tags: {
            connectOrCreate: requestBody.tags.map((tag) => ({
                where: { name: tag },
                create: { name: tag },
            })),
        },
        },
        include: {
            tags: true, // Include tags in view response
        },
    });

    return data;
}

module.exports = {
    articleCount, articleList, findArticle, createArticle
}