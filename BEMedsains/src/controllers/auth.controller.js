const userRepository = require("../repositories/user.repositories");
const { compare, hash } = require("../lib/bcrypt");
const { createToken } = require('../lib/jwt');
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
    
    if (!getUser) {throw { message: "username atau password salah", statusCode: 500 };}
      
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
    if (!checkPassword) {throw { message: "username atau password salaha", statusCode: 500 };}
      
    const userdata = getUser.dataValues
    const token = createToken({
      userId: userdata.id,
      first_name: userdata.fullname,
    });
    return res.status(200).send({ message: "Successfully logged in!", data :{accessToken: token} });
  } catch (error) {
    return res.status(500).send({ message: error.message || error });
  }
};

module.exports = {
  register,
  login,
};
