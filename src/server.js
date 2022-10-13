require("express-async-errors")
const AppError = require("./utils/AppError")

const express = require("express")

const routes = require("./Routes")

const app = express()

// para que o programa receba e entenda o dados enviados em formato json({})
app.use(express.json())
const port = 3333

app.get("/", (request, response) => {
  response.send("Bem vindos ao meu servidor!! Dessa fez eu fiz sozinho!")
})

app.get("/home", (request, response) => {
  response.send("Agora você está na rota da home page!")
})

app.get("/:id/:username/:specialization", (request, response) => {
  const {id, username, specialization} = request.params

  response.send(`Id do usuário: ${request.params.id}, Nome do Usuário: ${request.params.username}, Área de especialização profissional: ${request.params.specialization} 
  <br> 
  <br>
  Listando os valores de forma desestruturada: Id: ${id}, Nome do usuário: ${username}, Especialização: ${specialization}`)
})

app.use(routes)

// tratamento de erro
app.use((error, request, response, next) => {

  if(error instanceof AppError){
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    })
  }

  console.error(error)

  return response.status(500).json({
    status: "error",
    message: "Internal server error"
  })

})

app.listen(port, () => {
  console.log(`Server is running at port ${port} (http://localhost:${port})`)
})



/* função de callback é uma função que é executada sempre que um determinado evento acontece */