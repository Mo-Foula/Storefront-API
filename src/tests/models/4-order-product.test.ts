import { OrderProduct } from '../../models/order-product'
import { modelName, newOrderProduct } from '../data/orders-products.data'
const orderProduct = new OrderProduct()



describe(`${modelName} model`, () => {
    it('should have an index method', () => {
        expect(orderProduct.index).toBeDefined()
    })

    it('should have a show method', () => {
        expect(orderProduct.show).toBeDefined()
    })

    it('should have a create method', () => {
        expect(orderProduct.create).toBeDefined()
    })

    it('should have a getProdctsByCategory method', () => {
        expect(orderProduct.showOrderProducts).toBeDefined()
    })

    it(`create method should add a ${modelName}`, async () => {
        // await new User().create(newUser)
        // await new Product().create(newProduct)
        // await new Order().create(newOrder)

        const result = await orderProduct.create(newOrderProduct)
        expect(result).toEqual(newOrderProduct)
    })

    it(`index method should return a list of ${modelName}`, async () => {
        const result = await orderProduct.index()
        expect(result.length).toEqual(1)
    })

    it(`show method should return the correct ${modelName}`, async () => {
        const result = await orderProduct.show(newOrderProduct)
        expect(result?.product_id).toBeDefined()
    })

    it(`showOrderProducts method should return the correct ${modelName}`, async () => {
        const result = await orderProduct.showOrderProducts(
            newOrderProduct.order_id
        )
        expect(result.length).toEqual(1)
    })

    it(`create method called on the same order and product should increment quantity by 1 ${modelName}`, async () => {
        await orderProduct.create(newOrderProduct)
        const result = await orderProduct.show(newOrderProduct)
        expect(result?.quantity).toEqual(
            newOrderProduct.quantity
                ? newOrderProduct.quantity.valueOf() + 1
                : 2
        )
    })
})
