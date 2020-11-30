exports.indexPage = (req, res, next) => {
    res.render('index', { title: 'Task App', message: 'Hello, World!' })
}