import { db } from "../../database/database.connection.js"


export async function validateToken(req, res, next) {

    let token = req.headers.authorization

    if(!token) return res.sendStatus(401)

    token = token.replace("Bearer ", "")

    try {

        const response = await db.query("SELECT * FROM sessions WHERE token = $1", [token])

        if(response.rowCount === 0) return res.sendStatus(401)

        req.userId = response.rows[0].userId

    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }

    next()
}