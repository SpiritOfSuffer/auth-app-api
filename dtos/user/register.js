const User = require('../../entities/User');

module.exports = function registerUserDTO(data) {
    const user = new User({
        email: data.email,
        password: data.password
    }); 
    return user;
}