const { render } = require('ejs');
const express = require('express'); 
const app = express();
const port = 3000; 

app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs'); 

app.get('/create', (req, res) => {
    console.log('Create Page');
    res.render('form', {})// It is necessary for to watch the pages to create a folder with the name views. 
});

app.post('/user', (req, res) => {
    console.log('User Post');

    let data = req.body;
    console.log('Data', data);

    let username = req.body.username;
    let email = data.email; 

    res.render('user', {
        data1: username,
        data2: email
    });
})


app.get('/users', (req, res) => {
    console.log('Users Page');

    const users = [
        {
            "username": "markos",
            "email":"marka@aueb.gr"
        },
        {
            "username": "thanasis",
            "email":"thanasis@aueb.gr"
        }
    ]

    res.render('users', {users})
})




app.listen(port, () => {
    console.log('Server is up');
})