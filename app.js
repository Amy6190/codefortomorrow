const express = require('express');
const app = express();
const http = require("http"); 
const server = http.createServer(app);
const cors = require('cors');
const userRoutes = require('./routes/userRoutes.js');
const setupSocket = require('./websocket/socket.js');
require('dotenv').config();
setupSocket(server);


app.use(express.json());


app.use(cors());

app.use('/user', userRoutes);


app.get('/', function(req, res){
    res.send('node is running');
});

server.listen(process.env.PORT || 5000,() =>{
    console.log(`node running on port ${process.env.PORT}`);
});