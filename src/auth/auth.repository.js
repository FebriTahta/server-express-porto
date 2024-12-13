const {masterPrisma} = require('../db');
const bcrypt = require('bcryptjs');

class AuthRepository {
    async register(requestBody) {
        const { username, password, role } = requestBody;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newData = await masterPrisma.User.create({
            data: {
                username: username,
                password: hashedPassword,
                userRoles: {
                    create: role.map((roleName) => ({
                        role: {
                            connectOrCreate: {
                                where: { name: roleName }, // Cari berdasarkan nama role
                                create: { name: roleName }, // Buat role jika belum ada
                            },
                        },
                    })),
                },
            },
        });
    
        return newData;
    }

    async findUsername(username) {
        const findData = await masterPrisma.User.findUnique({
            where: { username: username },
            select: {
                username: true,
                userRoles: {
                    select: {role:true}
                },
            },
        });
        return findData;
    }

    async login(requestBody) {
        const {username} = requestBody;
        const user = await masterPrisma.User.findUnique({
            where: { username },
            select: {
                id: true,
                username: true,
                password: true,
                userRoles: {
                    select: { role: true }
                },
            },
        });
        

        return user;
    }
}

module.exports = new AuthRepository();