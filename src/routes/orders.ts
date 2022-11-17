import express from 'express'
import {
    create,
    index,
    show,
    userCart,
    userCompletedOrders,
    userCompleteOrder,
} from '../controller/orders'
import verifyAuthToken from '../middlewares/authorization'

const ordersRouter = express.Router()
ordersRouter.get('/', verifyAuthToken, index)

ordersRouter.get('/:id', verifyAuthToken, show)

ordersRouter.post('/', verifyAuthToken, create)

ordersRouter.get('/user/:userId/cart', verifyAuthToken, userCart)

ordersRouter.get(
    '/user/:userId/completedOrders',
    verifyAuthToken,
    userCompletedOrders
)

ordersRouter.put(
    '/user/:userId/completeOrder',
    verifyAuthToken,
    userCompleteOrder
)

export default ordersRouter
