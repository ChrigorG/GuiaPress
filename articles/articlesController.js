const express = require("express");
const router = express.Router();
const category = require("../categories/Category");
const articles = require("./Article");
const slugify = require("slugify");
const adminauth = require("../middlewares/adminauth");
//Method GET

router.get("/admin/articles", adminauth, (req, resp) => {
    articles.findAll({
        include: [{model: category}]
    }).then(articles => {
        resp.render("admin/articles/articles", {articles: articles});    
    });
});

router.get("/admin/articles/new", adminauth, (req, resp) => {
    category.findAll().then(category => {
        resp.render("admin/articles/new", {category: category});
    }).catch(err => {
        resp.redirect("/admin/articles");
    });
});

router.get("/admin/articles/update/:id", adminauth, (req, resp) => {
    const id = req.params.id;
    
    articles.findByPk(id).then(articles => {
        if(articles != undefined){
            category.findAll().then(category => {
                resp.render("admin/articles/edit", {articles: articles, category: category});
            });
        }else{
            resp.redirect("/admin/articles");
        }
    }).catch(err => {
        resp.redirect("/admin/articles");
    });
});

router.get("/articles/page/:num", (req, resp) => {
    const page = req.params.num;
    const limit = 4;
    let offset = 0;

    if(!isNaN(page) || page >= 1){
        offset = (parseInt(page) - 1) * limit;
    }

    articles.findAndCountAll({
        order: [
            ['id', 'DESC']
        ],
        limit: limit,
        offset: offset
    }).then(articles => {

        let next = true;
        if(offset + limit >= articles.count){
            next = false;
        }

        let result = {
            page: parseInt(page), 
            next: next,
            articles: articles
        }

        category.findAll().then(categories => {
            resp.render("admin/articles/page", {result: result, categories: categories});
        });
    })
});

// Method POST

router.post("/articles/save", adminauth, (req, resp) =>{
    const title = req.body.title;
    const body = req.body.body;
    const idCategory = req.body.IDListCategory;

    articles.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: idCategory
    }).then(() => {
        resp.redirect("/admin/articles");
    }).catch(() => {
        resp.redirect("/admin/articles");
    });
});

router.post("/articles/update", adminauth, (req, resp) =>{
    const id = req.body.id;
    const title = req.body.title;
    const body = req.body.body;
    const idCategory = req.body.IDListCategory;

    articles.update({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: idCategory
    }, 
    { 
        where: {
            id: id
        }
    }).then(() => {
        resp.redirect("/admin/articles");
    }).catch(err => {
        resp.redirect("/admin/articles");
    });
});

router.post("/articles/delete", adminauth, (req, resp) => {
    const id = req.body.id;
    if(id != undefined && !isNaN(id)){
        articles.destroy({
            where: {
                id: id
            }
        }).then(() =>{
            resp.redirect("/admin/articles");
        });
    }else{
        resp.redirect("/admin/articles");
    }
});

module.exports = router;