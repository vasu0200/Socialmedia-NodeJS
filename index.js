const express= require("express");
const cors=require("cors");
require("dotenv").config();
const PORT=process.env.PORT ||9000;
const mysql=require("mysql2");
const userRouter=require("./routes/userRouter");
const auth=require("./middlewares/auth")


const{json,urlencoded}=require("express");
const app=express()



app.use(cors());
app.use(json());
app.use(auth);
app.use(urlencoded({extended:false}));
app.use("/users",userRouter)
app.get("/",(req,res)=>{
   
})
app.listen(PORT,()=>console.log("server is running...."));