const {Router} = require("express")

const usersRoutes = Router()

// interligar com o controller
const UsersController = require("../Controllers/UsersController")

// inicializar a classe do controller
const usersController = new UsersController()

// methods to call tasks in users

// chamar a tarefa create dentro do controller
usersRoutes.post("/", usersController.create)
usersRoutes.get("/:id", usersController.index)
usersRoutes.put("/:id", usersController.update)
usersRoutes.delete("/:id", usersController.delete)

module.exports = usersRoutes