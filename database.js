'use strict'

const mongoose = require('mongoose');

const MONGODB_URL = 'mongodb://localhost:27017/AuthApp'

mongoose.Promise = Promise;

module.exports.connect = () => mongoose.connect(MONGODB_URL)