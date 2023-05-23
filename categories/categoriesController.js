const express = require("express");
const router = express.Router();
const category = require("./Category");
const slogify = require("slugify");
const adminauth = require("../middlewares/adminauth");

// Method GET

router.get("/admin/categories/new", adminauth, (req, resp) => {
    resp.render("admin/categories/new");
});

router.get("/admin/categories", adminauth, (req, resp) => {
    category.findAll().then(categories => {
        resp.render("admin/categories/categories", {categories: categories});
    });
});

router.post("/categories/delete", adminauth, (req, resp) => {
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

router.get("/admin/categories/edit/:id", adminauth, (req, resp) => {
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

router.post("/categories/save", adminauth, (req, resp) => {
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

router.post("/categories/update", adminauth, (req, resp) => {
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