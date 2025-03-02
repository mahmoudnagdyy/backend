import cors from 'cors'
import authRouter from './modules/auth/auth.router.js'
import userRouter from './modules/user/user.router.js'
import connectDB from '../DB/connection.js'
import { globalErrorHandler } from './utils/errorHandling.js'



const bootstrap = (app, express) => {

    connectDB()
    app.use(express.json())
    app.use(cors(
        {
            origin: 'https://login-signup-orcin.vercel.app/',
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],

        }
    ))
    app.use('https://login-signup-orcin.vercel.app/auth', authRouter)
    // app.use('/user', userRouter)
    app.use('*', (req, res, next) => {
        return res.send({message: 'Endpoint not found!'})
    })
    app.use(globalErrorHandler)
    
}



export default bootstrap;