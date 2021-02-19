var express=require('express')
//引入 express-session中间件模块

var session=require('express-session')
var indexRouter = require("./routers/indexRouter")
// 引入 express-async-errors
require("express-async-errors");
var userRouter = require("./routers/userRouter")
// 生成 exoerss实例
var app = express()

//处理一下模板引擎相关的设置
app.set("view engine","ejs")
app.set("views","./views")

//处理一下中间件
app.use(express.static("./public"))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(session({
    //密钥
    secret:"dsgfhdsfhgdf",
    //是否每次有请求的时候都去更新有效时间
    resave:false,
    //是否初始化时就设置一次
    saveUninitialized:true
}))

// 处理路由中间件
app.use("/",indexRouter)
app.use("/users",userRouter)

//统一处理错误，需要放在中间件与路由代码之后
app.use((err,req,res,next)=>{
    console.log(err);
    //响应给前端
    res.status(500).send(err.message)
})

// 监听端口，启动服务
var server = app.listen(3000,()=>{
    console.log("服务启动成功");
}) 