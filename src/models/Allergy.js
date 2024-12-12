const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const readAllergy = async (id) => {
  const allergy = await prisma.User.findUnique({
    where: {
      id: id,
    },
    select: {
      Allergy: true,
    },
  });
  return allergy;
};

const readAllergyAllUsers = async () => {
  const allergy = await prisma.Allergy.findMany({});
  return allergy;
};

const createAllergy = async (id, allergyData) => {
  const allergy = await prisma.Allergy.create({
    data: {
      user_id: id,
      allergy: { data: allergyData },
    },
  });
  return allergy;
};

const updateAllergy = async (id, allergyData) => {
  const allergy = await prisma.Allergy.update({
    where: {
      user: {
        id: id,
      },
      user_id: id,
    },
    data: {
      allergy: { data: allergyData },
    },
  });
  return allergy;
};

module.exports = {
  readAllergy: readAllergy,
  readAllergyAllUsers: readAllergyAllUsers,
  createAllergy: createAllergy,
  updateAllergy: updateAllergy, 
};
