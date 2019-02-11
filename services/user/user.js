const User = require('../../entities/User');

const userService = {
    findOneByEmail: async function(email) {
        return await User.findOne({
            email: email
        })
    },
  
    findOneByName: async function(name) {
        return await User.findOne({
            name: name
        })
    },

    sendMail: function(user) {
        const sendmail = require('sendmail')();

        sendmail({
        from: 'auth@auth.org',
        to: user.email,
        subject: 'Successfull registration!',
        html: `<p>You have been register on our service. Your name is: ${user.name}. Use it for login</p>`
        }, function (err, reply) {
        console.log(err && err.stack)
        console.dir(reply)
        })
    }
  };

module.exports = userService;  


