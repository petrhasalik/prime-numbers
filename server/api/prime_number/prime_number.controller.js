'use strict';

var _ = require('lodash'),
	numberToWords = require('../../libs/number_to_words'),
	primes = require('../../libs/prime_numbers'),
	bogan = require('boganipsum');

// Config for this controller
var config = {
	maxPrimeNumber: 1000,
	defaultLimit: 20,
	defaultMaxType: 'n_primes'
};


// Get list of the prime_numbers
exports.getList = function(req, res, next) {
	// get query params (_limit, _offset), if no offset is set then start from 0
	// if max prime number is not set then hardcode to 10000
	// if limit is not set then get default limit of 20 items
	var limit = req.query._limit || config.defaultLimit,
		offset = req.query._offset || 0,
		maxPrimeNumber = req.query.max || config.maxPrimeNumber,
		// is max n first prime number or is max maximal prime number;
		maxType = req.query.max_type || config.defaultMaxType;

	var primeNumbers = primes.get(maxPrimeNumber, limit, offset, maxType);
	// Response in JSON
	var response = {
		// map all items and expand them
		items: _.map(primeNumbers, function(item) { 
			return {
				prime_number: item,
				// self link
				_self: "/api/prime_numbers/" + item
			} 
		}),
		_self: '/api/prime_numbers?max=' + maxPrimeNumber + '&_offset=' + offset + '&_limit=' + limit + '&max_type=' + maxType,
		// It is the best practice to keep the logic on the backend (minimal logic on frontend is always better)
		_next: '/api/prime_numbers?max=' + maxPrimeNumber + '&_offset=' + limit + '&_limit=' + ((limit - offset) + Number(limit)) + '&max_type=' + maxType
	}
	res.json(response);
};

// Get detail of prime number
exports.getItem = function(req, res) {
	// primenumber is req param defined in router (index.js is in the same directory)
	var number = req.param('number');
	// If not prime then respond with 404 code else respond with the detail prime number object
	if (!primes.isPrime(number)) {
		res.status(404).json({message: 'Prime number not found'});
	}
	else {
		res.json({
			prime_number: number,
			// convert number words
			in_words: numberToWords.convert(number),
			// describe lorem ipsum
			descr: bogan({ paragraphs: 1 }),
			// self link
			_self: "/prime_nubers/" + number
		});
	}
};