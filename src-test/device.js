device = TestCase("DeviceDetails");

device.prototype.TestDeviceType = function() {
	assertString(nitch.device.type());
}

device.prototype.TestDeviceFeatures = function() {
	nitch.device.ft();
	assertObject(nitch.device.features);
}

device.prototype.TestDeviceMediaQueries = function() {
	assertObject(nitch.device.mediaQueries);
}

