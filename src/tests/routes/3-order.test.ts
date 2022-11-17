import supertest from 'supertest'
import app from '../../server'
import { modelName, newCompletedOrder, newOngoingOrder } from '../data/orders.data'

const request = supertest(app)

const baseUrl = '/api/orders/'

describe(`${modelName} endpoints`, () => {
    let authorization_token  = ''
    it('Create order', async () => {
        const route = ``
        authorization_token = process.env.authorization_token!
        const response = await request.post(`${baseUrl}${route}`).send({
            status: newOngoingOrder.status,
            user_id: newOngoingOrder.user_id
        })
        .set('Authorization', authorization_token!)
        expect(response.status).toBe(200)

        const response2 = await request.post(`${baseUrl}${route}`)
        .send({
            status: newOngoingOrder.status,
            user_id: 2
        })
        .set('Authorization', authorization_token!)
        process.env['newOrderId'] = response2.body.id
        expect(response2.status).toBe(200)

        const response3 = await request.post(`${baseUrl}${route}`).send({
            status: newCompletedOrder.status,
            user_id: newCompletedOrder.user_id
        })
        .set('Authorization', authorization_token!)
        expect(response3.status).toBe(200)
    })

    it('Get all orders', async () => {
        const route = ``
        const response = await request.get(`${baseUrl}${route}`).set('Authorization', authorization_token!)
        expect(response.status).toBe(200)
    })

    it('Get order by id', async () => {
        const route = `${newCompletedOrder.id}`
        const response = await request.get(`${baseUrl}${route}`).set('Authorization', authorization_token!)
        expect(response.status).toBe(200)
    })

    it('Get user completed order', async () => {
        const route = `user/${newCompletedOrder.user_id}/completedOrders`
        const response = await request.get(`${baseUrl}${route}`).set('Authorization', authorization_token!)
        expect(response.status).toBe(200)
    })

    it('Get user cart', async () => {
        const route = `user/${process.env['newOrderId']}/cart`
        const response = await request.get(`${baseUrl}${route}`).set('Authorization', authorization_token!)
        expect(response.status).toBe(404) // no items yet
    })

    it('Complete user order', async () => {
        const route = `user/1/completeOrder`

        // should fail
        const route2 = `user/30/completeOrder`
        const response2 = await request.put(`${baseUrl}${route2}`).set('Authorization', authorization_token!)
        expect(response2.status).toBe(404)

        // should fail
        const response3 = await request.put(`${baseUrl}${route}`)
        expect(response3.status).toBe(401)

        // should succeed
        const response = await request.put(`${baseUrl}${route}`).set('Authorization', authorization_token!)
        expect(response.status).toBe(200)
    })  
})
