const userRepository = require("../repositories/user.repositories");
const { compare, hash } = require("../lib/bcrypt");
const { createToken } = require("../lib/jwt");
const { passwordValidator } = require("../helpers");
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
    const { userData, password } = req.body;

    const getUser = await userRepository.getUser(userData);
    // console.log(getUser);

    if (!getUser) {
      throw { message: "username atau password salah", statusCode: 500 };
    }

    //sementara
    // if (password !== getUser.password) {
    //   throw {
    //     code: 400,
    //     message: 'username atau password yang anda masukan salah',
    //   };
    // }
    // Check Password
    let checkPassword = compare(password, getUser.password);
    // console.log(getUser.password);
    if (!checkPassword) {
      throw { message: "username atau password salaha", statusCode: 500 };
    }

    const userdata = getUser.dataValues;
    const token = createToken({
      userId: userdata.id,
      first_name: userdata.fullname,
    });
    return res.status(200).send({
      message: "Successfully logged in!",
      data: { accessToken: token },
    });
  } catch (error) {
    return res.status(500).send({ message: error.message || error });
  }
};
const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, ConfirmPassword, id } = req.body;

    const dataUser = await userRepository.getUserById(id);
    console.log(dataUser.dataValues);
    const compareold = compare(oldPassword, dataUser.password);
    if (!compareold) {
      res.send({ code: 400, message: "Password incorrect" });
    }
    if (newPassword !== ConfirmPassword) {
      res.send({
        code: 400,
        message: "Password doesnt match",
        detail: `Password: ${newPassword}, Confirm Password: ${ConfirmPassword}`,
      });
    }
    const validatePassword = passwordValidator(newPassword);
    if (validatePassword)
      throw {
        code: 400,
        message: validatePassword,
      };
    const passwordHash = hash(newPassword);
    resdata = await userRepository.patchUser(passwordHash, dataUser);

    res.send({
      status: "Success",
      message: "Success updated password",
      detail: { resdata },
    });
  } catch (error) {
    return res.status(500).send({ message: error.message || error });
  }
};
module.exports = {
  register,
  login,
  changePassword,
};
