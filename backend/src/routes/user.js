const { Router } = require('express')
const router = Router()

const {createUser, login, deleteAvatar, updateUser, updateUserLoginData, getUser, deleteUser} = require('../controllers/userController')

router.route('/createUser')
  .post(createUser)

router.route('/login')
  .post(login)

router.route('/avatar/:id')
  .post(deleteAvatar)

router.route('/UaG/:id')
  .get(getUser)
  .post(updateUser)

router.route('/updateCredentials/:id')
  .post(updateUserLoginData)

router.route('/deleteUser/:id')
  .post(deleteUser)

module.exports = router