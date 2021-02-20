var express = require('express')
//引入 socket.io
var socketIo = require("socket.io")
//引入 express-session中间件模块
var session = require('express-session')
var indexRouter = require("./routers/indexRouter")
// 引入 express-async-errors
require("express-async-errors");
var userRouter = require("./routers/userRouter")
// 生成 exoerss实例
var app = express()

//处理一下模板引擎相关的设置
app.set("view engine", "ejs")
app.set("views", "./views")

//处理一下中间件
app.use(express.static("./public"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
    //密钥
    secret: "dsgfhdsfhgdf",
    //是否每次有请求的时候都去更新有效时间
    resave: false,
    //是否初始化时就设置一次
    saveUninitialized: true
}))

// 处理路由中间件
app.use("/", indexRouter)
app.use("/users", userRouter)

//统一处理错误，需要放在中间件与路由代码之后
app.use((err, req, res, next) => {
    console.log(err);
    //响应给前端
    res.status(500).send(err.message)
})

// 监听端口，启动服务
var server = app.listen(3000, () => {
    console.log("服务启动成功");
})

// 通过 socketIo.listen 去与当前服务关联上

var io = socketIo.listen(server)

// 建立io的conneckion事件去处理客户端连接
io.on("connection", socket => {

    // 提供一个事件将做setName,共客户端设置名字
    // 客户端连接到服务器之后，第一个要做的事情就是调用（触发） setName这个事件
    socket.on("setName", username => {
        // 给当前soket添加一个名字，值就是传递过来的username
        socket.username = username

        //给其他人发送一个系统消息，xxx加入聊天室
        socket.broadcast.emit("message", {
            // username 代表谁说的 
            username: "System",
            //message 代表说的内容
            message: `欢迎${socket.username}加入聊天室`
        })
    })


    // 监听 gu 事件，这个事件有客户端触发
      socket.on("gu", data => {
        // data {  message: value }

        // 转给当前客户端
        socket.emit("message", {
          username: socket.username,
          message: data.message
        });

        // 转发给其它客户端
        socket.broadcast.emit("message", {
          username: socket.username,
          message: data.message
        });
      });

})