const {readAllergy} = require("../models/Allergy");

const dashboard = async (req, res) => {
    const userId = req.user.id;
    const allergy = await readAllergy(userId);
    console.log(allergy)
    return allergy;
}

module.exports = dashboard; 