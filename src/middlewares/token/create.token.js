import { v4 as uuidV4 } from "uuid"

import { db } from "../../database/database.connection.js"

export default async function createToken(userId) {
    const token = uuidV4();

    try {
        await db.query(
            "INSERT INTO sessions (token, \"userId\") VALUES ($1, $2)",
            [token, userId]
        );

        return token;
    } catch (err) {
        console.log(err);
        throw err;
    }
}