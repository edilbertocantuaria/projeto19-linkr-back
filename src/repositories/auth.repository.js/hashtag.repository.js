import { db } from "../../database/database.connection.js"

export async function postHashtagRep1(postId, hashtag) {
    return db.query(`select count(*) from "postHashtags" where "postId"=$1 and 
    "hashtagId"= (select id from hashtags where hashtag=$2);`, [postId, hashtag.trim()])
}

export async function postHashtagRep2(hashtag) {
    return db.query(`select * from hashtags where hashtag=$1;`, [hashtag.trim()])
}
export async function postHashtagRep3(hashtag) {
    await db.query(`insert into hashtags (hashtag) values($1);`, [hashtag.trim()])
}

export async function postHashtagRep4(postId, hashtag) {
    await db.query(`insert into "postHashtags" ("postId","hashtagId") 
            select $1, hashtags.id from hashtags where hashtags.hashtag=$2;`,[postId,hashtag.trim()]) 
}
export async function getAllHashtagsRep() {
    return db.query(`select * from hashtags;`)
}

export async function getSelectedHashtagRep(hashtag) {
    return db.query(`select posts.*,posts.id, hashtags.hashtag from posts join "postHashtags" on
    "postHashtags"."postId"=posts.id join hashtags 
    on hashtags.id="postHashtags"."hashtagId" where hashtags.hashtag=$1;`, [hashtag.trim()])
}