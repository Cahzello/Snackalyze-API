const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const readAllergy = async () => {
  const allergy = await prisma.Allergy.findMany({});
  return allergy;
};

const insertAllergy = async (id, allergyData) => {
  return await prisma.Allergy.upsert({
    where: {
      user_id: id,
    },
    create: {
      allergy: { data: `${allergyData}` },
    },
    update: {
      allergy: { data: `${allergyData}` },
    },
  });
};

module.exports = {
  readAllergy: readAllergy,
  insertAllergy: insertAllergy,
};
