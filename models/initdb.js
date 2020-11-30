const config = require('../config');
const db = require('./db.js');

const Task = require('./task.js');
const User = require('./user.js');
const Chat = require('./chat.js');

module.exports = async function initDB() {
    await Task.init();
    await User.init();
    await Chat.init();

    console.log('Database initialised');    
}
