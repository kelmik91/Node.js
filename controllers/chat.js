const models = require('../models');

exports.getChat = (req, res, next) => {
    if (!req.session.username) {
        res.redirect('/auth/login/')
    } else {
        models.Chat.getChatDB().then(([rows, fieldData]) => {
            console.log(rows);
            res.render('chat', { chat: rows });
        })
    }
}
