stateMachine = TestCase("StateMachineBasics");

stateMachine.prototype.testNoState = function() {
	sm = new nitch.statemachine({});
	assertUndefined(sm.current);
}


stateMachine.prototype.testCurrentState = function() {
	sm = new nitch.statemachine({ initial: 'green' });
	
	assertEquals('green', sm.current);
}

stateMachine.prototype.testAvailableEvents = function() {
	sm = new nitch.statemachine({
	  initial: 'green',
	  events: [
		{ name: 'warn',  from: 'green',  to: 'yellow' },
		{ name: 'panic', from: 'yellow', to: 'red'    },
		{ name: 'calm',  from: 'red',    to: 'yellow' },
		{ name: 'clear', from: 'yellow', to: 'green'  }
	]});
	
	assertFunction(sm.can);
	assertFunction(sm.cannot);
	
	assertFunction(sm.warn);
	assertFunction(sm.panic);
	assertFunction(sm.calm);
	assertFunction(sm.clear);
}

stateMachine.prototype.testCanFunctions = function() {
	sm = new nitch.statemachine({
	  initial: 'green',
	  events: [
		{ name: 'warn',  from: 'green',  to: 'yellow' },
		{ name: 'panic', from: 'yellow', to: 'red'    },
		{ name: 'calm',  from: 'red',    to: 'yellow' },
		{ name: 'clear', from: 'yellow', to: 'green'  }
	]});
	
	assertTrue(sm.can('warn'));
	assertEquals("should NOT be able to panic from green state", sm.cannot('panic'));
	assertEquals("should NOT be able to clam from green state", sm.cannot('calm'));
	assertEquals("should NOT be able to clear from green state", sm.can('clear'));
}

stateMachine.prototype.testMoveStates = function() {
	sm = new nitch.statemachine({
	  initial: 'green',
	  events: [
		{ name: 'warn',  from: 'green',  to: 'yellow' },
		{ name: 'panic', from: 'yellow', to: 'red'    },
		{ name: 'calm',  from: 'red',    to: 'yellow' },
		{ name: 'clear', from: 'yellow', to: 'green'  }
	]});
	
	sm.warn();
	assertEquals('yellow', sm.current);
	
	sm.panic();
	assertEquals('red', sm.current);
	
	sm.calm();
	assertEquals('yellow', sm.current);
	
	sm.clear();
	assertEquals('green', sm.current);
}



stateMachine.prototype.testOnStates = function() {
	var changestate = false;
	var onbefore = false;
	var onleave = false; 
	var onenter = false;
	var onafter = false;
	
	sm = new nitch.statemachine({
	  initial: 'green',
	  events: [
		{ name: 'warn',  from: 'green',  to: 'yellow' },
		{ name: 'panic', from: 'yellow', to: 'red'    },
		{ name: 'calm',  from: 'red',    to: 'yellow' },
		{ name: 'clear', from: 'yellow', to: 'green'  }
	  ],
	  callbacks: {
	  	onchangestate: function(event,from,to) { changestate = event + ' from ' + from + ' to ' + to; },
		onbeforeyellow: function() { onbefore = true; },
		onleaveyellow: function() { onleave = true; },
		onenteryellow: function() { onenter = true; },
		onafteryellow: function() { onafter = true; }
	  }
	});

	assertEquals('startup from none to green', changestate);	
	assertEquals('green', sm.current);
	assertFalse(onbefore);
	assertFalse(onleave);
	assertFalse(onenter);
	assertFalse(onafter);
	
	sm.warn();
	assertEquals('warn from green to yellow', changestate);
	assertTrue(onbefore);
	assertTrue(onleave);
	assertTrue(onenter);
	assertTrue(onafter);
	
}