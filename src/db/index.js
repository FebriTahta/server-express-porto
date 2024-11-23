const {PrismaClient: PrismaMasterClient} = require('../../prisma/generated/master');
const masterPrisma = new PrismaMasterClient();

module.exports = masterPrisma;