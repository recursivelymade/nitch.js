/**
 * @namespace nitch.xhr
 * @class
 * @description A basic XMLHttpRequest wrapper for basic ajaxian needs
 * @example var repoInfo = new nitch.xhr("https://api.github.com/orgs/twitter/repos");
 * @param {String} url The URL of where you want to send the request
 * @param {Object} [opts]
 * @param {String} [opts.method='get'] Method you want to send
 * @param {Boolean} [opts.async=true] Enables an asynchronous request.
 * @param {Function} [opts.callback] Fires callback on a successful 20X response
 * @param {Function} [opts.error] Fires a callback on a 400X or 500X response
 * @param {String} [opts.params] Additional query string parameters you would like to add
 * @param {Object} [opts.headers] Object to send additional HTTP headers
**/
nitch.xhr = function(url, opts) {
	this.opts = opts ? opts : {};
	var defaults = {
		method: 'get',
		async: true,
		callback: function() {},
		error: function() {},
		params: null
	}
	
	this.opts = _.defaults(opts, defaults);
	
	var that = this;
	var req = new XMLHttpRequest();
	var header;

	req.queryString = opts.params;
	req.open(opts.method, url, opts.async);

	// Set "X-Requested-With" header
	req.setRequestHeader('X-Requested-With','XMLHttpRequest');

	if (opts.method.toLowerCase() == 'post') {
		req.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	}

	for (header in opts.headers) {
		if (opts.headers.hasOwnProperty(header)) {
		  req.setRequestHeader(header, opts.headers[header]);
		}
	}

	req.handleResp = opts.callback;
	req.handleError = opts.error;
	
	hdl = function (){
		if(req.readyState == 4) {
			delete(that.xmlHttpRequest);
			if((/^[20]/).test(req.status)) {
				req.handleResp();
			}
			if((/^[45]/).test(req.status)) {
				req.handleError();
			}
		}
	}
	
	if(opts.async) {
		req.onreadystatechange = this.hdl;
		this.xmlHttpRequest = req;
	}
	
	req.send(opts.params);
	
	if(!opts.async) { 
		this.hdl();
	}

	return this;
}