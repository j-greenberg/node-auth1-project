const helmet = require("helmet"); 
const express = require("express"); 
const server = express(); 

const usersRouter = require("../users/users-router.js"); 
const authRouter = require("../auth/auth-router.js"); 
const authenticator = require("../auth/authenticator.js"); 

server.use(express.json()); 
server.use(helmet()); 

server.use("/api/users", authenticator, usersRouter); 
server.use("/api/auth", authRouter); 

module.exports = server; 