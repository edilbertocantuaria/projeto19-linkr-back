import { db } from "../database/database.connection.js";
import urlMetadata from "url-metadata";

export async function publishLink(req, res) {
    try {
        const { link, article, userId } = req.body;

        const post = await db.query(`
        INSERT INTO posts
        (link, article, "userId")
        VALUES ($1, $2, $3);
        `, [link, article, userId])

        res.status(201).send("Publicação realizada com sucesso")
    } catch (err) {
        console.error(err);
        res.status(500).send("Houve um erro ao publicar seu link")
    }
}

export async function getPosts(req, res) {
    try {
        const result = await db.query(`
        SELECT * FROM posts
        ORDER BY "createdAt" DESC
        LIMIT 20;
      `);

        const posts = result.rows;

        if (posts.length === 0) {
            return res.status(200).send({ message: 'There are no posts yet' });
        }

        const processedPosts = await Promise.all(
            posts.map(async (post) => {
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
        console.error(error);
        res
            .status(500)
            .send({ message: 'An error occurred while trying to fetch the posts, please refresh the page' });
    }
}

export async function getUserPosts(req, res) {
    const { id } = req.params;

    try {
        const result = await db.query(`
        SELECT * 
        FROM posts
        WHERE "userId" = $1
        ORDER BY "createdAt" DESC
        LIMIT 20;
        `, [id]);

        const posts = result.rows;

        if (posts.length === 0) {
            return res.status(200).send({ message: 'There are no posts yet' });
        }

        const processedPosts = await Promise.all(
            posts.map(async (post) => {
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
        console.log(error);
        res
            .status(500)
            .send({ message: 'An error occurred while trying to fetch the posts, please refresh the page' });
    }
}


export async function editPost(req, res) {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.sendStatus(400);

    try {
        const post = await db.query("SELECT * FROM posts WHERE id=$1 ", [id]);
        if (post.rows.length === 0) return res.status(404).send("Post não encontrado");

        await db.query(`UPDATE posts 
        SET link=$1, article=$2 
        WHERE id=$3 `, [link, article, id]);

        res.status(200).send("Edição realizada com sucesso")
    } catch (err) {
        res.status(500).send(err.message);
    }

}

export async function deletePost(req, res) {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.sendStatus(400);

    try {
        const post = await db.query("SELECT * FROM posts WHERE id=$1 ", [id]);
        if (post.rows.length === 0) return res.status(404).send("Post não encontrado");

        await db.query(`DELETE FROM posts WHERE id=$1 `, [id]);

        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err.message);
    }

}
