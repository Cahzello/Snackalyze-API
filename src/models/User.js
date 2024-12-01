const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const registing = async (newUser) => {
  const { username, password, email } = newUser;
  const user = {
    data: {
      username: username,
      password: password,
      email: email,
    },
  };
  return await prisma.User.create(user);
};

const login = async () => {
  const users = await prisma.User.findMany();
  return users;
};

module.exports = { registing: registing, login: login };
