function adminauth(req, resp, next){
    if(req.session.users != undefined){
        next();
    }else{  
        console.log('Request URL:', req.originalUrl);  
        resp.redirect("/login");
    }    
}

module.exports = adminauth;
