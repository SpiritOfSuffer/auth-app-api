const User = require('../../entities/User');
const bcrypt = require('bcryptjs');


module.exports = async function findOneByEmail(req) {
    return await User.findOne({
        email: req.body.email
    })
}