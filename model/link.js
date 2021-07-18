const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
  host: process.env.db_host,
  port: process.env.db_port,
  database: process.env.db_name,
  user: process.env.db_user,
  password: process.env.db_pass
})

const execute = async (query) => {
  try {
    await pool.connect()
    await pool.query(query)
    console.log("Connected")
  } catch (error) {
    console.log(error)
  }
}
const text = `
    CREATE TABLE IF NOT EXISTS "links" (
        id serial PRIMARY KEY,
        shorter_link VARCHAR(50) NOT NULL,
        original_link VARCHAR(1000) NOT NULL,
        token VARCHAR(500) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
    );`;

execute(text).then(result => {
  if (result) {
    console.log('Table created');
  }
});
module.exports = class link {
  constructor(specification) {
    this.original_link = specification.getOriginalLink
    this.shorter_link = specification.getShorterLink
    this.token = specification.token
  }
  async save() {
    try {
      await pool.query("insert into links(shorter_link,original_link,token) values ($1,$2,$3)", [this.shorter_link, this.original_link,this.token])
    } catch (error) {
      console.log(error);
    }
  }
  static async searchOriginalLink(getOriginalLink) {
    try {
      const result = await pool.query("SELECT * FROM links WHERE original_link=$1", [getOriginalLink])
      return result.rows[0]
    } catch (error) {
      console.log(error);
    }
  }
  static async searchShorterLink(id) {
    try {
      const result = await pool.query("SELECT * FROM links WHERE shorter_link=$1", [id])
      return result.rows[0]
    } catch (error) {
      console.log(error)
    }
  }
  static async searchToken(hashToken) {
    try {
      const result = await pool.query("SELECT * FROM links WHERE token=$1", [hashToken])
      return result.rows[0]
    } catch (error) {
      console.log(error)
    }
  }
}