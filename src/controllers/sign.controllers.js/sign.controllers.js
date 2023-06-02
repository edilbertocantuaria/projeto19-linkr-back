import { db } from "../../database/database.connection.js";
import bcrypt from "bcrypt"
import createToken from "../../middlewares/token/create.token.js";


export async function signUp(req, res) {
    const { username, email, password, image} = req.body

    try {
        await db.query('INSERT INTO users (username, email, password, image) VALUES ($1, $2, $3, $4)', [
      username,
      email,
      bcrypt.hashSync(password, 10),
      image,
    ]);
    res.status(201).send({ message: 'Usuário cadastrado!' });

    } catch (err) {
       
        
        res.status( 500 ).send( {message : err.message} );
    }
    
}



export async function login(req, res, next) {
    const { email, password } = req.body;

    try {
        const response = await db.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (response.rowCount === 0) return res.status(401).send('Dados Inválidos, verifique e-mail e senha');

        const { id, password: passwordInDb, image, username} = response.rows[0];

        if (!bcrypt.compareSync(password, passwordInDb)) return res.status(401).send('Dados Inválidos, verifique e-mail e senha');

        req.body.userId = id;

        const token = await createToken(id); // Crie o token usando a função createToken

        return res.json({ token, userId: id, image: image, username: username});
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}
