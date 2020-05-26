const express = require("express");

const db = require("../data/dbConfig.js");

const router = require('../router/router');

const server = express();

server.use(express.json());
server.use('/api/accounts', router);

module.exports = server;
