// require the library
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/codeial_development');

const db = mongoose.connection;

// If error
db.on('error',console.error.bind(console,'Error Connecting To The :: MONGODB'));
// Successfully Connect To The DataBase
db.once('open',function(){
    console.log('SuccessFully Connected To The :: DATABASE');
});

// Export The DB

module.exports = db;