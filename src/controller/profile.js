const { readAllergy, updateAllergy } = require("../models/Allergy");
const { findUserById } = require("../models/User");

const getDataUser = async (req, res) => {
  try {
    if (req.user.id !== parseInt(req.params.id)) {
      return { status: 403, message: "Forbidden" };
    }

    const dataUser = await findUserById(parseInt(req.params.id));

    return { status: 200, message: "Success", payload: dataUser };
  } catch (err) {
    console.log(err);
    return { status: 404, message: "Data not found" };
  }
};

const getAllergy = async (req, res) => {
  try {
    if (req.user.id !== parseInt(req.params.id)) {
      return { status: 403, message: "Forbidden" };
    }

    const data = await readAllergy(req.user.id);
    return { status: 200, message: "Success", payload: data };
  } catch (err) {
    console.log(err);
    return { status: 500, message: "Internal Server Error" };
  }
};

const updateAllergyController = async (req) => {
  try {
    if (req.user.id !== parseInt(req.params.id)) {
      return { status: 403, message: "Forbidden" };
    }
    const dataAllergy = await updateAllergy(req.user.id, req.body.allergy);
    return {
      status: 201,
      message: "Success",
      payload: dataAllergy,
    };
  } catch (err) {
    console.log(err);
    return { status: 500, message: "Internal Server Error" };
  }
};

module.exports = {
  getDataUser: getDataUser,
  getAllergy: getAllergy,
  updateAllergyController: updateAllergyController,
};
