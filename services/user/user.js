const User = require('../../entities/User');


module.exports = async function findOneByEmail(email) {
    return await User.findOne({
        email: email
    })
}

module.exports = async function findOneByName(name) {
    return await User.findOne({
        name: name
    })
}