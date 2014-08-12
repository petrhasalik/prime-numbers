// Function to calculate first n primes
var getNPrimes = function(numberOfPrimes) {
	// multiples of two aren't prime numbers, but two itself is a prime number
	var primes = [2];
	--numberOfPrimes;
	// Iterate over first n prime numbers step only by the odd numbers
	for (var i = 3; numberOfPrimes > 0;  i += 2) {
		// test if number is prime or not
		if (exports.isPrime(i, primes)) {
			primes.push(i);
			--numberOfPrimes;
		}
	}
	return primes;
};

var sieveOfEratosthenes = function(primeNumberLimit) {
	// Declare the Sieve array, and primeNumbers array for fn return value
	var sieve = [], 
		primes = [];
	// I choose the Sieve of Eratosthenes, loop starts on the first prime number 2z
	for (var number = 2; number <= primeNumberLimit; ++number) {
		// not marked, it is prime number
		if (!sieve[number]) {
			// add number to the prime numbers array
			primes.push(number);
			// add nonprime numbers to the sieve
			// number << 1 - speed up of the code
			// 16 << 2 is the same as 16 * 2 but by the article without speed effect it's only the wtf syntax 
			for (var i = number << 1; i <= primeNumberLimit; i += number) {
				// set true value to the sieve array
				// other possible way is to push the value into array directly and then check if ES5 method array.indexOf()
				// return non negative number, but this is much more faster solution
				// http://jsperf.com/simple-app-sive-of-eratosthenes
				sieve[i] = true;
			}
		}
	}
	return primes;
};


// Function to calculate prime numbers to the max number or n first prime numbers
exports.get = function(n, limit, offset, type) {
	var primes = [];
	// choose type
	if (type === 'n_primes') primes = getNPrimes(n); 
	else if (type === 'prime_number') primes = sieveOfEratosthenes(n);
	// return slice of primenumbers if no limit is set then slice gets ending param length of the primes
	return primes.slice(offset, limit || primes.length);
};


// prime number test
exports.isPrime = function(number, primes) {
	// shortcut
	if (number === 2) return true;
	// Number must be less then 2 and must be an integer
	if (number < 2 || number != Math.round(number)) return false;

	// Tiny optimalization: do not calculate sqrt of number on every iteration
	var max = Math.sqrt(number);
	var len = primes ? primes.length : false;
	// Every interation from 2 must be to the square root of number. If divides number exactly, number cannot be prime.
	for (var i = 2; i <= max && (len ? i < len : true); i += 1) if (number % i === 0) return false;

	// Number is prime
	return true;
};