const express = require("express");
const router = express.Router();
const category = require("./Category");
const slogify = require("slugify");

// Method GET

router.get("/admin/categories/new", (req, resp) => {
    resp.render("admin/categories/new");
});

router.get("/admin/categories", (req, resp) => {
    category.findAll().then(categories => {
        resp.render("admin/categories/categories", {categories: categories});
    });
});

router.post("/categories/delete", (req, resp) => {
    const id = req.body.id;
    if(id != undefined && !isNaN(id)){
        category.destroy({
            where: {
                id: id
            }
        }).then(() =>{
            resp.redirect("/admin/categories");
        });
    }else{
        resp.redirect("/admin/categories");
    }
});

router.get("/admin/categories/edit/:id", (req, resp) => {
    const id = req.params.id;
    category.findByPk(id).then(category => {
        if(category != undefined){
            resp.render("admin/categories/edit", {category: category});
        }else{
            resp.redirect("/admin/categories");
        }
    }).catch(erro => {
        resp.redirect("/admin/categories");
    });
});

// Method POST

router.post("/categories/save", (req, resp) => {
    const title = req.body.title;
    if(title != undefined){
        category.create({
            title: title,
            slug: slogify(title)
        }).then(() => {
            resp.redirect("/admin/categories");
        });
    }else{
        resp.redirect("/admin/categories/new");
    }
});

router.post("/categories/update", (req, resp) => {
    const id = req.body.id;
    const title = req.body.title;

    category.update({
        title: title, 
        slug: slogify(title)
    },
    {
        where: {
            id: id
        }
    }).then(() => {
        resp.redirect("/admin/categories");
    });
});

module.exports = router;