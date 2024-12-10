const {readAllergy} = require("../models/Allergy");

const dashboard = async (req, res) => {
    const allergy = await readAllergy();
    return allergy;
}

module.exports = dashboard;