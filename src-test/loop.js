loop = TestCase("Loop");

loop.prototype.testNoLoop = function() {
	assertException(function() { var loop = new nitch.loop(); }, "TypeError");
}

loop.prototype.testBasicLoop = function() {
	var loop = new nitch.loop(function(){ });
	assertFalse(loop.running);
	
	assertFunction(loop.start);
	loop.start();
	assertTrue(loop.running);
	
	assertFunction(loop.pause);
	loop.pause();
	assertFalse(loop.running);
	
	assertFunction(loop.resume);
	loop.resume();
	assertTrue(loop.running);
	
	assertFunction(loop.end);
	loop.end();
	assertFalse(loop.running);
}

loop.prototype.testLoopCallbacks = function() {
	var started = paused = resumed = ended = false;
	
	var loop = new nitch.loop(function(){ });
	assertFalse(started);
	assertFalse(paused);
	assertFalse(resumed);
	assertFalse(ended);
	
	loop.start(function(){ started = true; });
	assertTrue(started);
	
	loop.pause(function(){ paused = true; });
	assertTrue(paused);
	
	loop.resume(function(){ resumed = true; });
	assertTrue(resumed);
	
	loop.end(function(){ ended = true; });
	assertTrue(ended);
	
}

loop.prototype.testBrokenLoop = function() {
	var loop = new nitch.loop(function(){ });
	
	assertException(function() { loop.pause(); }, "TypeError");
	
	assertException(function() { loop.resume(); }, "TypeError");
	
	assertException(function() { loop.end(); }, "TypeError");

}