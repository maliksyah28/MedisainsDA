const { verifyToken } = require('../lib/jwt');
const { Account } = require('../../models');

const auth = async (req, res, next) => {
  try {
    const token = req.token;
    const verifiedToken = verifyToken(token);
    const responsGetUser = await Account.findOne({
      where: {
        id: verifiedToken.id,
      },
    });

    if (!responsGetUser) throw { message: 'user not found' };

    req.user = responsGetUser.dataValues;
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = { auth };
