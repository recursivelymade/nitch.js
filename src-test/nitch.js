NitchCore = TestCase("NitchCore");

NitchCore.prototype.testAvailable = function() {
	assertObject(nitch);
}

NitchCore.prototype.testReady = function() {
	assertFunction(nitch.ready);
}

NitchCore.prototype.testDom = function() {
	assertFunction(nitch.dom);
}

NitchCore.prototype.testNodeList = function() {
	assertFunction(nitch.nodeList);
}