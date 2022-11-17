import { Request, Response } from 'express'
import { Order, orderModel } from '../models/order'

const order = new Order()

const index = async (_req: Request, res: Response): Promise<void> => {
    try {
        res.json(await order.index())
    } catch (err) {
        res.status(400).send(`Error: ${err}`)
    }
}

const show = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id as unknown as number
        const result = await order.show(id)
        if (!result) res.status(404).send('Order not found')
        res.json(result)
    } catch (err) {
        res.status(400).send(`Error: ${err}`)
    }
}

const create = async (req: Request, res: Response): Promise<void> => {
    try {
        res.json(await order.create(req.body as orderModel))
    } catch (err) {
        res.status(400).send(`Error: ${err}`)
    }
}

const userCompletedOrders = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const userId = req.params.userId as unknown as number
        res.json(await order.userOrdersWithCertainStatus(userId, 'completed'))
    } catch (err) {
        res.status(400).send(`Error: ${err}`)
    }
}

const userCompleteOrder = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const userId = req.params.userId as unknown as number

        const result = await order.completeOrder(userId)
        if (!result) res.status(404).send('User has no cart')
        res.json(result)
    } catch (err) {
        res.status(400).send(`Error: ${err}`)
    }
}

const userCart = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.params.userId as unknown as number
        const result = await order.userOrdersWithCertainStatus(
            userId,
            'ongoing'
        )
        if (!result) res.status(404).send('User has no cart')
        res.json(result)
    } catch (err) {
        res.status(400).send(`Error: ${err}`)
    }
}

export { index, show, create, userCart, userCompletedOrders, userCompleteOrder }
