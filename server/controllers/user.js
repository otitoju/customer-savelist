const UserService  = require('../service/userService')

class UserController {
  static async getAllUsersWithProduct(req, res) {
    try {
      const info = await UserService.getAllUsersWithProduct()
      if(info.length > 0) {
        return res.status(200).json({info: info})
      }
      else {
        return res.status(404).json({message: 'No user found'})
      }
    } catch (e) {
      console.log(e.message)
      return res.status(500).json({error:e.message})
    }
  }

  static async createUser(req, res) {
    try {
      if(!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({
          message: 'Please fill all fields'
        })
      }
      else {
        const data = req.body
        const info = await UserService.createUser(data)
        return res.status(201).json({
          message: 'Created', info: info
        })
      }
    } catch (e) {
      console.log(e.message)
      return res.status(500).json({error:e.message})
    }
  }

  static async getSingleUser(req, res) {
    try {
      const { userId } = req.params
      const info = await UserService.getSingleUser( userId )
      return res.status(200).json({
        info: info
      })
    } catch (e) {
      console.log(e.message)
      return res.status(500).json({error:e.message})
    }
  }

  static async deleteUser(req, res) {
    try {
      const { userId } = req.params
      const info = await UserService.deleteUser( userId )
      if(info) {
        return res.status(200).json({
          message: 'User deleted',
          info: info
        })
      }
      else {
        return res.status(404).json({
          message: 'User not found'
        })
      }
    } catch (e) {
      console.log(e.message)
      return res.status(500).json({error:e.message})
    }
  }

  static async updateUser(req, res) {
    try {
      const { id } = req.params
      const data = req.body
      const info = await UserService.updateUser(data, id)
      if(info) {
        return res.status(200).json({
          message: 'user updated',
          info: info
        })
      }
      else{
        return res.status(404).json({
          message: 'User not found'
        })
      }
    } catch (e) {
      console.log(e.message)
      return res.status(500).json({error:e.message})
    }
  }
}

module.exports = UserController