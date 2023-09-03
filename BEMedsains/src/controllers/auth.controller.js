//Register Controller
const register = async (req, res) => {
  try {
    return res.status(200).send({ message: "register" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message || error });
  }
};

//Login Controller
const login = async (req, res) => {
  try {
    return res.status(200).send({ message: "Successfully logged in!" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message || error });
  }
};

module.exports = {
  register,
  login,
};
