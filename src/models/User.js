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

const addRefreshToken = async (email, refreshToken) => {
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
  const user = await prisma.User.findFirst({
    where: {
      refreshToken: refreshToken,
    },
  });
  return user;
};

const deleteRefreshToken = async (id) => {
  const user = await prisma.User.update({
    where: {
      id: id,
    },
    data: {
      refreshToken: null,
    },
  });
  return user;
};

module.exports = {
  registing: registing,
  findUser: findUser,
  addRefreshToken: addRefreshToken,
  searchRefreshToken: searchRefreshToken,
  deleteRefreshToken: deleteRefreshToken
};
