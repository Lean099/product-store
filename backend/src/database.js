const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_CONNECTION, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

const connection = mongoose.connection;

connection.once('open', ()=>{
    console.log('Database is Connected!');
})