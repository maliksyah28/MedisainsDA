const { passwordValidator } = require("../helpers");
const userRepository = require("../repositories/user.repositories");
const { compare, hash } = require("../lib/bcrypt");

const changePassword = async (req, res) => {
    try {
      const { oldPassword, newPassword, ConfirmPassword, id } = req.body;
  
      const dataUser = await userRepository.getUserById(id);
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
      const resdata = await userRepository.patchUser(passwordHash, dataUser);
  
      res.send({
        status: "Success",
        message: "Success updated password",
        detail: { resdata },
      });
    } catch (error) {
      return res.status(500).send({ message: error.message || error });
    }
  };
  
  const getUserByToken = async (req, res) => {
    try {
      const id = req.user.id;
      const data = await userRepository.getUserById(id);
      res.send({
        status: "Success",
        message: "Success get user",
        data,
      });
    } catch (error) {
      res.status(500).send({ message: "something wrong" });
    }
  };
  
  module.exports = {
    changePassword,
    getUserByToken,
  };