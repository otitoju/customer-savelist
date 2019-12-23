const model = require('../models')

class ProductService {
    static async createProduct(data) {
        try {
            const info = await model.Product.create(data)
            return info
        } catch (e) {
            throw e
        }
    }

    static async getAllProducts() {
        try {
            const info = await model.Product.findAll({})
            return info
        } catch (e) {
            throw e
        }       
    }

    static async updateProduct(productId, userId, data) {
        try {
            const info = await model.Product.findOne({ where: {id: productId, userId: userId }})
            if(info){
                const updated = await model.Product.update(data, { where: {id: productId }})
                return updated
            }
            else {
                return null
            }
        } catch (e) {
            throw e 
        }
    }

    static async deleteProduct(productId, userId) {
        try {
            const info = await model.Product.findOne({ where: {id: productId, userId: userId}})
            if(info) {
                return await model.Product.destroy({ where: {id: productId }})
            }
            return null
        } catch (e) {
            throw e 
        }
    }
}

module.exports = ProductService