import { db } from "../database/database.connection.js";

export async function getUsers(req, res) {
    try {
        const users = await db.query(`
        SELECT *
        FROM users
        `)
        res.status(200).send(users.rows)
    } catch (err) {
        res.status(500).send("There was an error getting users")
    }
}

export async function getUser(req, res) {
    const { userId } = req.params;

    try {

        const user = await db.query(`
            SELECT * 
            FROM users
            WHERE id = $1
        `, [userId])


        const followers = await db.query(
            `
            SELECT users.*, followers."followerId", followers."followedId" 
            FROM users JOIN followers ON users.id = followers."followedId"
            WHERE users.id = $1;
      `,
            [userId]
        );

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        res.status(200).send({user: user.rows[0], followers: followers});
    } catch (err) {
        res.status(500).send("There was an error getting the user");
    }
}