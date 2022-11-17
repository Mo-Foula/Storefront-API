import supertest from 'supertest'
import app from '../../server'
import { modelName, newProduct } from '../data/products.data'

const request = supertest(app)

const baseUrl = '/api/products/'



describe(`${modelName} endpoints`, () => {
    let authorization_token  = ''
    it('Create product', async () => {
        authorization_token = process.env.authorization_token!
        const route = ''
        const response = await request.post(`${baseUrl}${route}`)
            .send({
                ...newProduct,
                name: 'RTX 3060',
                price: 20000
            })
            .set('Authorization', authorization_token!)
        expect(response.status).toBe(200)
    })

    it('Get all products', async () => {
        const route = ''
        const response = await request.get(`${baseUrl}${route}`)
        expect(response.status).toBe(200)
    })

    it('Get certain product by id', async () => {
        const route = `${newProduct.index}`
        const response = await request.get(`${baseUrl}${route}`)
        expect(response.status).toBe(200)
    })

    it('Get products by category', async () => {
        const route = `category/${newProduct.category}`
        const response = await request.get(`${baseUrl}${route}`)
        expect(response.status).toBe(200)
    })

})
