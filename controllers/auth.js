const models = require('../models');
const config = require('../config');

exports.getLogin = (req, res, next) => {
    res.render('login', {});
}

exports.postLogin = (req, res, next) => {
    const user = models.User.findUserByName(req.body.username).then (([user, fieldData]) => {
        if (user.length>0) {
            user = user[0];
            console.log(user);
            
            if (models.User.checkPassword(user, req.body.password)) {
                req.session.username = req.body.username;

                res.redirect('/');    
            } else {
                res.redirect('/auth/login/')
            }
        } else {
            res.redirect('/auth/login/');
        }
    })
}

exports.postLogout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
}

exports.getSignup = (req, res, next) => {
    res.render('signup', {});
}

exports.postSignup = (req, res, next) => {
    models.User.createUser(req.body);
    res.redirect('/auth/login/');
}