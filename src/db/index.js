const { PrismaClient: PrismaMasterClient } = require('../../prisma/generated/master');
const masterPrisma = new PrismaMasterClient();

const dbConnect = async () => {
    try {
        // Hubungkan ke database
        await masterPrisma.$connect();
        console.log("Database connected successfully!");
    } catch (error) {
        console.error("Error connecting to the database:", error.message);
        process.exit(0); // Keluar dari proses jika gagal
    }
};

module.exports = { masterPrisma, dbConnect };
