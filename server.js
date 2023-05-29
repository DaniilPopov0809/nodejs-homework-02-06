const mongoose = require("mongoose");

const app = require('./app')

const DB_HOST =
  "mongodb+srv://Daniil:PyySAGlF1PamnE7v@cluster0.ffokdus.mongodb.net/db_contacts?retryWrites=true&w=majority";
mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log("Database connection successful")})
  .catch((error) =>  console.log(error.message));


