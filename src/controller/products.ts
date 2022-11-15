import { Request, Response } from "express"
import { Product, productModel } from "../models/product"

const product = new Product()

const index = async (_req: Request, res: Response): Promise<void> => {
    try {
        res.json(await product.index())
    } catch (err) {
        res.status(400).send(`Error: ${err}`)
    }
}

const show = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id as unknown as number
        const result = await product.show(id)
        if (result === undefined) res.send("Product not found")
        res.json(result)
    } catch (err) {
        res.status(400).send(`Error: ${err}`)
    }
}

const create = async (req: Request, res: Response): Promise<void> => {
    try {
        res.json(await product.create(req.body as productModel))
    } catch (err) {
        res.status(400).send(`Error: ${err}`)
    }
}

const getProdctsByCategory = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const category = req.params.category
        res.json(await product.getProdctsByCategory(category))
    } catch (err) {
        res.status(400).send(`Error: ${err}`)
    }
}

export { index, show, create, getProdctsByCategory }
