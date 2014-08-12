// Define vocabulary
var vocab = {
	digits: ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'],
	tenToNineteen: ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'],
	tens: ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'],
	thousands: ['','thousand','million', 'milliard','billion']
};

exports.convert = function(number) {
	// convert the number to string and replace whitecharacters , and . character
	var stringified = number.toString().replace(/\s|,|\./g, '')
	// get length of the string
		len = stringified.length;
	// number is too big for the conversion
	if (len > 15) return 'a lot';
	// array of chars
	var characters = stringified.split(''),
	//output string
		str = '',
		sk = 0;
	// iterate through all characters of the number
	for (var i = 0; i < len; i++) {
		if ((len - i) % 3 === 2) {
			// is the first character one?
			if (characters[i] === '1') {
				str += vocab.tenToNineteen[Number(characters[i + 1])] + ' ';
				i++;
			} 
			else if (characters[i] !== '0') {
				str += vocab.tens[characters[i] - 2] + ' ';
			}
			sk = 1;
		} 
		else if (characters[i] !== '0') {
			str += vocab.digits[characters[i]] + ' ';
			if ((len - i) % 3 === 0) str += 'hundred ';
			sk = 1;
		}
		if ((len - i) % 3 === 1) {
			if (sk) str += vocab.thousands[(len - i - 1) / 3] + ' ';
			sk = 0;
		}
	}
	return str.replace(/\s+$/, '');
};