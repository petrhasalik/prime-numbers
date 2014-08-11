'use strict';

var _ = require('lodash'),
	numberToWords = require('../../libs/number_to_words'),
	primes = require('../../libs/prime_numbers'),
	bogan = require('boganipsum');

// Config for this controller
var config = {
	maxPrimeNumber: 1000,
	defaultLimit: 20
};


// Get list of prime_numbers
exports.getList = function(req, res, next) {
	// get query params (_limit, _offset), if no offset is set start from 0
	// if there is no max prime number set then hardcode to 10000
	// if limit is not set then get default limit 20 items
	var limit = req.query._limit || config.defaultLimit,
		offset = req.query._offset || 0,
		maxPrimeNumber = req.query.max_prime_number || config.maxPrimeNumber;
	var primeNumbers = primes.get(maxPrimeNumber, limit, offset);
	// Response in JSON
	var response = {
		// map all items and expand them
		items: _.map(primeNumbers, function(item) { 
			return {
				prime_number: item,
				// self link
				_self: "api/prime_numbers/" + item
			} 
		}),
		_self: 'api/prime_numbers?max_prime_number=' + maxPrimeNumber + '&_offset=' + offset + '&_limit=' + limit,
		// This is  the best practice to keep the bussines logic on the backend (minimal bussines logic on the frontend)
		_next: 'api/prime_numbers/?max_prime_number=' + maxPrimeNumber + '&_offset=' + limit + '&_limit=' + ((limit - offset) + Number(limit))
	}
	res.json(response);
};

// Get detail of the prime number
exports.getItem = function(req, res) {
	// primenumber is req param defined in router (index.js is in the same directory)
	var number = req.param('number');
	// If not prime then respond 404 code else response detail prime number object
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