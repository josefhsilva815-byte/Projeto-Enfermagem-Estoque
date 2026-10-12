// Update with your config settings.

import path from "node:path";

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

export default {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/estoque.db'
    },
    migrations: {
      directory: path.join("./src/database/migrations")
    },
    useNullAsDefault: true
  },

  production: {
    client: 'pg',
    connection: {
      connectionString: "",
      ssl: { rejectUnauthorized: false }
    },
    migrations: {
      directory: path.join("./src/database/migrations")
    }
  }

};