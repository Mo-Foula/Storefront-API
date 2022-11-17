import { userModel } from '../../models/user'

const newUser: userModel = {
    id: 1,
    firstname: 'John',
    lastname: 'Doe',
    password: 'password',
    username: 'johndoe',
}

const modelName =  'user'
export { newUser, modelName }
