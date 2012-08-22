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
