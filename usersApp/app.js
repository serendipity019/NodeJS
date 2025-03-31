const express = require('express');
const app = express();

const user = require('./routes/user.routes');
app.use('/api/users', user);
app.use(express.json());

module.exports = app;  

