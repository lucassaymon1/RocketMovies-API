const {validateEmail, verifyEmail} = require("./ControllerFunctions") 
const knex = require("../database/knex")
const AppError = require("../utils/AppError")

// biblioteca para lidar com criptografias
const {hash, compare} = require("bcryptjs")

// criar classe para distribuir melhor funções do controller
class UsersController{

  // create an user
  async create(request, response){
    const {name, email, password} = request.body

    if(!name){
      throw new AppError("O nome do usuário é obrigatório")
    }

    validateEmail(email)
    await verifyEmail(email, null)

    // função para criptografar senhas (senha, complexidade da criptografia)
    const hashedPassword  = await hash(password, 8)

    const user_id = await knex("users").insert({
      name,
      email,
      password: hashedPassword
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
    const {name, email, old_password, password} = request.body

    const user = await knex("users").where({id}).first()

    validateEmail(email)
    await verifyEmail(email, id)

    // se name não possui valor, usa user.name
    user.name = name ?? user.name
    user.email = email ?? user.email

    let alterPassword = false

    if (!old_password && password){
      const checkPassword = await compare(password, user.password)
      if(!checkPassword){
        throw new AppError("Você Precisa inserir a senha atual para modificá-la")
      }
    }
    if(old_password && !password){
      const checkOldPassword = await compare(old_password, user.password)
      if(!checkOldPassword){
        throw new AppError("senha atual incorreta")
      }
    }
    if (old_password && password){
      const checkOldPassword = await compare(old_password, user.password)
      if(!checkOldPassword){
        throw new AppError("Senha antiga não correspondente")
      }
      alterPassword = true
    }

    if(!alterPassword){
    }
    else{
      user.password = await hash(password, 8)
    }
    

    const updatedUser = await knex("users").where({id}).update({
      name: user.name,
      email: user.email,
      password: user.password
    })

    return response.json(updatedUser)
  }

  async delete(request, response){
    const {id} = request.params

    await knex("users").where({id}).delete()

    return response.json()
  }
  
}

module.exports = UsersController