import express from "express"
import usersRouter from "./users"
import ordersRouter from "./orders"
import productsRouter from "./products"
import ordersProductsRouter from "./orders-products"
import verifyAuthToken from "../middlewares/authorization"

export default (app: express.Application) => {
    app.use("/api/users", usersRouter)
    app.use("/api/products", productsRouter)
    app.use("/api/orders", verifyAuthToken, ordersRouter)
    app.use("/api/orders-products", verifyAuthToken, ordersProductsRouter)
}
