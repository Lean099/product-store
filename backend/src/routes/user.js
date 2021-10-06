const { Router } = require('express')
const router = Router()

const {updateUser} = require('../controllers/userController')

router.get('/', (req, res)=>{
  res.send('Hola')
})

router.route('/update')
  .post(updateUser)


module.exports = router