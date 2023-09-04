const userRepository = require("../repositories/user.repositories");
const { compare, hash } = require("../lib/bcrypt");

//Register Controller
const register = async (req, res) => {
  try {
    const newUser = await userRepository.createUser(req.body);

    return res.status(200).send({ message: "register", data: newUser });
  } catch (error) {
    return res.send({
      message: error.message || error,
      status: "failed",
      statusCode: error.statusCode,
    });
  }
};

//Login Controller
const login = async (req, res) => {
  try {
    // get User
    const getUser = await userRepository.getUser(req.body.userData);
    if (!getUser)
      throw { message: "username atau password salah", statusCode: 500 };

    // Check Password
    let checkPassword = compare(req.body.password, getUser.password);
    if (!checkPassword)
      throw { message: "username atau password salah", statusCode: 500 };

    return res.status(200).send({ message: "Successfully logged in!" });
  } catch (error) {
    return res.status(500).send({ message: error.message || error });
  }
};

module.exports = {
  register,
  login,
};
