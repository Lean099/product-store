const { Router } = require('express')
const router = Router()

const {updateUser, getUser, testData} = require('../controllers/userController')

router.route('/UaG/:id')
  .get(getUser)
  .post(updateUser)


module.exports = router