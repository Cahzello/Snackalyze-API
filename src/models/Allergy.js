const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const readAllergy = async (id) => {
  const allergy = await prisma.User.findUnique({
    where: {
      id: id
    },
    select:{
      Allergy: true
    }
  });
  return allergy;
};

const readAllergyAllUsers = async () => {
  const allergy = await prisma.Allergy.findMany({});
  return allergy;
};

const upsertAllergy = async (id, allergyData) => {
  return await prisma.Allergy.upsert({
      where: {
      user_id: id,
    },
    create: {
      allergy: { data: allergyData},
    },
    update: {
      allergy: { data: 'test'},
    },
  });
};

module.exports = {
  readAllergy: readAllergy,
  upsertAllergy: upsertAllergy,
  readAllergyAllUsers: readAllergyAllUsers
};
