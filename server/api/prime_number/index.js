'use strict';

// Number of the API router

var express = require('express');

var controller = require('./prime_number.controller');

var router = express.Router();

router.get('/', controller.getList);
router.get('/:number', controller.getItem);

module.exports = router;