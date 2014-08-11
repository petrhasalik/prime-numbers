'use strict'
# this is a simple rewrite of Javascript code in server/libs/prime_numbers.js
angular.module 'sampleAppApp'
.filter 'toWords', ->
	vocab = 
		digits: ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
		tenToNineteen: ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen']
		tens: ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']
		thousands: ['','thousand','million', 'milliard','billion']
	(input) ->
		stringified = input.toString().replace /\s|,|\./g, ''
		len = stringified.length
		if (len > 15) then return 'a lot'
		characters = stringified.split ''
		str = ''
		sk = 0
		for i in [0...len] by 1
			if ((len - i) % 3 == 2)
				if (characters[i] == '1')
					str += vocab.tenToNineteen[Number(characters[i + 1])] + ' '
					_i++
				else if (characters[i] != '0')
					str += vocab.tens[characters[i] - 2] + ' ';
				sk = 1
			else if (characters[i] != '0')
				str += vocab.digits[characters[i]] + ' '
				if ((len - i) % 3 == 0) then str += 'hundred '
				sk = 1
			if ((len - i) % 3 == 1)
				if (sk) then str += vocab.thousands[(len - i - 1) / 3] + ' '
				sk = 0

		str.replace /\s+$/, ''