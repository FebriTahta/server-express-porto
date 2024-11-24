

const masterPrisma = require('../db')

const createTechSkill = (requestBody) => {
    const dataTechSkill = masterPrisma.Tech.create({ // create merupakan orm dari prisma
        data: {
            // kolom name sesuai model prisma : name sesuai dari request body
            techName: requestBody.name, // memasukan name dari request body ke kolom name pada tabel Tech
            skills: {
                // menghubungkan skill selaku tabel B ke Tabel A (jika sudah ada) atau membuat skill baru baru jika belum ada pada database
                connectOrCreate: requestBody.skills.map((skill) => ({
                    where: {skillName: skill}, // dimana kolom namenya skill sebagai parameter penghubung atau dibuat baru
                    create: {skillName: skill} // akan di buat baru jika tidak ada di database
                }))
            },

        },
        
        include: {
            skills: true, // Include tags in view response
        },
    })

    return dataTechSkill;
}

const getTechSkill = () => {
    const showData = masterPrisma.Tech.findMany(
        {
            include: {skills: true},
        }
    );

    return showData;
}



module.exports = {
    createTechSkill, getTechSkill
}
