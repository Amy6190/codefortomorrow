const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/userRoutes.js');
require('dotenv').config();


app.use(express.json());


app.use(cors());

app.use('/user', userRoutes);


app.get('/', function(req, res){
    res.send('node is running');
});

app.listen(process.env.PORT || 5000,() =>{
    console.log(`node running on port ${process.env.PORT}`);
});