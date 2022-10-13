const { Router } = require("express")

const moviesRoutes = Router()
const MovieController = require("../Controllers/MoviesController")

const movieController = new MovieController()

moviesRoutes.post("/:user_id", movieController.create)
moviesRoutes.get("/:id", movieController.show)

module.exports = moviesRoutes