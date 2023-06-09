import { db } from "../database/database.connection.js"

export async function postComment(req,res){
    const {postId}=req.params
    const {comment,img,username,userId}=req.body
    try {
        const result=await db.query(`insert into comments ("postId",comments,img,username,"userId") values($1,$2,$3,$4,$5);`,[postId,comment,img,username,userId])
        res.sendStatus(200)
    } catch (err) {
        res.status(500).send("Houve um erro ao enviar o comentario para o banco")
    }
}

export async function getCommentsFromPost(req,res){
    const {postId}=req.params
    try {
        const result=await db.query(`select * from comments where "postId"=$1;`,[postId])
        
        res.status(200).send(result.rows)
    } catch (err) {
        res.status(500).send("Houve um erro ao pegar os comentarios do banco")
    }
}