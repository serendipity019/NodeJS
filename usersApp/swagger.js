const m2s = require('mongoose-to-swagger');
const User = require('./models/user.model');

exports.options = {
    "components": {
        "schemas": {
            User: m2s(User)
        },
        "securitySchemes" : {
            "bearerAuth": {
                "type": "http",
                "scheme": "bearer",
                "bearesFormat": "JWT"
            }
        }
    },
    "security": [
        {"bearerAuth": []}
    ],
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
    },
    "servers": [
        {
         url:"http://localhost:3000",
         description: "Testing server"
        },
        {
         url:"http://www.backend.aueb.gr",
         description: "Testing server"    
        }
    ],
    "tags": [{
        "name": "Users",
        "description": "Endpoints for User"},
        {
            "name": "Users and Products",
            "description": "Endpoints for users and their products"
        },
        {
            "name": "Auth",
            "description": "Endpoints for Authentication"}
    ],
    "paths": {
        "/api/users" : {
            "get": {
                "tags":["Users"],
                "description": "Returns a list of all users",
                "responses" : {
                  "200": {
                    "description": "List of all users",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "array",
                                "items": {
                                    "$ref": "#/components/schemas/User"
                                }
                            }
                        }
                    }
                    }
                }
            },
            "post": {
                "tags": ["Users"],
                "description": "Data of users that we want to create",
                "requestBody": {
                    "description": "JSON with user data",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "username": {"type": "string"},
                                    "password": {"type": "string"},
                                    "name": {"type": "string"},
                                    "surname": {"type": "string"},
                                    "email": {"type": "string"},
                                    "address": {"type": "object",
                                        "properties": {
                                            "area": {"type": "string"},
                                            "road": {"type": "string"},
                                        }
                                    },
                                    "phone": {"type": "array",
                                        "items": {"type": "object",
                                            "properties": {
                                                "type": {"type": "string"},
                                                "number": {"type": "number"},
                                            }
                                        },
                                    }
                                },
                                "required": ["username", "password", "name", "surname", "email"]
                            }
                        }
                    }
                },
                "responses" : {
                    "200": {
                        "description": "JSON of new user"
                    }
                }
            }             
        },
        "/api/users/{username}" : {
            "get": {
                "tags":["Users"],
                "parameters": [
                    {
                        "name": "username",
                        "in" :"path",
                        "required": true,
                        "description": "Username of user that we want to find",
                        "type":"string"
                    }
                ],
                "description": "Returns users details for specific username",
                "responses" : {
                  "200": {
                    "description": "User details",
                    "content": {
                        "application/json": {
                            "schema": {
                         "$ref": "#/components/schemas/User"
                    },
                        }
                    }
                    }
                }
            }            
        },
        "/api/auth/login": {
            "post": {
                "tags" : ["Auth"],
                "description": "Login User",
                "requestBody": {
                    "description": "User send username and password. For response we have jwt token",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "username": { "type":"string"},
                                    "password": { "type": "string"}
                                },
                                "required": ["username", "password"]
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Token returned"
                    }
                }
            }
        }
     
    }
}