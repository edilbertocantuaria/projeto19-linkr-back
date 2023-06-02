import { db } from "../../database/database.connection.js";


export async function createUser(user){
    if(!user)return
    await db.query(`
        INSERT INTO users (username, password, email, image)
        VALUES ($1, $2, $3, $4)
    `, [user.username, user.password, user.email, user.image]);
}


export async function getUserFromEmail(email){

    if (!email) return
    return await db.query(`
        SELECT * 
        FROM users 
        WHERE email = $1
    `, [email]);
}
