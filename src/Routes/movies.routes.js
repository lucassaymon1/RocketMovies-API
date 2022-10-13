const { Router } = require("express")

const moviesRoutes = Router()
const MovieController = require("../Controllers/MoviesController")

const movieController = new MovieController()

// methods to call tasks in movies notes
moviesRoutes.post("/:user_id", movieController.create)
moviesRoutes.get("/:id", movieController.show)

module.exports = moviesRoutes