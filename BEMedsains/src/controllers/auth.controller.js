const userRepository = require("../repositories/user.repositories");
const { compare, hash } = require("../lib/bcrypt");
const { createToken } = require("../lib/jwt");

// Admin Register Controller

const adminRegister = async (req, res) => {
  try {
    // check user superadmin
    const checkedUserRole = await userRepository.getUser({ role: 1 });

    if (checkedUserRole) throw { message: "Unauthorized", statusCode: 401 };

    const newUser = await userRepository.createUser({ ...req.body, role: 1 });
    if (!newUser) throw { message: "Register Failed", statusCode: 500 };

    return res.status(201).send({ message: "success register superadmin" });
  } catch (error) {
    return res.send({
      message: error.message || error,
      status: "failed",
      statusCode: error.statusCode,
    });
  }
};

// Login Controller
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
    return res
      .status(200)
      .send({
        message: "Successfully logged in!",
        data: { accessToken: token },
      });
  } catch (error) {
    return res.status(500).send({ message: error.message || error });
  }
};

// Register Controller
const register = async (req, res) => {
  try {
    if (+req.user.role !== 1) throw { message: "Unauthorize", statusCode: 401 };
    // get user by email and username
    const getUserByUsername = await userRepository.getUser(req.body.username);
    if (getUserByUsername)
      throw { message: "username is already exist", statusCode: 409 };

    const getUserByEmail = await userRepository.getUser(req.body.email);
    if (getUserByEmail)
      throw { message: "email is already exist", statusCode: 409 };

    const newUser = await userRepository.createUser(req.body);
    if (!newUser) throw { message: "Register Failed", statusCode: 500 };

    return res.status(201).send({ message: "Successfully Register" });
  } catch (error) {
    return res.send({
      message: error.message || error,
      status: "failed",
      statusCode: error.statusCode,
    });
  }
};

module.exports = {
  adminRegister,
  login,
  register,
};
