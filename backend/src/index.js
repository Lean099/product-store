require('dotenv').config()
const express = require('express')
const cors = require('cors')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid');
const path = require('path')
const app = express()
require('./database')

app.set('port', 3001)

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb)=>{
        cb(null, uuidv4() + path.extname(file.originalname))
    }
})

app.use(multer({
    storage: storage
}).single('file'))

app.use('/api/user', require('./routes/user'))
app.use('/api/product', require('./routes/product'))
app.use('/api/mp', require('./routes/MP'))

app.listen(app.get('port'), ()=>{
    console.log('Server on port', app.get('port'))
})