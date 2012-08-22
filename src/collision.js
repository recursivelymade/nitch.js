nitch.collision = {
	AABB: function(r1, r2) {
		var w = (r1.width + r2.width) / 2;
		var h = (r1.height + r2.height) / 2;
		var dx = (r1.x + r1.width / 2) - (r2.x + r2.width / 2);
		var dy = (r1.y + r1.height / 2) - (r2.y + r2.height / 2);
		
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