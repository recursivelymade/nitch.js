collisions = TestCase("collisions");

collisions.prototype.testMiss = function() {
	var miss = nitch.collision.AABB({
		width: 200,
		height: 100,
		x: 30,
		y: 50	
		}, {
		width: 100,
		height: 200,
		x: 800,
		y: 500
	});

	assertFalse(miss);
}

collisions.prototype.testCollide = function() {
	var collide = nitch.collision.AABB({
		width: 200,
		height: 100,
		x: 30,
		y: 50	
		}, {
		width: 100,
		height: 200,
		x: 25,
		y: 40
	});
	
	assertObject(collide);
	assertEquals('right', collide.dir);
	assertArray(collide.pv);
	assertEquals(95, collide.pv[0]);
	assertEquals(-110, collide.pv[1]);
}

collisions.prototype.testTouching = function() {
	var touch = nitch.collision.AABB({
		width: 200,
		height: 100,
		x: 30,
		y: 50	
		}, {
		width: 200,
		height: 100,
		x: 230,
		y: 150
	});
	
	assertObject(touch);
	assertEquals('bottom', touch.dir);
	assertArray(touch.pv);
	assertEquals(0, touch.pv[0]);
	assertEquals(0, touch.pv[1]);
}
