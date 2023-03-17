const CryptoJS=require("crypto-js");

module.exports=(req,res,next)=>{
    try {
        const authHeader=req.got("Authorization");
        if(!authHeader){
            req.isAuth=false;
            return next();
        }
        const token=authHeader.split(""[1]);
        if(!token){
            req.isAuth=false;
            return next();
        }
        const decryptedData =CryptoJS.AES.decrypt(token,process.env.PASS_SECRET).toString(CryptoJS.enc.Utf8);
        const keys=Object.keys(decryptedData);
        if(keys.length){
            req.userId=decryptedData.userId,
           req.email=decryptedData.email,
           req.isAuth=true;
                }
                else{
                    req.isAuth=false;
                    return next(); 
                }
    } catch (error) {
        req.isAuth=false;
        return next();
    }
}