module.exports=(req,res,next)=>{
    // 判断是否登入了
    if(req.session.auth){
        req.auth=req.session.suth
        next()
    }else{

        // 没登入 
        // 将当前的url 地址给存早session里面
        console.log(req.url);
        req.session.redirect=req.url
        res.redirect("/login")
    }
}