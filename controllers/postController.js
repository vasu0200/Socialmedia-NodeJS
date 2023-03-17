const{pool}=require("../dbConfig");
const postsTable="posts";
const moment=require("moment")

exports.createPost=async(req)=>{
    try {
        
        const{title,content,hash_tags,tagged_users,media}=req.body;
        const createdAt=moment().format('YYYY-MM-DD HH:mm:ss');
        const updatedAt=moment().format('YYYY-MM-DD HH:mm:ss');
        const createPostQuery=`INSERT INTO${postsTable}(title,content,hash_tags,tagged_users,media)VALUES ("${title}","${content}",${hash_tags},${tagged_users},${media},"${createdAt}","${updatedAt}",${req.userId})`
        const createPostData=await pool.execute(createPostQuery);
        return createPostData[0];
    } catch (error) {
        return({err:error.messsage});
    }
}
exports.getPosts=async()=>{
    try {
        const getPostsQuery=`SELECT * FROM ${postsTable}`;
        const getPostsData=await pool.execute(getPostsQuery);
        return getPostsData[0];
    } catch (error) {
        return({err:error.messsage});
    }
}
exports.update=async(req)=>{
    try {
        const{userId}=req.body;
        const checkPostQuery=`UPDATE ${postsTable}SET  WHERE id=${req.userId}`;
        const updatePost=await pool.execute(checkPostQuery);
        return updatePost;
    } catch (error) {
        return ({err:error.message}) 
    }
}

exports.delete=async(req)=>{
    try {
        const{userId}=req.body;
        const checkPostQuery=`DELETE FROM ${postsTable} WHERE id=${req.userId}`;
    } catch (error) {
        return({err:error.mesage})
    }
}

exports.likePost=async(req)=>{
    try {
        const {postId}=req.params;
        const likesArr=req.body;
        likesArr.push(req.userId);
        const likePostQuery=`UPDATE ${postsTable} SET likes=${likesArr} WHERE id=${postId} `
        const likePostData=await pool.execute(likePostQuery);
        return likePostData[0];
    } catch (error) {
      return({err:error.message});  
    }
}

exports.dislikePost=async(req)=>{
    try {
        const {postId}=req.params;
        const likesArr=req.body;
        const dislikesArr=likesArr.filter(e=>e!=req.userId);
        const dislikePostQuery=`UPDATE ${postsTable} SET likes=${dislikesArr} WHERE id=${postId} `
        const dislikePostData=await pool.execute(dislikePostQuery);
        return dislikePostData[0];
    } catch (error) {
      return({err:error.message});  
    }
}