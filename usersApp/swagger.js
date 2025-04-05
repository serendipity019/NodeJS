const m2s = require('mongoose-to-swagger');
const User = require('./models/user.model');

exports.options = {
    "components": {
        "schemas": {
            User: m2s(User)
        }
    },
    "openapi": "3.1.0",
    "info": {
        "Version": "1.0.0",
        "title": "Users and Products CRUD API",
        "Description": "An application for creating users and choosing products",
        "contact": {
            "name": "API Support",
            "url": "https://aueb.gr",
            "email":"support@example.com"
        }

    }
}