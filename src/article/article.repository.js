// berfungsi untuk handle segala urusan database berupa query
const {masterPrisma} = require('../db')

class ArticleRepositories {
    async articleCount() {
        const data = masterPrisma.Article.count();
        return data;
    }

    async articleList(offset, limit) {

        // // karena menggunakan pagination maka tidak disarankan menjalankan lebih dari 1 query agar saat menjalankan pagination tidak menjalankan query lain yang tidak perlu 
        //    const [articles, tags] = await Promise.all([ // Menjalankan kedua query secara paralel untuk efisiensi.
        //         masterPrisma.Article.findMany({
        //             where: { status: 1 },
        //             include: { tags: true },
        //             skip: offset,
        //             take: limit,
        //             orderBy: { id: 'desc' }
        //         }),
        //         masterPrisma.Tag.findMany({
        //             orderBy: {id: 'desc'}
        //         })
        //     ]);
        //     return { articles, tags };

        const data = masterPrisma.Article.findMany({
            where: {status: 1},
            include: {tags: true},
            skip: offset,
            take: limit,
            orderBy: {id: 'desc'}
        })

        return data;
    }

    async findArticle(slug) {
        const data = masterPrisma.Article.findUnique({ 
            where: { slug: slug },
            include: { tags: true }, // Sertakan tags dalam respons
        });
    
        return data;
    }

    async createArticle(requestBody) {
        const data = masterPrisma.Article.create({ // paling atas nama tabel 
            data: {
                title: requestBody.title, // sebelah kiri nama kolom   // sebelah kanan mengambil properti dari request body
                body: requestBody.body, // sebelah kiri nama kolom     // sebelah kanan mengambil properti dari request body
                slug: requestBody.slug, // sebelah kiri nama kolom     // sebelah kanan mengambil properti dari request body
                tags: { // nama kolom relasi
                    connectOrCreate: requestBody.tags.map((tag) => ({
                        where: { name: tag }, // sebelah kiri nama kolom   // sebelah kanan mengambil properti dari request body
                        create: { name: tag }, // sebelah kiri nama kolom   // sebelah kanan mengambil properti dari request body
                    })),
                },
            },
            include: {
                tags: true, // Include tags in view response
            },
        });
    
        return data;
    }
}

module.exports = new ArticleRepositories();