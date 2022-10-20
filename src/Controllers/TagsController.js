const knex = require("../database/knex")
const AppError = require("../utils/AppError")

class TagsController{

  async show(request, response){
    const {user_id} = request.params

    const user_tags = await knex("movie_tags").where({user_id})

    return response.json({
      user_tags
    })

  }
}

module.exports = TagsController