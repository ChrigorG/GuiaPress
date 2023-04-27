const express = require("express");
const router = express.Router();
const category = require("../categories/Category");

//Method GET

router.get("/articles", (req, resp) => {
    resp.send("Articles");
});

router.get("/admin/articles/new", (req, resp) => {
    category.findAll().then(category => {
        resp.render("admin/articles/new", {category:category});
    }).catch(erro => {
        resp.redirect("/admin/articles");
    });
});

module.exports = router;