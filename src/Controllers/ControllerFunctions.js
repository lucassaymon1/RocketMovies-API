const AppError = require("../utils/AppError")
const knex = require("../database/knex")
const express = require("express")

module.exports = {
  validateEmail(email){

    const validationStructure = /\S+@\S+\.\S+/
    
    const validate = validationStructure.test(email)
    
    if(!validate){
      throw new AppError("Digite um endereço de email válido!")
    }
    
    console.log("email validado!")
  },
  async verifyEmail(email, id){
    const emailExists = await knex("users").where({email}).first()

    if(emailExists && emailExists.id != id){
      throw new AppError("Esse endereço de email já está em uso")
    }
    console.log("Este email ainda não foi utilizado")
  }
}