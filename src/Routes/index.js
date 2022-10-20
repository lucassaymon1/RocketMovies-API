const {Router} = require("express")
//inicializar o router e poder usar as rotas
const routes = Router()

const usersRouter = require("./users.routes")
const moviesRouter = require("./movies.routes")
const tagsRouter = require("./tags.routes")

// methods to map and call the routes
routes.use("/users", usersRouter)
routes.use("/movies", moviesRouter)
routes.use("/tags", tagsRouter)

module.exports = routes