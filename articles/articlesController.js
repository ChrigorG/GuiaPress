const express = require("express");
const router = express.Router();

router.get("/articles", (req, resp) => {
    resp.send("Articles");
});

module.exports = router;