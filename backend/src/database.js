const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_CONNECTION, {});

const connection = mongoose.connection;

connection.once('open', ()=>{
    console.log('Database is Connected!');
})