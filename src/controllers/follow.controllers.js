import { db } from "../database/database.connection.js";

export async function userFollow(req, res) {
    const { followedId } = req.params;

    const { followerId } = req.body;
    console.log(followedId)
    console.log(followerId)

    try {
        await db.query(`
        INSERT INTO followers
        ("followerId", "followedId")
        VALUES ($1, $2)
        `, [followerId, followedId])

        res.sendStatus(200)
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "It wasn't possible to execute the operation" });
    }
}

export async function userUnfollow(req, res) {
    const { followedId } = req.params;

    const { followerId } = req.body;
    console.log(followedId)
    console.log(followerId)
    try {
        const follow = await db.query(`
        DELETE FROM followers
        WHERE "followerId" = $1 AND "followedId" = $2
        `, [followerId, followedId])

        // if (follow.rowCount === 0) {
        //     return res.sendStatus(409)
        // }

        res.sendStatus(202)
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "It wasn't possible to execute the operation" });
    }
}

export async function getFollowsUser(req, res) {
    const { followerId  } = req.params


    try {
        const follows = await db.query(
            `
        SELECT "followerId", "followedId" 
        FROM followers 
        WHERE "followerId"= $1;
    `, [followerId ])

    res.status(200).send(follows.rows)

    } catch (error) {
        res.status(500).send(error);

    }

}


export async function getFollowedPosts(req, res) {
    const { followerId } = req.params;
  

    try {
        console.log(followerId)
      const posts = await db.query(
        `
        SELECT p.id, p.link, p.article, p."userId"
        FROM posts p
        INNER JOIN followers f ON p."userId" = f."followedId"
        WHERE f."followerId" = $1;
      `,
        [followerId]
      );
  
      res.status(200).send(posts.rows);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  