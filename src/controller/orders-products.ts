import { Request, Response } from 'express'
import { OrderProduct, orderProductModel } from '../models/order-product'

const orderProduct = new OrderProduct()

const index = async (_req: Request, res: Response): Promise<void> => {
    try {
        res.json(await orderProduct.index())
    } catch (err) {
        res.status(400).send(`Error: ${err}`)
    }
}

const show = async (req: Request, res: Response): Promise<void> => {
    try {
        const order_id = req.params.orderId as unknown as number
        const product_id = req.params.productId as unknown as number
        const result = await orderProduct.show({ order_id, product_id })
        if (!result) {
            res.status(404).send('Order does not have this product')
            return
        }
        res.json(result)
    } catch (err) {
        res.status(400).send(`Error: ${err}`)
    }
}

const showOrderProducts = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const order_id = req.params.orderId as unknown as number
        const result = await orderProduct.showOrderProducts(order_id)
        if (!result || result.length === 0) {
            res.status(404).send('Order does not have any products')
            return
        }
        res.json(result)
    } catch (err) {
        res.status(400).send(`Error: ${err}`)
    }
}

const create = async (req: Request, res: Response): Promise<void> => {
    try {
        res.json(await orderProduct.create(req.body as orderProductModel))
    } catch (err) {
        res.status(400).send(`Error: ${err}`)
    }
}

const userCartProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.params.userId as unknown as number
        const result = await orderProduct.showUserCartProducts(userId)
        if (!result) {
            res.status(404).send('User has no cart')
            return
        }
        if (result.length === 0) {
            res.status(404).send('Cart has no products')
            return
        }
        res.json(result)
    } catch (err) {
        res.status(400).send(`Error: ${err}`)
    }
}

export { index, show, create, userCartProducts, showOrderProducts }
