import { db } from "../database/database.connection.js";

export async function postLike(req, res) {
    const { userId, postId } = req.body;
  
    try {
      if (!userId || !postId) {
        console.log('userId ou postId ausentes');
        res.sendStatus(500);
        return;
      }
  
      console.log('userId:', userId);
      console.log('postId:', postId);
  
      const existingLike = await db.query(
        `SELECT * 
        FROM likes
        WHERE "userId" = $1 AND "postId" = $2`,
        [userId, postId]
      );
  
      console.log('existingLike:', existingLike);
  
      if (existingLike.length > 0) {
        res.sendStatus(200).send(true);
      } else {
        await db.query(
          `INSERT INTO likes ("userId", "postId")
          VALUES ($1, $2)`,
          [userId, postId]
        );
        res.sendStatus(200).send(false);
      }
    } catch (error) {
      console.error('Erro:', error);
      res.sendStatus(500).send(error);
    }
  }

  
  export async function toggleLikesPosts(req, res) {
    const { userId, postId } = req.body;

    const {user_id}  = req.locals;
 

    try {
        let user = await selectUserById(user_id)
        let post = await selectPostById(post_id)

        if (user.rows.length === 0 || post.rows.length === 0)
            return res.sendStatus(400);

        if (user_id != userId) return res.sendStatus(401);

        let likes_posts = await selectPostsLikes(user_id, post_id)

        if (likes_posts.rows.length > 0) removeLikeFromPost(user_id, post_id)
        else addLikeToPost(user_id, post_id)

        res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error);
    }

  }