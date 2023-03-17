const {Router}=require("express");
const{createPost,getPost,deletePost,updatePost, likePost,dislikePost}=require("../controllers/postController");
const postRouter=new Router();

postRouter.post("/add",async(req,res)=>{
    try {
        if(req.isAuth){
            const response=await createPost(req);
        res.send(response);
        res.end();
        }
        else{
            res.send({err:"unauthorized user"})
        }
     } catch (error) {
       return({err:error.message}) 
     }
})
postRouter.post("/delete",async(req,res)=>{
    try {
        if(req.isAuth){
            const response=await deletePost(req);
        res.send(response);
        res.end();
        }
        else{
            res.send({err:"unauthorized user"})
        }
     } catch (error) {
       return({err:error.message}) 
     }
})
postRouter.get("/get",async(req,res)=>{
    try {
        if(req.isAuth){
            const response=await getPost(req);
        res.send(response);
        res.end();
        }
        else{
            res.send({err:"unauthorized user"})
        }
     } catch (error) {
       return({err:error.message}) 
     }
})
postRouter.post("/update",async(req,res)=>{
    try {
        if(req.isAuth){
            const response=await updatePost(req);
        res.send(response);
        res.end();
        }
        else{
            res.send({err:"unauthorized user"})
        }
     } catch (error) {
       return({err:error.message}) 
     }
    })
     postRouter.post("/like",async(req,res)=>{
        try {
            if(req.isAuth){
                const response=await likePost(req);
            res.send(response);
            res.end();
            }
            else{
                res.send({err:"unauthorized user"})
            }
         } catch (error) {
           return({err:error.message}) 
         }
        })
        postRouter.post("/dislike",async(req,res)=>{
            try {
                if(req.isAuth){
                    const response=await dislikePost(req);
                res.send(response);
                res.end();
                }
                else{
                    res.send({err:"unauthorized user"})
                }
             } catch (error) {
               return({err:error.message}) 
             }
            })
