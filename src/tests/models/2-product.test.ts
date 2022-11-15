import { Product, productModel } from "../../models/product"

const product = new Product()

const newProduct: productModel = {
    index: 1,
    category: "Electronics",
    name: "Playstation 5",
    price: 17000,
}

const modelName = "product"

describe(`${modelName} model`, () => {
    it("should have an index method", () => {
        expect(product.index).toBeDefined()
    })

    it("should have a show method", () => {
        expect(product.show).toBeDefined()
    })

    it("should have a create method", () => {
        expect(product.create).toBeDefined()
    })

    it("should have a getProdctsByCategory method", () => {
        expect(product.getProdctsByCategory).toBeDefined()
    })

    it(`create method should add a ${modelName}`, async () => {
        await product.create(newProduct)
        expect(await product.show(newProduct.index!)).toEqual({
            index: 1,
            category: "Electronics",
            name: "Playstation 5",
            price: 17000,
        })
    })

    it(`index method should return a list of ${modelName}`, async () => {
        const result = await product.index()
        expect(result).toEqual([newProduct])
    })

    it(`show method should return the correct ${modelName}`, async () => {
        const result = await product.show(1)
        expect(result).toEqual(newProduct)
    })

    it(`getProdctsByCategory method should return the correct ${modelName}`, async () => {
        const result = await product.getProdctsByCategory(newProduct.category)
        expect(result).toEqual([newProduct])
    })
})
