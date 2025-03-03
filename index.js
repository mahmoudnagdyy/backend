import express from 'express';
import bootstrap from './src/index.router.js';
import dotenv from 'dotenv';
import cors from 'cors'
dotenv.config()
const app = express();

app.use(cors({
    origin: 'https://login-signup-orcin.vercel.app', // Replace this with your frontend URL
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
  }));


  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://login-signup-orcin.vercel.app'); // Replace this with your frontend URL
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    }
  });


app.get('/', (req, res) => {
    return res.send('Hello World!');
})




bootstrap(app, express)


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})