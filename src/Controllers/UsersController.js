const knex = require("../database/knex")
const AppError = require("../utils/AppError")

// criar classe para distribuir melhor funções do controller
class UsersController{

  // create an user
  async create(request, response){
    const {name, email, password} = request.body

    if(!name){
      throw new AppError("O nome do usuário é obrigatório")
    }

    const user_id = await knex("users").insert({
      name,
      email,
      password
    })

    // mandar as informações em formato json({})
    response.json({name, email, password})

  }
  async index(request, response){
    const {id} = request.params

    const user = await knex("users").where({id}).first()
    const username = user.name
    const user_notes = await knex("movie_notes").where({user_id: id})

    return response.json({
      "Notas do usuário": `${username}`,
      ...user_notes
    })
  }

  async update(request, response){
    const {id} = request.params
    const {name, email, password} = request.body

    const updatedUser = await knex("users").where({id}).update({
      name: name,
      email: email,
      password: password
    })

    return response.json(updatedUser)
  }
  
}

module.exports = UsersController