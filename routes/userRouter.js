const{Router}=require("express");
const { likePost } = require("../controllers/postController");
const { register,update,login,get } = require("../controllers/userController");
const userRouter=new Router();

userRouter.post("/register",async (req,res)=>{
     try {
        const response=await register(req);
        res.send(response);
        res.end();
     } catch (error) {
       return({err:error.message}) 
     }
})
userRouter.post("/login",async (req,res)=>{
    try {
       const response=await login(req);
       res.send(response);
       res.end();
    } catch (error) {
      return({err:error.message}) 
    }
})
userRouter.post("/update",async (req,res)=>{
    try {
       const response=await update(req);
       res.send(response);
       res.end();
    } catch (error) {
      return({err:error.message}) 
    }
})
userRouter.get("/get",async (req,res)=>{
    try {
       const response=await get(req);
       res.send(response);
       res.end();
    } catch (error) {
      return({err:error.message}) 
    }
})

module.exports=userRouter;