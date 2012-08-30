collisions = TestCase("collisions");

collisions.prototype.testMiss = function() {
	var miss = nitch.collision.AABB({
		width: 200,
		height: 100,
		left: 30,
		top: 50	
		}, {
		width: 100,
		height: 200,
		left: 800,
		top: 500
	});

	assertFalse(miss);
}

collisions.prototype.testCollide = function() {
	var collide = nitch.collision.AABB({
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
		left: 30,
		top: 50	
		}, {
		width: 200,
		height: 100,
		left: 230,
		top: 150
	});
	
	assertObject(touch);
	assertEquals('bottom', touch.dir);
	assertArray(touch.pv);
	assertEquals(0, touch.pv[0]);
	assertEquals(0, touch.pv[1]);
}
