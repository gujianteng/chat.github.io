module.exports=(req,res,next)=>{
    // 判断是否登入了
    if(req.session.auth){
        req.auth=req.session.suth
        next()
    }else{
        res.redirect("/login")
    }
}