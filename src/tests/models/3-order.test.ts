import { orderModel, Order } from "../../models/order"
import { userModel } from "../../models/user"

const order = new Order()

const newCompletedOrder: orderModel = {
    id: 1,
    status: "completed",
    user_id: 1,
}

const newOngoingOrder: orderModel = {
    id: 2,
    status: "ongoing",
    user_id: 1,
}

const newUser: userModel = {
    id: 1,
    firstname: "John",
    lastname: "Doe",
    password: "password",
    username: "",
}

const modelName = "order"

describe(`${modelName} model`, () => {
    it("should have an index method", () => {
        expect(order.index).toBeDefined()
    })

    it("should have a show method", () => {
        expect(order.show).toBeDefined()
    })

    it("should have a create method", () => {
        expect(order.create).toBeDefined()
    })

    it("should have a userOrdersWithCertainStatus method", () => {
        expect(order.userOrdersWithCertainStatus).toBeDefined()
    })

    it(`create method should add a ${modelName}`, async () => {
        // await new User().create(newUser);
        await order.create(newCompletedOrder)
        expect(await order.show(newCompletedOrder.id!)).toEqual({
            id: 1,
            status: "completed",
            user_id: newUser.id!,
        })

        await order.create(newOngoingOrder)
        expect(await order.show(newOngoingOrder.id!)).toEqual({
            id: 2,
            status: "ongoing",
            user_id: newUser.id!,
        })
    })

    it(`index method should return a list of ${modelName}`, async () => {
        const result = await order.index()
        expect(result).toEqual([newCompletedOrder, newOngoingOrder])
    })

    it(`show method should return the correct ${modelName}`, async () => {
        const result = await order.show(1)
        expect(result).toEqual(newCompletedOrder)
    })

    it(`userOrdersWithCertainStatus (completed orders) method should return the correct ${modelName}`, async () => {
        const result = (await order.userOrdersWithCertainStatus(
            1,
            newCompletedOrder.status
        )) as orderModel[]
        expect(result[0]).toEqual(newCompletedOrder)
    })

    it(`userOrdersWithCertainStatus (cart) method should return the correct ${modelName}`, async () => {
        const result = await order.userOrdersWithCertainStatus(
            1,
            newOngoingOrder.status
        )
        expect(result).toEqual(newOngoingOrder)
    })
})
