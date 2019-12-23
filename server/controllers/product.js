const ProductService = require('../service/productService')


class ProductController {
  static async createProduct(req, res) {
    try {
      if(!req.body.name || !req.body.price || !req.params.userId) {
        return res.status(400).json({
          message: 'Please ensure you fill all fields'
        })
      }
      else {
        const data = req.body
        const info = await ProductService.createProduct(data)
        info.userId = req.params.userId
        await info.save()
        return res.status(201).json({
          info: info
        })
      }
    } catch (e) {
      console.log(e.message)
      return res.status(500).json({
        error: e.message
      })
    }
  }

  static async updateProduct(req, res) {
    try {
      const { productId, userId } = req.params
      const data = req.body
      const info = await ProductService.updateProduct(productId, userId, data)
      if(info) {
        return res.status(200).json({
          info: info,
          message: 'Updated'
        })
      }
      else {
        return res.status(404).json({
          message: 'Not found'
        })
      }
    } catch (e) {
      console.log(e.message)
      return res.status(500).json({
        error: e.message
      })
    }
  }

  static async deleteProduct(req, res) {
    try {
      const { productId, userId } = req.params
      const info = await ProductService.deleteProduct(productId, userId)
      if(info) {
        return res.status(200).json({
          message: 'product deleted',
          info: info
        })
      }
      else{
        return res.status(404).json({
          message: 'Not found'
        })
      }
    } catch (e) {
      console.log(e.message)
      return res.status(500).json({
        error: e.message
      })
    }
  }

}

module.exports = ProductController;