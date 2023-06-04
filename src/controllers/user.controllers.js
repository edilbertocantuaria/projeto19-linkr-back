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