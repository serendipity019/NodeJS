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
});