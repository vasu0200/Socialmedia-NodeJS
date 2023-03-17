const bcrypt =require("bcrypt");
const{pool}=require("../dbConfig");
const usersTable="users";
const moment=require("moment");
const CryptoJS = require('crypto-js');

exports.register= async (req) => {

    try {
       

    const{email,username,phone,pass,frist_name,last_name,privacy}=req.body;
    const checkUserQuery=`SELECT * FROM ${usersTable} WHERE email="${email}" OR username="${username}" OR phone=${phone}`;
    const checkUser=await pool.execute(checkUserQuery);
    if(checkUser[0].length){
        const error =new Error("User already registerd");
        return({err:error.message})
    } else {
        const salt=await bcrypt.genSalt();
        const hash=await bcrypt.hash(pass,salt);
        const createdAt=moment().format("YYYY-MM-DD HH:mm:ss");
        const updatedAt=moment().format("YYYY-MM-DD HH:mm:ss");
        const insertUserQuery=`INSERT INTO ${usersTable}(frist_name,last_name,username,email,phone,pass,createdAt,updatedAt,privacy)VALUES("${frist_name}","${last_name}","${username}","${email}",${phone},"${hash}","${createdAt}","${updatedAt}","${privacy}")`;
        const insertUser=await pool.execute(insertUserQuery);
        return insertUser[0];

    }
 
    } catch (error) {
        return ({err:error.message})
    }
}



exports.login=async(req)=>{
    try {
        const{email,username,pass}=req.body;
    const checkUserQuery=`SELECT * FROM ${usersTable} WHERE email=${email} OR username=${username}`;
    const checkUser=await pool.execute(checkUserQuery);
    if(checkUser[0].length){
       const userData=checkUser[0];
       const CheckPass=await bcrypt.compare(pass,userData[0].pass);
       if(CheckPass){
        const token=CryptoJS.AES.encrypt(JSON.stringify({
            userId:userData[0].id,
            email:userData[0].email,
         }),process.env.PASS_SECRET).toString;
          return({
              token,
              userId:userData[0].id,
              email:userData[0].email,
          })
  
      }else{
        const error=new Error("wrong password");
    return({err:error.message})
      }
       }
    else{
    const error=new Error("user not registered");
    return({err:error.message})
    }
 
    } catch (error) {
        return ({err:error.message})
    }
}

exports.update=async(req)=>{
    try {
        const{userId}=req.body;
        const checkUserQuery=`UPDATE ${usersTable}SET frist_name=${first_name},last_name=${last_name},privacy="${privacy}" WHERE id=${req.userId}`;
        const updateUser=await pool.execute(checkUserQuery);
        return updateUser;
    } catch (error) {
        return ({err:error.message}) 
    }
}
exports.get=async(req)=>{
    try {
      const checkUserQuery=`SELECT *FROM ${usersTable} INNER JOIN ON ${postsTable} ON ${postsTable}.creator=${usersTable}.id WHERE id="${req.userId}`;
      const getUser=await pool.execute(checkUserQuery);
      return getUser;
    } catch (error) {
        return ({err:error.message})  
    }
}