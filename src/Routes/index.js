const {Router} = require("express")
//inicializar o router e poder usar as rotas
const routes = Router()

const usersRouter = require("./users.routes")
const moviesRouter = require("./movies.routes")

routes.use("/users", usersRouter)
routes.use("/movies", moviesRouter)

module.exports = routes