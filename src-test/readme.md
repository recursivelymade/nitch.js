All the tests are written for testing under [JSTestDriver](http://code.google.com/p/js-test-driver/) with the [Code Coverage plugin](http://code.google.com/p/js-test-driver/wiki/CodeCoverage).

To run the tests you'll need to start the server on the command line
```
java -jar JsTestDriver-1.3.4.b.jar --port 4224
```

Point the browsers you want to test at http://localhost:4224

Then run the tests on the command line
```
java -jar ../../build-tools/JsTestDriver/JsTestDriver-1.3.4.b.jar --tests all --config nitch.test
```