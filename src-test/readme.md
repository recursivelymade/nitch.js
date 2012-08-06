All the tests are written for testing under [JSTestDriver](http://code.google.com/p/js-test-driver/) with the [Code Coverage plugin](http://code.google.com/p/js-test-driver/wiki/CodeCoverage).

To run the tests you'll need to start the server on the command line
```
java -jar JsTestDriver-1.3.4.b.jar --port 9876
```

Point the browsers you want to test at http://localhost:9876

Then run the tests on the command line
```
java -jar JsTestDriver-1.3.4.b.jar --tests all
```