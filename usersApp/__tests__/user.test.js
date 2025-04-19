const mongoose = require("mongoose");
const request = require('supertest');

const authService = require('../services/auth.service');
const userService = require('../services/user.services');

const app = require('../app');

require('dotenv').config();

//Connecting to MongoDB before each test
beforeEach(async ()=> {
    await mongoose.connect(process.env.MONGODB_URI)
    .then(
        () => {console.log("Connection to MongoDB established for Jest")},
        err => {console.log("Failed to connect to MongoDB for Jest", err)}
    );
});

// Close connection to MongoDB after each test
afterEach(async () => {
    await mongoose.connection.close();
});

// Now create the tests
describe("Requests for /api/users", () => {

    let token;

    beforeAll(() => {
        user = {
            username: "admin",
            email: "admin@aueb.gr",
            roles: ["EDITOR", "READER", "ADMIN"]
        };
        token = authService.generateAccessToken(user);
    });

    it('GET Returns all users', async () => { // test or it is the same order
        const res = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);   
        expect(res.body.status).toBeTruthy();
        expect(res.body.data.length).toBeGreaterThan(0); 
    }, 20000); // 10000 is the timeout 1sec 

    it("POST Creates a user", async () => {
        const res = await request(app)
            .post('/api/users')
            .set('Authorization', `Bearer ${token}`)
            .send({
                'username' : 'test5',
                'password' : '12345',
                'name': 'test5 name',
                'surname': 'test5 surname',
                'email' : 'test5@aueb.gr',
                'address': {
                    'area': 'area1',
                    'road' : 'road5'
                }
            });
        
            expect(res.statusCode).toBe(200);
            expect(res.body.status).toBeTruthy();
    }, 20000);

    it('POST Creates a user that already exists', async () => {
        const res = await request(app)
        .post('/api/users')
        .set('Authorization', `Bearer ${token}`)
        .send({
            'username' : 'test5',
                'password' : '12345',
                'name': 'new name',
                'surname': 'new surname',
                'email' : 'new@aueb.gr',
                'address': {
                    'area': 'area1',
                    'road' : 'road5'
        }}); 
        
        expect(res.statusCode).toBe(400);
        expect(res.body.status).not.toBeTruthy();
    }, 10000);

    it("Post Creates a user with same email", async() => {
        const res = await request(app)
        .post('/api/users')
        .set('Authorization', `Bearer ${token}`)
        .send({
            'username' : 'test6',
                'password' : '12345',
                'name': 'name test6',
                'surname': 'surname test6',
                'email' : 'test5@aueb.gr',
                'address': {
                    'area': 'area1',
                    'road' : 'road5'
        }});

        expect(res.statusCode).toBe(400);
        expect(res.body.status).not.toBeTruthy();
    }, 10000);

    it('POST Creates a user with empty name, surname, password', async() => {
        const res = await request(app)
        .post('/api/users')
        .set('Authorization', `Bearer ${token}`)
        .send({
            'username' : 'test6',
                'password' : '',
                'name': '',
                'surname': '',
                'email' : 'test6@aueb.gr',
                'address': {
                    'area': 'area1',
                    'road' : 'road5'}
        });

        expect(res.status).toBe(400);
        expect(res.body.status).not.toBeTruthy();
    });
});

describe("Requests for /api/users/:username", () => {
    let token

    // beforeAll(() => {
    //     user = {
    //         username: "admin",
    //         email: "admin@aueb.gr",
    //         roles: ["EDITOR", "READER", "ADMIN"]
    //     };
    //     token = authService.generateAccessToken(user);
    // });
    
    

    it('Get returns specific user', async() => {

        // This below is to make automation user instead to pass user like above with beforeAll.  
        const result = await userService.findLastInsertedUser();
        console.log('RESULT>>',  result); 

        const res = await request(app)
        .get('/api/users/' + result.username)
        .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBeTruthy();
        expect(res.body.data.username).toBe(result.username);
        expect(res.body.data.email).toBe(result.email);
    });

    it('Update a user', async () => {
        const result = await userService.findLastInsertedUser();

        const res = await request(app)
        .patch('/api/users/' + result.username)
        .set('Authorization', `Bearer ${token}`)
        .send({
            username: result.username,
            name: "new updated name",
            surname: "new updated surname",
            email: "new@aueb.gr",
            address: {
                area: "area50",
                road: result.address.road
            }
        });

        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBeTruthy();
        
    }, 10000);

    it('Delete a user', async () => {
        const result = await userService.findLastInsertedUser();

        const res = await request(app)
        .delete('/api/users/' + result.username)
        .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBeTruthy();
    })
});