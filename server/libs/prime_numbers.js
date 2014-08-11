// Function to calculate prime numbers
exports.get = function(primeNumberLimit, limit, offset) {
	// Declare sive array, and primeNumbers array for fn return value
	var sieve = [], 
		primes = [];
	// I choose the Sieve of Eratosthenes, loop start on first prime number 2
	for (var number = 2; number <= primeNumberLimit; ++number) {
		// not marked, it is prime number
		if (!sieve[number]) {
			// add number to the prime numbers array
			primes.push(number);
			// add nonprime numbers to the sieve
			// number << 1 
			// 16 << 2 is same as 16 * 2 but by the article without speed effect is only the wtf syntax
			for (var i = number << 1; i <= primeNumberLimit; i += number) {
				// set true value to sive array
				// other possible way is to push value into the array directly and then check if ES5 method array.indexOf()
				// return non negative number. But this is much more faster solution.
				// http://jsperf.com/simple-app-sive-of-eratosthenes
				sieve[i] = true;
			}
		}
	}
	// return slice of primenumbers if no limit is set then slice gets as ending param length of the primes
	return primes.slice(offset, limit || primes.length);
};

// prime number test
exports.isPrime = function(number) {
	// shortcut
	if (number === 2) return true;
	// Number must be less then 2 and must be an integer
	if (number < 2 || number != Math.round(number)) return false;

	// Every interation from 2 must be to the square root of number. If divides number exactly, number cannot be prime.
	for (var i = 2, max = Math.sqrt(number); i <= max; i += 1) if (number % i == 0) return false;

	// Number is prime
	return true;
};