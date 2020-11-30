const db = require('./db.js');
const config = require('../config');
const fs = require('fs');

class Chat {
    static async init() {
        if (config.db.cleanOnStartup) {
            await db.execute('DROP TABLE IF EXISTS `chat`');
        }

        await db.execute(`CREATE TABLE IF NOT EXISTS chat (
            id INT UNSIGNED NOT NULL AUTO_INCREMENT,
            username VARCHAR(255) NOT NULL,
            message TEXT NOT NULL ,
            PRIMARY KEY (id),
            UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE);`);

        console.log('Chat table initialised');
    }

    static async getChatDB() {
        const chat = await db.query('SELECT * FROM chat');
        return chat;
    }

    static async createChat(chat) {
        const newChat = await db.query('INSERT INTO chat(username, message) VALUES (?, ?)', chat);
        return newChat;
    }

}

module.exports = Chat;
