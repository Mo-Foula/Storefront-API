import { orderProductModel } from "../../models/order-product"

const newOrderProduct: orderProductModel = {
    product_id: 1,
    order_id: 1,
    quantity: 2,
}

const modelName = 'order-product'

export { modelName, newOrderProduct }