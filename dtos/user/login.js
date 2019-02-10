module.exports = function loginUserDTO(data) {
    const user = {
        name: data.name,
        password: data.password
    }

    return user;
} 