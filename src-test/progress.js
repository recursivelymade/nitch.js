ProgressTest = TestCase("ProgressTest");

ProgressTest.prototype.testNoElem = function() {
	assertException(function() { progress = new nitch.progress(); }, "TypeError");
};

ProgressTest.prototype.testNoOpts = function() {
	assertException(function() { progress = new nitch.progress("#loader"); }, "TypeError");
};

ProgressTest.prototype.testProgress = function() {
	completed = false;
	/*:DOC += <div id="loader"></div> */
	var progress = new nitch.progress("#loader", {defaultLoaded: 0, assets: {'audio': 50, 'images':25, 'somethingElse': 25 }, onComplete: function() { completed = true; } });

	assertNotNull(document.getElementById('loader'));
	assertNotNull(document.getElementById('nitch-progress'));
	assertEquals(100, progress.total);
	assertEquals(0, progress.totalLoaded);
	assertFunction(progress.loaded);
	
	progress.loaded('audio');
	assertEquals(100, progress.total);
	assertEquals(50, progress.totalLoaded);
	assertFalse(completed);	
	
	// Check that it won't update total if already loaded
	progress.loaded('audio');
	assertEquals(100, progress.total);
	assertEquals(50, progress.totalLoaded);
	assertFalse(completed);	
	
	// Check that it won't update if no asset set
	progress.loaded('fake');
	assertEquals(100, progress.total);
	assertEquals(50, progress.totalLoaded);
	assertFalse(completed);
	
	progress.loaded('images');
	assertEquals(100, progress.total);
	assertEquals(75, progress.totalLoaded);
	assertFalse(completed);
	
	progress.loaded('somethingElse');
	assertEquals(100, progress.total);
	assertEquals(100, progress.totalLoaded);
	assertTrue(completed);
};

ProgressTest.prototype.failProgress = function() {
	completed = false;
	/*:DOC += <div id="loader"></div> */
	var progress = new nitch.progress("#loader", {defaultLoaded: 0, assets: {'audio': 50, 'images':25, 'somethingElse': 25 }, onComplete: function() { completed = true; } });
	
	assertNotNull(document.getElementById('loader'));
	assertNotNull(document.getElementById('nitch-progress'));
	assertEquals(100, progress.total);
	assertEquals(0, progress.totalLoaded);
	
	assertFunction(progress.failed);
	progress.failed('failed loading');
	assertEquals(100, progress.total);
	assertEquals(100, progress.totalLoaded);
	assertFalse(completed);	
	assertNotNull(document.getElementById('loader'));
	assertNull(document.getElementById('nitch-progress'));
	assertNotNull(document.getElementById('nitch-progress-error'));
};