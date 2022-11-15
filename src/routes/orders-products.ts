import express from "express"
import {
    create,
    index,
    show,
    showOrderProducts,
    userCartProducts,
} from "../controller/orders-products"
import verifyAuthToken from "../middlewares/authorization"

const ordersProductsRouter = express.Router()
ordersProductsRouter.get("/", verifyAuthToken, index)

ordersProductsRouter.get("/:orderId", verifyAuthToken, showOrderProducts)

ordersProductsRouter.get(
    "/:orderId/product/:productId",
    verifyAuthToken,
    show //Not working
)

ordersProductsRouter.post("/", verifyAuthToken, create)

ordersProductsRouter.get(
    "/user/:userId/cart",
    verifyAuthToken,
    userCartProducts //Not working
)

export default ordersProductsRouter
