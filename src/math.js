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
 * @see <a href="http://baagoe.org/en/wiki/Better_random_numbers_for_javascript">Better random numbers for javascript</a>
**/
	Alea: function() {
		return (function(args) {
		var s0 = 0;
		var s1 = 0;
		var s2 = 0;
		var c = 1;

		if (args.length === 0) {
			args = [+new Date()];
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
 * @see <a href="http://baagoe.org/en/wiki/Better_random_numbers_for_javascript">Better random numbers for javascript</a>
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
	},

/**
 * @name nitch.math.deg2rad
 * @method
 * @description Converts degrees to the <a href="http://en.wikipedia.org/wiki/Radian">radian</a> number. 
 * @param {Numeric} degrees The degrees you want to convert
 * @example nitch.math.deg2rad(45); // returns 0.7853981633974483
 *  nitch.math.deg2rad(90); // returns 1.5707963267948966
 * @returns {Numeric}
**/
	deg2rad: function(degrees) {
		return degrees * (Math.PI/180);
	},

/**
 * @name nitch.math.rad2deg
 * @method
 * @description Converts the <a href="http://en.wikipedia.org/wiki/Radian">radian</a> number to the equivalent number in degrees. 
 * @param {Numeric} radian The radian you want to convert
 * @example nitch.math.rad2deg(0.785398163397448309615660845819875721); // returns 45
 *  nitch.math.rad2deg(1.57079632679489661923132169163975144); // returns 90
 * @returns {Numeric}
**/
	rad2deg: function(radian) {
		return radian * (180/Math.PI);
	},
	
/**
 * @name nitch.math.distance
 * @method
 * @description Works out the distance between two elements based on their coordinates
 * @param {Object} obj1 The first element
 * @param {Numeric} obj1.x The object's x
 * @param {Numeric} obj1.y The object's y
 * @param {Object} obj2 The second element
 * @param {Numeric} obj2.x The object's x
 * @param {Numeric} obj2.y The object's y
 * @returns {Numeric}
**/
	distance: function(obj1, obj2) {
		var squared = nitch.math.distanceSquared(obj1,obj2);
		return Math.sqrt(parseFloat(squared));
	},
	
/**
 * @name nitch.math.distanceSquared
 * @method
 * @description Works out the distance between two elements based on their coordinates
 * @param {Object} obj1 The first element
 * @param {Numeric} obj1.x The object's x
 * @param {Numeric} obj1.y The object's y
 * @param {Object} obj2 The second element
 * @param {Numeric} obj2.x The object's x
 * @param {Numeric} obj2.y The object's y
 * @returns {Numeric}
**/
	distanceSquared: function(obj1, obj2) {
		return (obj1.x - obj2.x) * (obj1.x - obj2.x) + (obj1.y - obj2.y) * (obj1.y - obj2.y);
	},
	
/**
 * @name nitch.math.within
 * @method
 * @description Because <a href="http://www.twitter.com/mcvicar">@mcvicar</a> is lazy. This checks that the value is within a max and min value. 
 * @param {Numeric} radian The radian you want to convert
 * @example nitch.math.within(10, 5, 30); // returns true
 *  nitch.math.within(1, 5, 30); // returns false
 * @returns {Boolean}
**/
	within: function (value, min, max) {
		return (value >= min && value <= max);
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
};

/** 
 * @name nitch.math.rng.random
 * @method
 * @description Random number generator
**/
nitch.math.rng.random = function() {
	if (!nitch.math.rng.generator) nitch.math.rng.generator = nitch.math.Alea();
	return nitch.math.rng.generator();
};