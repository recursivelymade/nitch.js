Maths = TestCase("Math");

Maths.prototype.testDeg2rad = function() {
	assertEquals(0, nitch.math.deg2rad(0));
	assertEquals(0.7853981633974483, nitch.math.deg2rad(45));
	assertEquals(1.5707963267948966, nitch.math.deg2rad(90));
	assertEquals(3.141592653589793, nitch.math.deg2rad(180));
	assertEquals(4.71238898038469, nitch.math.deg2rad(270));
	assertEquals(6.283185307179586, nitch.math.deg2rad(360));
	assertEquals(-6.283185307179586, nitch.math.deg2rad(-360));
	assertEquals(9.075712110370514, nitch.math.deg2rad(520));
	assertEquals(8.115781021773632, nitch.math.deg2rad("465"));
	assertNaN(nitch.math.deg2rad("q"));
};

Maths.prototype.testRad2deg = function() {
	assertEquals(0, nitch.math.rad2deg(0));
	assertEquals(45, nitch.math.rad2deg(0.7853981633974483));
	assertEquals(90, nitch.math.rad2deg(1.5707963267948966));
	assertEquals(180, nitch.math.rad2deg(3.141592653589793));
	assertEquals(270, nitch.math.rad2deg(4.71238898038469));
	assertEquals(360, nitch.math.rad2deg(6.283185307179586));
	assertEquals(-360, nitch.math.rad2deg(-6.283185307179586));
	assertEquals(520, nitch.math.rad2deg(9.075712110370514));
	assertEquals(465, nitch.math.rad2deg("8.115781021773632"));
	assertNaN(nitch.math.rad2deg("q"));
};

Maths.prototype.testWithin = function() {
	assertTrue(nitch.math.within(15,10,20));
	assertTrue(nitch.math.within(10,10,20));
	assertTrue(nitch.math.within(20,10,20));
	assertFalse(nitch.math.within(5,10,20));
	assertFalse(nitch.math.within(25,10,20));
	assertFalse(nitch.math.within(25,30,20));
}

Maths.prototype.testDistanceSquared = function() {
	assertEquals(180000, nitch.math.distanceSquared({x: 200, y:300}, {x:500,y:600}));
	assertEquals(180000, nitch.math.distanceSquared({x: "200", y:"300"}, {x:"500",y:"600"}));
	assertEquals(520000, nitch.math.distanceSquared({x: 200, y:300}, {x:-200,y:-300}));
	assertNaN(nitch.math.distanceSquared({x: "z", y:300}, {x:500,y:600}));
}

Maths.prototype.testDistance = function() {
	assertEquals(424.26406871192853, nitch.math.distance({x: 200, y:300}, {x:500,y:600}));
	assertEquals(0, nitch.math.distance({x: 200, y:300}, {x:200,y:300}));
	assertEquals(721.1102550927978, nitch.math.distance({x: 200, y:300}, {x:-200,y:-300}));
	assertNaN(nitch.math.distance({x: "z", y:300}, {x:500,y:600}));
}