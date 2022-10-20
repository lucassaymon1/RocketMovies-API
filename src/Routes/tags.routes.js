const {Router} = require("express")

const tagsRoutes = Router()

const TagsController = require("../Controllers/TagsController")

const tagsController = new TagsController()

tagsRoutes.get("/:user_id", tagsController.show)

module.exports = tagsRoutes