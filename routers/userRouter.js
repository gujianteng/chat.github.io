var express = require("express")
var UserModel = require('../db/models/userModel')
var router = express.Router()


// POST /user/login 登入操作
router.post('/login', async (req, res) => {
    // res.send('登入操作')
    //req.body 就是通过前端form表单传递过来的数据
    // console.log(req.body);
    var { username, password } = req.body
    var user = await UserModel.findOne({ username })
    if (!user) {
        //不存在，就去注册并登入，登入之前把前端传递过来的password加密,在Schema钩子函数里面加密
        user = await UserModel.create({ username, password })
    }

    //校验密码是否正确
    if (user.comparePassword(password)) {

        //给 req.session上添加一个auth属性
        req.session.auth={
            userId:user._id,
            username:user.username
        }
        // 通过，可以登入
        var redirect=req.session.redirect||'/'
        res.redirect(redirect) 
    } else {
        //不通过，用户名或密码不正确,把错误信息暴露出去，server.js统一处理了错误信息
        throw new Error("用户名或密码不正确")
    }

})

module.exports = router 