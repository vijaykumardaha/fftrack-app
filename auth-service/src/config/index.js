require("dotenv").config();

module.exports = {
    PORT: process.env.PORT,
    HOST: process.env.HOST,
    DB_URL: process.env.DATABASE,
    APP_SECRET: process.env.SECRET,
}
