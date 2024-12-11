const { findUserById } = require("../models/User");

const getDataUser = async (req, res) => {
  try {
    if (req.user.id !== parseInt(req.params.id)) {
      return res, { status: 403, message: "Forbidden" };
    }

    const { id, username, email, created_at } = await findUserById(
      parseInt(req.params.id)
    );

    const jsonData = { id, username, email, created_at };

    return { status: 200, message: "Success", payload: jsonData };
  } catch (err) {
    console.log(err);
    return res, { status: 404, message: "Data not found" };
  }
};

module.exports = getDataUser;
