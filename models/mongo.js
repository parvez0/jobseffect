const mongoose = require('mongoose');
const logger = require('../logger');

const mongodbUrl = process.env.MONGODB_URL;

logger.info(`Mongodb url : `, mongodbUrl);

let usersDB = null;

(async ()=>{
    try{
        usersDB = await mongoose.createConnection(`${mongodbUrl}/users_db`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        logger.info('Connected to mongodb');
    }catch (e) {
        logger.error('Failed to connect mongodb database : ', e);
    }
})();

const UsersSchema = new mongoose.Schema({
    name: { type: String },
    number: { type: Number, index: true },
    email: { type: String, index: true },
    subject: { type: String },
    message: { type: String },
    createdDate: { type: Date, default: Date.now }
});

const Users = mongoose.model('users', UsersSchema);

module.exports = {
    Users,
};
