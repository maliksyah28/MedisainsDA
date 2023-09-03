module.exports = {
  register: async (req, res) => {
    try {
      res.status(200).send({
        message: "Register",
      });
    } catch (error) {}
  },

  login: async (req, res) => {
    try {
      res.status(200).send({
        message: "Login",
      });
    } catch (error) {}
  },
};
