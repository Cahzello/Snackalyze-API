const { readAllergy, updateAllergy } = require("../models/Allergy");
const { findUserById, updateUserData } = require("../models/User");

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

const updateUser = async (req) => {
  try {
    if (req.user.id !== parseInt(req.params.id)) {
      return { status: 403, message: "Forbidden" };
    }
    
    if (req.body.username == undefined && req.body.email == undefined) {
      return { status: 400, message: "Bad Request" };
    }

    const dataToBeUpdated = {
      username: req.body.username,
      email: req.body.email,
    };

    const data = await updateUserData(req.user.id, dataToBeUpdated);
    return { status: 200, message: "Success updated", payload: data };
  } catch (err) {
    return { status: 500, message: "Internal Server Error" };
  }
};

module.exports = {
  getDataUser: getDataUser,
  getAllergy: getAllergy,
  updateAllergyController: updateAllergyController,
  updateUser: updateUser,
};
