const {Router} = require("express")

const usersRoutes = Router()

// interligar com o controller
const UsersController = require("../Controllers/UsersController")

// inicializar a classe do controller
const usersController = new UsersController()

// chamar a tarefa create dentro do controller
usersRoutes.post("/", usersController.create)

module.exports = usersRoutes