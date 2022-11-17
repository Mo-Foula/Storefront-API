import { orderModel } from "../../models/order"


const newCompletedOrder: orderModel = {
    id: 1,
    status: 'completed',
    user_id: 1,
}

const newOngoingOrder: orderModel = {
    id: 2,
    status: 'ongoing',
    user_id: 1,
}


const modelName = 'order'

export { modelName, newCompletedOrder, newOngoingOrder }