import supertest from 'supertest'
import app from '../../server'
import { modelName } from '../data/users.data'
import { newUser } from '../data/users.data'

const request = supertest(app)

const baseUrl = '/api/users/'



describe(`${modelName} endpoints`, () => {
    let authorization_token = ''
    it('Test user signup', async () => {
        const route = ``
        const response = await request.post(`${baseUrl}${route}`).send({
            ...newUser,
            username: newUser.username + "123"
        })
        expect(response.status).toBe(200)
    })

    it('Test user login', async () => {
        const route = 'login'
        const response = await request.post(`${baseUrl}${route}`).send({
            username: newUser.username,
            password: newUser.password,
        })
        process.env['authorization_token'] = response.body;
        authorization_token = response.body
        expect(response.status).toBe(200)
    })


    it('Get certain user by id', async () => {
        const route = `${newUser.id}`
        const response = await request.get(`${baseUrl}${route}`).set('Authorization', authorization_token)
        expect(response.status).toBe(200)
    })

    it('Get all users', async () => {
        const route = ''
        const response = await request.get(`${baseUrl}${route}`).set('Authorization', authorization_token)
        expect(response.status).toBe(200)
    })

})
