/** 
 * @namespace nitch.math
 * @description Useful helpers for Math related stuff
**/
nitch.math = {
/** 
 * @name nitch.math.rng
 * @method
 * @description Random number generator
**/
	rng: function() {
	},
	
	/**
	 * @name nitch.math.Alea
	 * @method
	 * @author Johannes Baagøe <baagoe@baagoe.com>, 2010
	 * @see http://baagoe.org/en/wiki/Better_random_numbers_for_javascript
	**/
	Alea: function() {
		return (function(args) {
		var s0 = 0;
		var s1 = 0;
		var s2 = 0;
		var c = 1;

		if (args.length == 0) {
			args = [+new Date];
		}
		var mash = nitch.math.Mash();
		s0 = mash(' ');
		s1 = mash(' ');
		s2 = mash(' ');

		for (var i = 0; i < args.length; i++) {
			s0 -= mash(args[i]);
			if (s0 < 0) {
				s0 += 1;
			}
			s1 -= mash(args[i]);
			if (s1 < 0) {
				s1 += 1;
			}
			s2 -= mash(args[i]);
			if (s2 < 0) {
				s2 += 1;
			}
		}
		mash = null;

		var random = function() {
			var t = 2091639 * s0 + c * 2.3283064365386963e-10; // 2^-32
			s0 = s1;
			s1 = s2;
			return s2 = t - (c = t | 0);
		};
		random.uint32 = function() {
			return random() * 0x100000000; // 2^32
		};
		random.fract53 = function() {
			return random() + 
			(random() * 0x200000 | 0) * 1.1102230246251565e-16; // 2^-53
		};
		random.version = 'Alea 0.9';
		random.args = args;
		return random;
		} (Array.prototype.slice.call(arguments)));
	},
	
	/**
	 * @name nitch.math.Mash
	 * @method
	 * @author Johannes Baagøe <baagoe@baagoe.com>, 2010
	 * @see http://baagoe.org/en/wiki/Better_random_numbers_for_javascript
	**/
	Mash: function() {
		var n = 0xefc8249d;

		var mash = function(data) {
		data = data.toString();
		for (var i = 0; i < data.length; i++) {
			n += data.charCodeAt(i);
			var h = 0.02519603282416938 * n;
			n = h >>> 0;
			h -= n;
			h *= n;
			n = h >>> 0;
			h -= n;
			n += h * 0x100000000; // 2^32
		}
		return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
		};

		mash.version = 'Mash 0.9';
		return mash;
	}
},
	/** 
	 * @namespace nitch.array
	 * @description Useful helpers for math related array manipulations
	**/
nitch.array =  {
	/** 
	 * @namesapce nitch.array.shuffle
	 * @method
	 * @description Shuffle an array. 
	 * @see http://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_.22inside-out.22_algorithm
	 * @param {Array} array
	 * @param {Object} random Optional RNG. Defaults to Math.
	 * @return {Array} The original array, shuffled.
	 **/
	shuffle: function(array, rng) {
		var i = array.length, j, swap;
		if (!rng) rng = Math;
		while (--i) {
			j = rng.random() * (i + 1) | 0;
			swap = array[i];
			array[i] = array[j];
			array[j] = swap;
		}
		return array;
	},

	/** 
	 * @name nitch.array.pushRand
	 * @method
	 * @description Insert a value into an array at a random index. The element 
		previously at that index will be pushed back onto the end. 
	 * @see http://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
	 * @param {Array} object to shuffle.
	 * @param {Mixed} value to insert.
	 * @param {Object} optional RNG. Defaults to Math.
	 * @return {Number} The new length of the array.
	**/
	pushRand: function (array, value, rng) {
		var j = (rng || Math).random() * (array.length + 1) | 0;
		array.push(array[j]);
		array[j] = value;
		return array.length;
	}
}

/** 
 * @name nitch.math.rng.random
 * @method
 * @description Random number generator
**/
nitch.math.rng.random = function() {
	if (!nitch.math.rng.generator) nitch.math.rng.generator = nitch.math.Alea();
	return nitch.math.rng.generator();
}