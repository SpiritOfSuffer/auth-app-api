const mongoose = require('mongoose');
const config = require('./config');

/*var makeConnection = function() {
    mongoose.connect(config.DB, { useNewUrlParser: true }).then(
        () => { console.log('Connected to the database') },
        (err) => { console.log(`Can not connect to the database: ${err}`) }
    );
};*/

module.exports = function makeConnection() {
    mongoose.connect(config.DB, { useNewUrlParser: true }).then(
        () => { console.log('Connected to the database') },
        (err) => { console.log(`Can not connect to the database: ${err}`) }
    );
};;

