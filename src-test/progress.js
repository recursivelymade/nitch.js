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
//	assertClassName("progress", "div");
//	assertClassName("bar", "div");
	assertEquals(100, progress.total);
	assertEquals(0, progress.totalLoaded);
	
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
}