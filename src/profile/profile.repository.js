const {masterPrisma} = require('../db')

// untuk request tidak sama dengan nama kolom pada tabel menggunakan {contoh: requestContoh}
// jika nama request sama dengan nama kolom pada tabel tanpa perlu inisialisasi {contoh}

class ProfileRepositories {

    async getFirstProfile() {
        // pasti mengambil data profile pertama
        const firstData = await masterPrisma.profile.findFirst({
            orderBy: {
                id: 'asc'
            }
        })

        return firstData;
    }

    async findProfileByNickname(nickName) {
        const find = masterPrisma.profile.findUnique({
            where: { nickName },
        });

        return find;
    }

    async findProfileById(id) {
        const find = masterPrisma.profile.findUnique({
            where: { id: id },
        });

        return find;
    }

    async createProfile(requestBody, photoPath) {
        // Simpan ke database
        const newData = await masterPrisma.profile.create({
            data: {
                name: requestBody.fullName,
                nickName: requestBody.nickname,
                desc: requestBody.description,
                ...(photoPath && { photo: photoPath }), // Hanya perbarui foto jika ada
            },
        }); 
        return newData;
    }

    async updateProfileByNick(requestBody, photoPath) {
        // Update data di database
        const updatedData = await masterPrisma.profile.update({
            where: { nickName: requestBody.nickname }, // Cari berdasarkan nickName
            data: {
                name: requestBody.name,
                desc: requestBody.desc,
                ...(photoPath && { photo: photoPath }), // Hanya perbarui foto jika ada
            },
        });
    
        return updatedData;
    }

    async updateProfileById(requestBody, photoPath) {
        // Update data di database
        const updatedData = await masterPrisma.profile.update({
            where: { id: requestBody.id }, // Cari berdasarkan nickName
            data: {
                name: requestBody.name,
                nickName: requestBody.nickName,
                desc: requestBody.desc,
                ...(photoPath && { photo: photoPath }), // Hanya perbarui foto jika ada
            },
        });
    
        return updatedData;
    }
}

module.exports = new ProfileRepositories;