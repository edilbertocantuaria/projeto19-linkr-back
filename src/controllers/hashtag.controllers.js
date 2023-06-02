import { db } from "../database/database.connection.js";

export async function postHashtag(req, res) {
    const {postId,hashtag}=req.body
    try {
        const existe=await db.query(`select * from hashtags where hashtag=$1;`,[hashtag])
        if(existe.rowCount==0){
            await db.query(`insert into hashtags (hashtag) values($1);`,[hashtag])
            await db.query(`insert into "postHashtags" ("postId","hashtagId") 
            select $1, hashtags.id from hashtags where hashtags.hashtag=$2;`,[postId,hashtag])    
        }else{
            return res.sendStatus(400)
        }
        res.sendStatus(200)
    } catch (err) {
        res.status(500).send("Houve um erro ao salvar a hashtag no banco")
    }
}

export async function getAllHashtags(req, res) {
    try {
        const result = await db.query(`select * from hashtags;`)
        res.status(200).send(result.rows)
    } catch (err) {
        console.error(err);
        res.status(500).send("Houve um erro ao pegar as hashtags do banco")
    }
}
export async function getSelectedHashtag(req, res) {
    const { hashtag } = req.params
    try {
        const result = await db.query(`select posts.*,posts.id, hashtags.hashtag from posts join "postHashtags" on
        "postHashtags"."postId"=posts.id join hashtags 
        on hashtags.id="postHashtags"."hashtagId" where hashtags.hashtag=$1;`, [hashtag])
        res.status(200).send(result.rows)

    } catch (err) {
        console.error(err);
        res.status(500).send("Houve um erro ao pegar a hashtag informada no banco")
    }
}