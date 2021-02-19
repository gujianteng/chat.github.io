var express=require('express')
var indexRouter = require("./routers/indexRouter")
// 生成 exoerss实例
var app = express()

//处理一下模板引擎相关的设置
app.set("view engine","ejs")
app.set("views","./views")

//处理一下中间件
app.use(express.static("./public"))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// 处理路由中间件
app.use("/",indexRouter)

//统一处理错误，需要放在中间件与路由代码之后
app.use((err,req,res,next)=>{
    console.log(err);
    //响应给前端
    res.status(500).send(err.massage)
})

// 监听端口，启动服务
var server = app.listen(3000,()=>{
    console.log("服务启动成功");
})