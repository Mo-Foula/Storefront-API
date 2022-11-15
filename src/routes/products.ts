import express from "express"
import {
    create,
    index,
    show,
    getProdctsByCategory,
} from "../controller/products"
import verifyAuthToken from "../middlewares/authorization"

const productsRouter = express.Router()
productsRouter.get("/", index)

productsRouter.get("/:id", show)

productsRouter.post("/", verifyAuthToken, create)

productsRouter.get("/category/:category", getProdctsByCategory)

export default productsRouter
