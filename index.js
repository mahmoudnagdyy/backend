import express from 'express';
import bootstrap from './src/index.router.js';
import dotenv from 'dotenv';
dotenv.config()
const app = express();
const port = 5000

app.get('/', (req, res) => {
    return res.send('Hello World!');
})




bootstrap(app, express)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})