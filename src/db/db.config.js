const { withAccelerate } = require("@prisma/extension-accelerate");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient().$extends(withAccelerate());

module.exports = prisma;
