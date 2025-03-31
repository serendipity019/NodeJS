const express = require('express');
const app = express();

module.exports = app;  

const user = require('./routes/user.routes');
app.use('/api/users', user);