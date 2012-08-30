/**
* @namespace nitch.collision
* @description Very basic and simple collision detection systems

* @name nitch.collision.AABB
* @method
* @description Tests if two objects are intersecting and returns an object with details if they are.
* @example 	var collide = nitch.collision.AABB({
		width: 200,
		height: 100,
		left: 30,
		top: 50	
		}, {
		width: 100,
		height: 200,
		left: 25,
		top: 40
	});
	// returns { dir:"right", pv: [95, 110] }
* @return object or false
**/
nitch.collision = {
	AABB: function(r1, r2) {
		var w = (parseInt(r1.width) + parseInt(r2.width)) / 2;
		var h = (parseInt(r1.height) + parseInt(r2.height)) / 2;
		var dx = (parseInt(r1.left) + parseInt(r1.width) / 2) - (parseInt(r2.left) + parseInt(r2.width) / 2);
		var dy = (parseInt(r1.top) + parseInt(r1.height) / 2) - (parseInt(r2.top) + parseInt(r2.height) / 2);
		
		if (Math.abs(dx) <= w && Math.abs(dy) <= h) {
			var wy = w * dy;
			var hx = h * dx;
			if (wy > hx) {
				if (wy > -hx) {
					dir = "top";
				} else {
					dir = "left";
				}
			} else {
				if (wy > -hx) {
					dir = "right";
				} else {
					dir = "bottom";
				}
			}
			var px = w - (dx < 0 ? -dx : dx);
			var py = h - (dy < 0 ? -dy : dy);
			return {
			  "dir": dir,
			  "pv": [(dx < 0 ? -px : px), (dy < 0 ? -py : py)]
			};
		}
		
		return false;
	}
}