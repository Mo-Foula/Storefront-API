import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { Request, Response } from 'express'

dotenv.config()

const { TOKEN_SECRET } = process.env

const verifyAuthToken = (req: Request, res: Response, next: VoidFunction) => {
    try {
        const authorizationHeader = req.headers.authorization
        jwt.verify(authorizationHeader!, TOKEN_SECRET!)
        next()
    } catch (error) {
        res.status(401).send('Unauthorized user')
    }
}

export default verifyAuthToken
