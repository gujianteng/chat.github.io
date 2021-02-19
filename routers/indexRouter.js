var express = require('express')
var auth = require("../middlewares/auth")
var router = express.Router()


// GET / 欢迎页面
router.get("/", auth, (req, res) => { res.render("welcome") })

// GET /chatroom 聊天室页面
router.get("/chatroom", auth, (req, res) => { res.render("chatroom") })

// GET /posts 帖子列表页面
router.get("/posts", auth, (req, res) => { res.render("post/index") })

// GET /login 登入页面
router.get("/login", (req, res) => {
    res.render("login")
})



module.exports = router