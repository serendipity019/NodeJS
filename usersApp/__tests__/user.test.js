const mongoose = require("mongoose");
const request = require('supertest');

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
    it('GET Returns all users', async () => { // test or it is the same order
        const res = await request(app)
        .get('/api/users');

        expect(res.statusCode).toBe(200);   
        expect(res.body.status).toBeTruthy();
        expect(res.body.data.length).toBeGreaterThan(0); 
    }, 20000); // 10000 is the timeout 1sec 
});