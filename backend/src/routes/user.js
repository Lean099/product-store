const { Router } = require('express')
const router = Router()

const {updateUser, getUser} = require('../controllers/userController')

router.get('/', (req, res)=>{
  res.send('Hola')
})

router.route('/UaG/:id')
  .get(getUser)
  .post(updateUser)


module.exports = router