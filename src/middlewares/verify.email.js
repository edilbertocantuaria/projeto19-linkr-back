import { db } from "../database/database.connection.js";


export default async function verifyEmail(req, res, next){
  

    const { email } = req.body

    try {
        const { rowCount } = await db.query("SELECT * FROM users WHERE email = $1", [email])

        if(rowCount !== 0) return res.status( 409 ).send( {message: "e-mail inválido"} );
        
    } catch (err) {
        console.log("Erro ao verificar o e-mail:", err);
        return res.sendStatus(500)
    }
    next()
}