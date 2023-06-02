import { db } from "../../database/database.connection.js";

export default async function verifyToken (req, res, next){

    const id = req.body.userId

    try {

        const response = await db.query('SELECT token FROM sessions WHERE \"userId\" = $1', [id])

        if (response.rowCount !== 0) {
            const { token } = response.rows[0]

            return res.send({ token })
        }

    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }

    next()
}