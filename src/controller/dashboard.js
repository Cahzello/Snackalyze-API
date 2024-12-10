const { readAllergy } = require("../models/Allergy");

const getAllergy = async (req, res) => {
  const userId = req.user.id;
  const allergy = await readAllergy(userId);
  return allergy;
};

module.exports = getAllergy;
