const transController = require('./controllers/TodoController')
const userController = require('./controllers/UserController')
const authController = require('./controllers/AuthController')

const _routes = [
    ['user', userController],
    ['trans', transController],
    ['', authController]
]

const routes = (app) => {
    _routes.forEach(route =>{
        const [url, controller] = route
        app.use(`/api/${url}`, controller)
    })
}

module.exports = routes