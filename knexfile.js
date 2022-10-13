// path é um recurso que permite construir rotas que são entendidas por qualquer sistema operacional
const path = require("path")

// método que vai definir conexões e criar migrações para o banco de dados
module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      // construção de rotas pelo path
      filename: path.resolve(__dirname, "src", "database", "database.db")
    },
    migrations: {
      directory: path.resolve(__dirname, "src", "database", "knex", "migrations")
    },
    useNullAsDefault: true
  },

};
