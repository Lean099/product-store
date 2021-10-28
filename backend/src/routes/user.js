const { Router } = require('express')
const router = Router()

const {updateUser, getUser, deleteUser} = require('../controllers/userController')

router.route('/UaG/:id')
  .get(getUser)
  .post(updateUser)

router.route('/deleteUser/:id')
  .post(deleteUser)

module.exports = router