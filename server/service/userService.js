const model = require('../models')

class UserService {
    static async getAllUsersWithProduct() {
      try {
       const info = await model.User.findAll({
            include: [{
                model: model.Product,
                as: 'userproducts'
            }],
            order: [
                ['createdAt', 'DESC'],
                [{ model: model.Product, as: 'userproducts' }, 'createdAt', 'ASC'],
            ],
        })
        return info
      } catch (e) {
        throw e;
      }
    }

    static async createUser(data) {
        try {
            const info = await model.User.create(data)
            return info
        } catch (e) {
            throw e
        }
    }
  
    static async getSingleUser(userId) {
        try {
            const info = await model.User.findOne({ where: {id: userId}, 
            include: [{
                model: model.Product,
                as: 'userproducts'
            }] })
            return info
        } catch (e) {
            throw e
        }
    }

    static async deleteUser(userId) {
        try {
            const info = await model.User.findOne({ where: {id: userId}})
            if(info) {
                return await model.User.destroy({ where: {id: userId}})
            }
            else {
                return null
            }
        } catch (e) {
            throw e
        }
    }

    static async updateUser(data, userId) {
        try {
            const info = await model.User.findOne({ where: {id: userId}})
            if(info) {
                const updated = await model.User.update(data, { where: {id: userId}})
                return updated
            }
            else {
                return null
            }
        } catch (e) {
            throw e
        }
    }
  }
  
  module.exports = UserService;