const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const session = require("express-session");
const connection = require("./database/database");

const categoriesController = require("./categories/categoriesController");
const articlesController = require("./articles/articlesController"); 
const usersController = require("./user/usersController");

const articles = require("./articles/Article");
const category = require("./categories/Category");
const user = require("./user/User");

//View engine
app.set("view engine", "ejs");

//Session
app.use(session({
    secret: "key_character",
    cookie: { 
        maxAge: 30 * 60 * 1000 
    }
}));

//Static (Public)
app.use(express.static("public"));

//Body-parser
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

//Database
connection.authenticate()
.then(() => {
    console.log("Connected to database MySQL");
}).catch(err => {
    console.log(err);
});

//Router
app.use("/", categoriesController);
app.use("/", articlesController);
app.use("/", usersController);

app.get("/", (req, resp) => {
    articles.findAll({
        order: [
            ['id', 'DESC']
        ],
        limit: 4
    }).then(article => {
        category.findAll().then(categories => {
            resp.render("index", {article: article, categories: categories});
        });
    });
});

app.get("/:slug", (req, resp) => {
    const slug = req.params.slug;

    articles.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if(article != undefined){
            category.findAll().then(categories => {
                resp.render("viewarticle", {article: article, categories: categories});
            });
        }else{
            resp.redirect("/");
        }
    }).catch(err => {
        resp.redirect("/");
    });
});

app.get("/category/:slug", (req, resp) => {
    const slug = req.params.slug;

    category.findOne({
        where: {
            slug: slug
        },
        include: [{model: articles}]
    }).then(categorys => {
        if(categorys != undefined){  
            category.findAll().then(categories => {
                console.log(categories) 
                resp.render("index", {article: categorys.articles, categories: categories});
            });
        }else{
            resp.redirect("/");
        }
    }).catch(err => {
        resp.redirect("/");
    });
});

app.listen(8083, () => {
    let date = new Date();
    console.log(`Only GuiaPress --> ${date}`);
});