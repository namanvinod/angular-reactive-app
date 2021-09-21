
let mongoose = require('mongoose');
// let requestDAL = require('./request-dal');

const config = {
    connectionString: 'mongodb://localhost:27017',
    dbName: 'request'
}

const connect = async function () {
    if (mongoose.connection.readyState !== 1) {
        let connection = await mongoose.connect(config.connectionString + '/' + config.dbName)
            .then(() => console.log('DB Connected.' + mongoose.connection.readyState))
            .catch(err => consoel.log('Error: ' + err));
    }
}

module.exports.connect = connect;