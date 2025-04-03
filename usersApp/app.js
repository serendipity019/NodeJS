const express = require('express');
const app = express();

const user = require('./routes/user.routes');
const userProduct = require('./routes/user.products.routes');
app.use('/api/users', user);
app.use(express.json());
app.user('/api/user-product', userProduct);

module.exports = app;  

