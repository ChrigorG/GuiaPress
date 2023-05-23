const express = require("express");
const router = express.Router();
const user = require("./user");
const bcrypt = require("bcryptjs");

router.get("/admin/users", (req, resp) => {
    user.findAll().then(users => {
        resp.render("admin/users/users", {users: users});
    }).catch(err => {
        resp.redirect("/");
    }); 
});

router.get("/admin/users/new", (req, resp) => {
    resp.render("admin/users/new");
});

router.get("/login", (req, resp) => {
    resp.render("admin/users/login");
});

//POST

router.post("/users/create", (req, resp) => {
    const login = req.body.login;
    let password = req.body.password;

    user.findOne({
        where: {
            login: login
        }
    }).then(users => {
        if(users != undefined){
            resp.redirect("/admin/users/new");
        }else{
            const salt = bcrypt.genSaltSync(9);
            password = bcrypt.hashSync(password, salt);
            
            user.create({
                login: login,
                password: password
            }).then(() => {
                resp.redirect("/admin/users");
            }).catch(() => {
                resp.redirect("/");
            });
        }
    });
});

router.post("/authenticate", (req, resp) => {
    const login = req.body.login;
    const password = req.body.password;

    user.findOne({
        where: {
            login: login
        }
    }).then(users => {
        if(users == undefined){
            resp.redirect("/login");
        }else{
            const correct = bcrypt.compareSync(password, users.password);
            if(correct){
                req.session.users = {
                    id: users.id,
                    login: users.login
                }
                resp.redirect("/admin/articles");
            }else{
                resp.redirect("/login"); 
            }
        }
    });
});


router.post("/logout", (req, resp) => {
    req.session.users = undefined;
    resp.redirect("/");
});

module.exports = router;