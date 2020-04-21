const helmet = require("helmet"); 
const express = require("express"); 
const server = express(); 

const usersRouter = require("../users/users-router.js"); 
const authRouter = require("../auth/auth-router.js"); 
const authenticator = require("../auth/authenticator.js"); 

server.use(express.json()); 
server.use(helmet()); 

const session = require("express-session"); 
    const sessionConfig = {
        name: 'monster', 
        secret: process.env.SESSION_SECRET || 'keep it secret, keep it safe!', 
        resave: false, 
        saveUninitialized: process.env.SEND_COOKIES | true, 
        cookie: {
        maxAge: 1000 * 60 * 10, // good for 10 minutes in ms
        secure: process.env.USE_SECURE_COOKIES || false, // used over https only, set to true in production
        httpOnly: true, // true means JS on the client access the cookie
        }
    }       

server.use(session(sessionConfig)); 
        
server.use("/api/users", authenticator, usersRouter); 
server.use("/api/auth", authRouter); 

module.exports = server; 