import userModel from '../../../../DB/models/User.model.js'
import {asyncHandler} from '../../../utils/errorHandling.js'
import sendEmail from '../../../utils/email.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export const signUp = asyncHandler(
    async (req, res, next) => {

        const { name, email, password } = req.body


        const checkUser = await userModel.findOne({ email })

        if(checkUser) {
            next(new Error('Email already exists'))
        }

        const hashedPassword = bcrypt.hashSync(password, +process.env.SALT_ROUND)

        const user = await userModel.create({ name, email, password: hashedPassword })

        const token = jwt.sign(
            {id: user._id, email},
            process.env.SIGNUP_SIGNATURE
        )


        sendEmail(
            {
                to: email,
                subject: 'Confirm your email',
                text: 'Click on the link to confirm your email',
                html: `
                    <table style="margin: auto; text-align: center">
                        
                        <tr>
                            <td>
                                <img style="width: 400px; height: 400px; border-radius: 15px;" src = 'https://cdn.dribbble.com/userupload/19739655/file/original-b3b36d550661c7251dd332fa91f8a088.gif' />
                            </td>
                        </tr>
                        
                        <tr>
                            <td>
                                <h1 style = "text-transform: capitalize;">click on the button to confirm your email</h1>
                            </td>
                        </tr>
                        
                        <tr>
                            <td>
                            <a style="text-decoration: none; background: linear-gradient(135deg, #f75959 0%, #f35587 100%); color: white; padding: 10px 30px; font-size: 20px; border-radius: 20px;" href = '${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}'>Confirm Email</a>
                            </td>
                        </tr>
                        

                    </table>

                `
            }
        )

        return next(new Error('User created successfully'))

    }
)



export const confirmEmail = asyncHandler(
    async (req, res, next) => {
        const {token} = req.params
        
        const decoded = jwt.verify(token, process.env.SIGNUP_SIGNATURE)

        if(!decoded){
            return next(new Error('Invalid token'))
        }

        const user = await userModel.findByIdAndUpdate({_id: decoded.id}, {confirmEmail: true}, {new: true})
        
        if(!user){
            return next(new Error('User not found'))
        }

        sendEmail({
            to: user.email,
            subject: 'Email confirmed',
            html: `
                <h1 style = "text-transform: capitalize;">Email confirmed successfully</h1>
                <p style = "text-transform: capitalize; font-size: 30px">Now you can login to your account.</p>
            `
        })

        return res.redirect('http://localhost:3000')
        
    }
)



export const login = asyncHandler(
    async (req, res, next) => {
        const {email, password } = req.body
        
        const user = await userModel.findOne({ email })

        if(!user){
            return next(new Error('User not found'))
        }

        if(!bcrypt.compareSync(password, user.password)){
            return next(new Error('password is not correct'))
        }

        if(!user.confirmEmail){
            return next(new Error('Email is not confirmed'))
        }

        const token = jwt.sign(
            {id: user._id, email},
            process.env.LOGIN_SIGNATURE
        )


        res.json({message: 'Done', token})
        
        
    }
)