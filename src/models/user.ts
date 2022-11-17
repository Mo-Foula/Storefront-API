import Client from '../database'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

export type userModel = {
    id?: number
    username?: string
    firstname: string
    lastname: string
    password: string
}

dotenv.config()

const { BCRYPT_PASSWORD: pepper, SALT_ROUNDS: salt, TOKEN_SECRET } = process.env

function encrypt(password: string): string {
    return bcrypt.hashSync(password + pepper, parseInt(salt ?? ''))
}

async function authenticate(
    username: string,
    password: string
): Promise<userModel | null | undefined> {
    const conn = await Client.connect()
    const sql = 'SELECT password FROM users WHERE username=($1)'

    const result = await conn.query(sql, [username])
    if (result.rows.length) {
        const user = result.rows[0]

        if (bcrypt.compareSync(password + pepper, user.password)) {
            return user
        }
        return undefined
    }

    return null
}

export class User {
    async login(username: string, password: string): Promise<string | null> {
        try {
            const user = await authenticate(username, password)
            if (!user) return null
            const token = jwt.sign({ user: user } as object, TOKEN_SECRET!)
            return token
        } catch (err) {
            throw new Error(`Cannot get users ${err}`)
        }
    }

    async create(newUser: userModel): Promise<string | null> {
        try {
            const { firstname, lastname, username, password } = newUser

            const user = await authenticate(username!, password)
            if (user !== null)
                // Either undefined or user (which means he is already registered)
                return null
            const conn = await Client.connect()
            const hashedPassword = encrypt(password)

            const sql =
                'INSERT INTO users (firstname,lastname,username,password) VALUES($1,$2,$3,$4)  RETURNING *;'

            try {
                await conn.query(sql, [
                    firstname,
                    lastname,
                    username,
                    hashedPassword,
                ])
            } catch (err) {
                return null
            }
            conn.release()
            const token = jwt.sign({ user: username } as object, TOKEN_SECRET!)
            return token
        } catch (err) {
            throw new Error(`Could not create user ${err}`)
        }
    }

    async index(): Promise<userModel[]> {
        try {
            const conn = await Client.connect()
            const sql = 'SELECT * FROM users;'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Cannot get users ${err}`)
        }
    }

    async show(id: number): Promise<userModel | undefined> {
        try {
            const conn = await Client.connect()
            const sql = 'SELECT * FROM users where id = $1 ;'
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Cannot get users ${err}`)
        }
    }

    // async create(newUser: UserModel): Promise<void> {
    //     try {
    //         const conn = await Client.connect()
    //         const {
    //             firstname: firstName,
    //             lastname: lastName,
    //             password
    //         } = newUser

    //         // ENCODE PASSWORD

    //         const sql = 'INSERT INTO users (firstName,lastName,password) VALUES ($1, $2, $3) ;'
    //         await conn.query(sql, [firstName, lastName, password])
    //         conn.release()
    //     } catch (err) {
    //         throw new Error(`Cannot get users ${err}`)
    //     }
    // }
}
