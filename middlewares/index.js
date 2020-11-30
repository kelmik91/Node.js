exports.logSession = (req, res, next) => {
    console.log('Session:', req.session);
    next();
}