require("dotenv").config();
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const sequelize = require("./Util/database");
const path = require("path");

app.use(cors());
app.use(express.json());


//table
const TodoList = require("./Model/todo");
const User = require("./Model/auth");
//Route
const RouteList = require("./Router/todo");
const AuthRouter = require("./Router/auth");
app.use('/todo',RouteList);
app.use("/auth",AuthRouter);
app.use('/', (req,res) => {
  res.send('hello');
})
// Association
User.hasMany(TodoList);
TodoList.belongsTo(User);
//404
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "View", "404.html"));
});
sequelize
  .sync()
  // .sync({ force: true })
  .then(() => {
    app.listen(process.env.PORT);
  })
  .catch((err) => console.log("err errer message ", err));
