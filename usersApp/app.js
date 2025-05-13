const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({extended:false}));

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');

const user = require('./routes/user.routes');
const userProduct = require('./routes/user.products.routes');
const auth = require('./routes/auth.routes');

app.use(cors({
    origin: '*'
    //origin: ['http://localhost:8000'] //This is allow to have access the python server 
}));

app.use('/api/users', user);
app.use('/api/user-product', userProduct);
app.use('/api/auth', auth);

app.use('/', express.static('files')); // This need to open the files in the folder with name 'files'. 

app.use('/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument.options)
);

module.exports = app;  

