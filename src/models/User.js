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

const findUser = async (email) => {
  const users = await prisma.User.findFirst({
    where: {
      email: email,
    },
  });
  return users;
};

const updateRefreshToken = async (email, refreshToken) => {
  const user = {
    where: {
      email: email,
    },
    data: {
      refreshToken: refreshToken,
    },
  };

  return await prisma.User.update(user);
};

const searchRefreshToken = async (refreshToken) => {
  const user = await prisma.User.findMany({
    where: {
      refreshToken: refreshToken,
    },
  });
  return user;
};

module.exports = {
  registing: registing,
  findUser: findUser,
  updateRefreshToken: updateRefreshToken,
  searchRefreshToken: searchRefreshToken
};
