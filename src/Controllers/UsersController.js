const knex = require("../database/knex")
const AppError = require("../utils/AppError")

// criar classe para distribuir melhor funções do controller
class UsersController{

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
}

module.exports = UsersController