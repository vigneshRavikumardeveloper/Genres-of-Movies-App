module.exports=(req,res,next)=>{

    if(!req.user.isadmin) return res.status(403).send('Access denied he/she is not admin');

    next();

}