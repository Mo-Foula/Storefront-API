import supertest from 'supertest'
import app from '../../server'
import { modelName, newOrderProduct } from '../data/orders-products.data'
import { newOngoingOrder } from '../data/orders.data'

const request = supertest(app)

const baseUrl = '/api/orders-products/'

describe(`${modelName} endpoints`, () => {
    let authorization_token = ''
    it('Create order-product', async () => {
        const route = ``
        authorization_token = process.env.authorization_token!
        const response = await request.post(`${baseUrl}${route}`)
            .send(newOrderProduct)
            .set('Authorization', authorization_token!)
        expect(response.status).toBe(200)

        await request.post(`${baseUrl}${route}`)
            .send({
                ...newOrderProduct,
                order_id: parseInt(process.env['newOrderId']!)
            })
            .set('Authorization', authorization_token!)
        expect(response.status).toBe(200)

    })

    it('Get all orders full data', async () => {
        const route = ``
        const response = await request.get(`${baseUrl}${route}`).set('Authorization', authorization_token!)
        expect(response.status).toBe(200)
    })

    it('Get order products', async () => {
        const route = `${newOrderProduct.order_id}`
        const response = await request.get(`${baseUrl}${route}`).set('Authorization', authorization_token!)
        expect(response.status).toBe(200)
    })

    it('Get order product full data', async () => {
        const route = `${newOrderProduct.order_id}/product/${newOrderProduct.product_id}`
        const response = await request.get(`${baseUrl}${route}`).set('Authorization', authorization_token!)
        expect(response.status).toBe(200)
    })

    it('Get user cart products', async () => {
        const route = `user/2/cart`
        const response = await request.get(`${baseUrl}${route}`).set('Authorization', authorization_token!)
        expect(response.status).toBe(200)

        // should fail
        const route2 = `user/${newOngoingOrder.user_id + "1234"}/cart`
        const response2 = await request.get(`${baseUrl}${route2}`).set('Authorization', authorization_token!)
        expect(response2.status).toBe(404)
    })
})
