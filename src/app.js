import express from 'express';
import cors from 'cors';
import chalk from 'chalk';
import router from './routes/index.routes.js';


const app = express();

app.use(cors())
app.use(express.json());
app.use(router);

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(chalk.green(`Rodando em http://localhost:${port}`));
});