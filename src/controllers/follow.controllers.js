import urlMetadata from "url-metadata";
import { db } from "../database/database.connection.js";

export async function userFollow(req, res) {
    const { followedId } = req.params;

    const { followerId } = req.body;

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

        res.sendStatus(202)
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "It wasn't possible to execute the operation" });
    }
}

export async function getFollowersAndUsers(req, res) {
    const { followerId } = req.params;

    try {

        const users = await db.query(`
            SELECT * 
            FROM users
        `)


        const followers = await db.query(`
            SELECT users.*, followers."followerId", followers."followedId" 
            FROM users JOIN followers ON users.id = followers."followerId"
            WHERE users.id = $1
        `,[followerId]);

        res.status(200).send({users: users.rows, followers: followers.rows});
    } catch (err) {
        res.status(500).send("There was an error getting the user");
    }
}

export async function getFollowedPosts(req, res) {
    const { followerId } = req.params;
    const { page = 1, pageSize = 10 } = req.query;
    const offset = (page - 1) * pageSize;
  

    try {
        const posts = await db.query(
            `
            SELECT id, link, article, "userId", "createdAt"
            FROM (
              SELECT p.id, p.link, p.article, p."userId", p."createdAt"
              FROM posts p
              INNER JOIN followers f ON p."userId" = f."followedId"
              WHERE f."followerId" = $1
            
              UNION
            
              SELECT p.id, p.link, p.article, p."userId", p."createdAt"
              FROM posts p
              WHERE p."userId" = $1
            ) AS combinedPosts
            ORDER BY "createdAt" DESC
            LIMIT $2
            OFFSET $3;
            `,
            [followerId, pageSize, offset]
          );

      const postsList = posts.rows;

      if (postsList.length === 0) {
          return res.status(200).send([]);
      }


      const processedPosts = await Promise.all(
        postsList.map(async (post) => {
            try {
                const metadata = await urlMetadata(post.link);
                return {
                    id: post.id,
                    link: post.link,
                    title: metadata.title,
                    description: metadata.description,
                    image: metadata.image,
                    article: post.article,
                    createdAt: post.createdAt,
                    userId: post.userId,
                };
            } catch (error) {
                console.error(`Error fetching metadata for post with ID ${post.id}:`, error);

                return {
                    id: post.id,
                    link: post.link,
                    title: null,
                    description: null,
                    image: null,
                    article: post.article,
                    createdAt: post.createdAt,
                    userId: post.userId,
                };
            }
        })
    );
      res.status(200).send(processedPosts);
    } catch (error) {
      res.status(500).send(error);
    }
  }