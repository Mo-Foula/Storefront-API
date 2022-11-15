import { Request, Response } from "express"
import { User, userModel } from "../models/user"

const user = new User()

const index = async (_req: Request, res: Response): Promise<void> => {
    try {
        res.json(await user.index())
    } catch (err) {
        throw new Error(`Error: ${err}`)
    }
}

const show = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id as unknown as number
        res.json(await user.show(id))
    } catch (err) {
        throw new Error(`Error: ${err}`)
    }
}

const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = await user.create(req.body as userModel)
        if (!token) {
            res.status(400).send("Username already exists")
            return
        }
        res.json(token)
    } catch (err) {
        res.send(`Error: ${err}`)
    }
}

const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = await user.login(req.body.username, req.body.password)
        if (!token) {
            res.status(404).send("Account not found")
            return
        }
        res.json(token)
    } catch (err) {
        throw new Error(`Error: ${err}`)
    }
}

export { index, show, create, login }
