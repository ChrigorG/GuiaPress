const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const connection = require("./database/database");
const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController"); 


//View engine
app.set("view engine", "ejs");

//Static (Public)
app.use(express.static("public"));

//Body-parser
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

//Database
connection.authenticate()
.then(() => {
    console.log("Connected to database MySQL");
}).catch((msgError) => {
    console.log(msgError);
});

//Router
app.use("/", categoriesController);
app.use("/", articlesController);

app.get("/", (req, resp) => {
    resp.render("index");
});

app.listen(8080, () => {
    console.log("Only GuiaPress");
});