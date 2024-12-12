const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/Authorizatoin");
const response = require("../skemaResponse");
const {getDataUser, updateUser, updateAllergyController} = require("../controller/profile");

router.get("/", authenticateToken, async (req, res) => {
  response(res, {
    status: 400,
    message: "Bad Request",
    payload: {
      message: "i think u missed dynamic parameter",
    },
  });
});

router.get("/:id", authenticateToken, async (req, res) => {
  const data = await getDataUser(req, res);
  response(res, data);
});

router.post("/:id", authenticateToken, async (req, res) => {
  const data = await updateUser(req);
  response(res, data);
});

router.post("/allergy/:id", authenticateToken, async (req, res) => {
  const data = await updateAllergyController(req);
  response(res, data);
});

/* 
router.put("/:id", authenticateToken, async (req, res) => {
  const userData = req.body;
  const userId = req.params.id;

  try {
    const statusUpdate = await updateUserData(userId, userData);

    if (!statusUpdate) {
      response(res, { status: 400, message: "Bad Request" });
    }
  } catch (error) {
    response(res, { status: 500, message: "Internal Server Error" });
  }

  response(res, { status: 200, message: "Success" });
});
*/

module.exports = router;
