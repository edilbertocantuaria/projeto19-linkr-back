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
        return res.status(500).send({message: "It wasn't possible to execute the operation"});
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
        return res.status(500).send({message: "It wasn't possible to execute the operation"});
    }
}

export async function getFollowersAndUsers(req, res) {
    const { userId } = req.params;

    try {

        const users = await db.query(`
            SELECT * 
            FROM users
        `)


        const followers = await db.query(`
            SELECT users.*, followers."followerId", followers."followedId" 
            FROM users JOIN followers ON users.id = followers."followerId"
            WHERE users.id = $1
        `,[userId]);

        res.status(200).send({users: users.rows, followers: followers.rows});
    } catch (err) {
        res.status(500).send("There was an error getting the user");
    }
}