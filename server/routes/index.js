const express = require('express')
const router = express.Router()
const userController = require('../controllers/user');
const productcontroller = require('../controllers/product')

// user routes
router.get('/api/v1/users', userController.getAllUsersWithProduct)
router.post('/api/v1/register', userController.createUser)
router.get('/api/v1/user/:userId', userController.getSingleUser)
router.delete('/api/v1/user/del/:userId', userController.deleteUser)
router.put('/api/v1/user/put/:id', userController.updateUser)

// product routes
router.post('/api/v1/product/create/:userId', productcontroller.createProduct)
router.put('/api/v1/product/put/:userId/product/:productId', productcontroller.updateProduct)
router.delete('/api/v1/product/put/:userId/product/:productId', productcontroller.deleteProduct)

module.exports = router;