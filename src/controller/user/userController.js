const userData = require("../../../data/userData.json");
const getAllUsers = async (req, res) => {
  try {
    res.render("index", { userData });
  } catch (err) {
    console.log(err.message);
    return res.send("error");
  }
};

module.exports = {
  getAllUsers,
};
