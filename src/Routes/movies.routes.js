const { Router } = require("express")

const moviesRoutes = Router()
const MovieController = require("../Controllers/MoviesController")

const movieController = new MovieController()

// methods to call tasks in movies notes
moviesRoutes.post("/:user_id", movieController.create)
moviesRoutes.get("/:id", movieController.show)
moviesRoutes.put("/:id", movieController.update)
moviesRoutes.get("/", movieController.index)
moviesRoutes.delete("/:id", movieController.delete)

module.exports = moviesRoutes