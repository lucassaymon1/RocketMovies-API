const AppError = require("../utils/AppError")
const knex = require("../database/knex")

class MoviesController{

  // create a movie note
  async create(request, response){
    const {title, description, rating, tags} = request.body
    const {user_id} = request.params

    if(!title){
      throw new AppError("O título do filme é obrigatório para criar uma nota!")
    }
    if(rating < 0 || rating > 5){
      throw new AppError("A sua nota para o filme deve ser um valor de 0 a 5!")
    }

    const id = await knex("movie_notes").insert({
      title,
      description,
      rating,
      user_id,
      tags
    })

    response.json({title, description, rating, tags})
  }

  // show a specific registered movie note
  async show(request, response){
    const {id} = request.params

    const note = await knex("movie_notes").where({id}).first()
    const user_id = note.user_id

    const note_user = await knex("users").where({id: user_id}).first()
    const username = note_user.name

    return response.json({
      ...note,
      "Usuário": `${username}`
    })
  }

}

module.exports = MoviesController