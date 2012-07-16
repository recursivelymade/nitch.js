nitchUtil = TestCase("NitchUtil");

nitchUtil.prototype.apply = function() {
	var obj = nitch.util.apply({foo: "hello", bar: "world"}, {bar: "everyone"});
	assertObject(obj);
	assertEquals("hello", obj.foo);
	assertEquals("everyone", obj.bar);
}

nitchUtil.prototype.applyFail = function() {
	var obj = nitch.util.apply({foo: "hello", bar: "world"}, "everyone");
	assertObject(obj);
	assertEquals("hello", obj.foo);
	assertEquals("world", obj.bar);
}

nitchUtil.prototype.delay = function() {
	delayed = false;
	nitch.util.delay(10, function() { delayed = true; });
	assertTrue(delayed);
}