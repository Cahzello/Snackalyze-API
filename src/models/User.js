const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

const registing = async () => {
  const users = await prisma.User.findMany();
  return users;
};

module.exports = registing;
