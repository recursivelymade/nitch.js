/**
 * @name nitch.statemachine
 * @class
 * @description provides a finite state machine for your game. Inspired by <a href="https://github.com/jakesgordon/javascript-state-machine">Jake Gordon's State Machine</a>
**/
nitch.statemachine = function(opts) {

    this.defaults = {
		results: {
			SUCCEEDED: 1, // the event transitioned successfully from one state to another
			NOTRANSITION: 2, // the event was successfull but no state transition was necessary
			CANCELLED: 3, // the event was cancelled by the caller in a beforeEvent callback
			ASYNC: 4 // the event is asynchronous and the caller is in control of when the transition occurs
		},

		errors: {
			INVALID_TRANSITION: 100, // caller tried to fire an event that was innapropriate in the current state
			PENDING_TRANSITION: 200, // caller tried to fire an event while an async transition was still pending
			INVALID_CALLBACK:   300 // caller provided callback function threw an exception
		},

		WILDCARD: '*',
		ASYNC: 'async'
	}

	var initialState   = (typeof opts.initialState == 'string') ? { state: opts.initialState } : opts.initialState; // allow for a simple string, or an object with { state: 'foo', event: 'setup', defer: true|false }
	var fsm       = {};
	var events    = opts.events || [];
	var callbacks = opts.callbacks || {};
	var map       = {};

    nitch.statemachine.prototype.doCallback = function(fsm, func, name, from, to, args) {
      if (func) {
        try {
          return func.apply(fsm, [name, from, to].concat(args));
        }
        catch(e) {
          return fsm.error(name, from, to, args, this.defaults.errors.INVALID_CALLBACK, "an exception occurred in a caller-provided callback function", e);
        }
      }
    },

    nitch.statemachine.prototype.beforeEvent = function(fsm, name, from, to, args) { return this.doCallback(fsm, fsm['onbefore' + name],                     name, from, to, args); },
    nitch.statemachine.prototype.afterEvent = function(fsm, name, from, to, args) { return this.doCallback(fsm, fsm['onafter'  + name] || fsm['on' + name], name, from, to, args); },
    nitch.statemachine.prototype.leaveState = function(fsm, name, from, to, args) { return this.doCallback(fsm, fsm['onleave'  + from],                     name, from, to, args); },
    nitch.statemachine.prototype.enterState = function(fsm, name, from, to, args) { return this.doCallback(fsm, fsm['onenter'  + to]   || fsm['on' + to],   name, from, to, args); },
    nitch.statemachine.prototype.changeState = function(fsm, name, from, to, args) { return this.doCallback(fsm, fsm['onchangestate'],                       name, from, to, args); },


    nitch.statemachine.prototype.buildEvent = function(name, map, that) {
		return function() {
			var from  = this.current;
			var to    = map[from] || map[that.defaults.WILDCARD] || from;
			var args  = Array.prototype.slice.call(arguments); // turn arguments into pure array

			if (this.transition) {
				return this.error(name, from, to, args, that.defaults.errors.PENDING_TRANSITION, "event " + name + " inappropriate because previous transition did not complete");
			}
			
			if (this.cannot(name)) {
				return this.error(name, from, to, args, that.defaults.errors.INVALID_TRANSITION, "event " + name + " inappropriate in current state " + this.current);
			}

			if (false === that.beforeEvent(this, name, from, to, args)) {
				return that.defaults.results.CANCELLED;
			}

			if (from === to) {
			  that.afterEvent(this, name, from, to, args);
			  return that.defaults.results.NOTRANSITION;
			}

			// prepare a transition method for use EITHER lower down, or by caller if they want an async transition (indicated by an ASYNC return value from leaveState)
			var fsm = this;
			
			this.transition = function() {
				fsm.transition = null; // this method should only ever be called once
				fsm.current = to;
				that.enterState( fsm, name, from, to, args);
				that.changeState(fsm, name, from, to, args);
				that.afterEvent( fsm, name, from, to, args);
			};
			
			this.transition.cancel = function() { // provide a way for caller to cancel async transition if desired (issue #22)
				fsm.transition = null;
				that.afterEvent(fsm, name, from, to, args);
			}

			var leave = that.leaveState(this, name, from, to, args);
		
			if (false === leave) {
				this.transition = null;
				return that.defaults.results.CANCELLED;
			} else if ("async" === leave) {
				return that.defaults.ASYNC;
			} else {
				if (this.transition) {
					this.transition(); // in case user manually called transition() but forgot to return ASYNC
					return that.defaults.results.SUCCEEDED;
				}
			}
		};
    }
	
	var add = function(e) {
		var from = (e.from instanceof Array) ? e.from : (e.from ? [e.from] : [that.defaults.WILDCARD]); // allow 'wildcard' transition if 'from' is not specified
		map[e.name] = map[e.name] || {};
	
		for (var n = 0 ; n < from.length ; n++) {
			map[e.name][from[n]] = e.to || from[n]; // allow no-op transition if 'to' is not specified
		}
	};

	if (opts.initialState) {
		opts.initialState.event = opts.initialState.event || 'startup';
		add({ name: opts.initialState.event, from: 'none', to: opts.initialState.state });
	}

	for(var n = 0 ; n < events.length ; n++) {
		add(events[n]);
	}
	
	var that = this;
	
	for(var name in map) {
		if (map.hasOwnProperty(name)) {
			fsm[name] = this.buildEvent(name, map[name], that);
		}
	}

	for(var name in callbacks) {
		if (callbacks.hasOwnProperty(name)) {
			fsm[name] = callbacks[name]
		}
	}

	fsm.current = 'none';
	fsm.is = function(state) { 
		return this.current == state; 
	};
	fsm.can = function(event) { 
		return !this.transition && (map[event].hasOwnProperty(this.current) || map[event].hasOwnProperty(that.defaults.WILDCARD)); 
	}
	fsm.cannot = function(event) { 
		return !this.can(event); 
	};
	fsm.error = opts.error || function(name, from, to, args, error, msg, e) { throw e || msg; };

    if (opts.initialState && !opts.initialState.defer) {
		fsm[opts.initialState.event]();
		return fsm;
	}
};