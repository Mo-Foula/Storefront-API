import Client from "../database"
// import { Category, categoryModel } from './categories';

export type productModel = {
    index?: number
    name: string
    price: number
    category: string
}

export class Product {
    // async getCategoryById(id: number): Promise<categoryModel | undefined> {
    //     try{
    //         return (new Category()).show(id);
    //     } catch (err) {
    //         throw new Error(`Cannot get products ${err}`)
    //     }
    // }

    async index(): Promise<productModel[]> {
        try {
            const conn = await Client.connect()
            const sql = "SELECT * FROM products;"
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Cannot get products ${err}`)
        }
    }

    async show(id: number): Promise<productModel | undefined> {
        try {
            const conn = await Client.connect()
            const sql = "SELECT * FROM products where index = $1;"
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Cannot get products ${err}`)
        }
    }

    async create(newProduct: productModel): Promise<productModel> {
        try {
            const conn = await Client.connect()
            const { name, price, category } = newProduct

            const sql =
                "INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *;"
            const result = await conn.query(sql, [name, price, category])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Cannot get products ${err}`)
        }
    }

    async _getTopFivePopularProdcts(): Promise<productModel[]> {
        try {
            const conn = await Client.connect()
            const numberOfProducts = 5
            const sql = "SELECT * FROM products where id = $1 ;"
            const result = await conn.query(sql, [numberOfProducts])
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Cannot get products ${err}`)
        }
    }

    async getProdctsByCategory(category: string): Promise<productModel[]> {
        try {
            const conn = await Client.connect()
            const sql = "SELECT * FROM products where category = $1 ;"
            const result = await conn.query(sql, [category])
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Cannot get products ${err}`)
        }
    }
}
