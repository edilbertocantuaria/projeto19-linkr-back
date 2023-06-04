import { db } from "../database/database.connection.js";

export async function getUsers(req, res) {
    try {
        const users = await db.query(`
        SELECT *
        FROM users
        `)
        res.status(200).send(users.rows)
    } catch (err) {
        res.status(500).send("Houve um erro ao pegar os usuários")
    }
}

export async function getUser(req, res) {
    try {
        const { userId } = req.params;

        const result = await db.query(
            `
        SELECT *
        FROM users
        WHERE id = $1
      `,
            [userId]
        );

        const user = result.rows[0];

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        res.status(200).send(user);
    } catch (err) {
        res.status(500).send("Houve um erro ao pegar o usuário");
    }
}