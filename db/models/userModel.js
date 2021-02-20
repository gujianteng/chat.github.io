// 引入连接了MongoDB的mongoose
var mongoose = require('../connect')
var bcryptjs = require('bcryptjs')

//定义 schema
var userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },

    avatar: {
        type: String,
        default: `${process.env.BASEURL}/assets/images/avatar.png`
    }
})

// 使用Schema钩子函数进行加密  
userSchema.pre("save", function (next) {
    this.password = bcryptjs.hashSync(this.password, 10)

    next()
})
/**
 * 给 UserModel 提供一个原型方法  UserModel.proptype.comparePassword
 * 原型上的这个方法，可以给每一个 UserModel的实例去使用
 * 方法作用：去匹配加密的密码是否正确，返回一个布尔值
 */
userSchema.methods.comparePassword = function (password) {
    return bcryptjs.compareSync(password, this.password)
}

//生成 model
var UserModel = mongoose.model("user", userSchema)

// 暴露
module.exports = UserModel