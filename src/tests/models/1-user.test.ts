import { userModel, User } from "../../models/user"

const user = new User()

const newUser: userModel = {
    id: 1,
    firstname: "John",
    lastname: "Doe",
    password: "password",
    username: "johndoe"
}

const modelName = "user"

describe(`${modelName} model`, () => {
    it("should have an index method", () => {
        expect(user.index).toBeDefined()
    })

    it("should have a show method", () => {
        expect(user.show).toBeDefined()
    })

    it("should have a create method", () => {
        expect(user.create).toBeDefined()
    })

    it(`create method should add a ${modelName}`, async () => {
        await user.create(newUser)
        expect({ ...(await user.show(newUser.id!)), password: "password" }).toEqual(newUser)
    })

    it(`index method should return a list of ${modelName}`, async () => {
        const result = await user.index()
        expect([{ ...result[0], password: "password" }]).toEqual([
           newUser
        ])
    })

    it(`show method should return the correct ${modelName}`, async () => {
        const result = await user.show(1)
        expect({...result,password:"password"}).toEqual(newUser)
    })
})
