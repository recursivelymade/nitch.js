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
	var sm = new nitch.statemachine({
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
	var sm = new nitch.statemachine({
	  initial: 'green',
	  events: [
		{ name: 'warn',  from: 'green',  to: 'yellow' },
		{ name: 'panic', from: 'yellow', to: 'red'    },
		{ name: 'calm',  from: 'red',    to: 'yellow' },
		{ name: 'clear', from: 'yellow', to: 'green'  }
	]});
	
	assertTrue(sm.can('warn'));
	assertEquals('green', sm.current);
	assertFalse(sm.can('panic'));
	assertTrue(sm.cannot('calm'));
	assertFalse(sm.can('clear'));
}

stateMachine.prototype.testMoveStates = function() {
	var sm = new nitch.statemachine({
	  initial: 'green',
	  events: [
		{ name: 'warn',  from: 'green',  to: 'yellow' },
		{ name: 'panic', from: 'yellow', to: 'red'    },
		{ name: 'calm',  from: 'red',    to: 'yellow' },
		{ name: 'clear', from: 'yellow', to: 'green'  }
	]});
	
	sm.warn();
	assertEquals('yellow', sm.current);
	assertTrue(sm.is('yellow'));
	
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
	
	var sm = new nitch.statemachine({
	  initial: 'green',
	  events: [
		{ name: 'warn',  from: 'green',  to: 'yellow' },
		{ name: 'panic', from: 'yellow', to: 'red'    },
		{ name: 'calm',  from: 'red',    to: 'yellow' },
		{ name: 'clear', from: 'yellow', to: 'green'  }
	  ],
	  callbacks: {
	  	onChangeState: function(event,from,to) { changestate = event + ' from ' + from + ' to ' + to; },
		onBeforewarn: function() { onbefore = true; },
		onLeaveyellow: function() { onleave = true; },
		onEnteryellow: function() { onenter = true; },
		onAfterwarn: function() { onafter = true; }
	  }
	});

	assertEquals('startup from none to green', changestate);	
	assertEquals('green', sm.current);
	assertFalse(onbefore);
	assertFalse(onenter);
	assertFalse(onleave);
	assertFalse(onafter);
	
	sm.warn();
	assertEquals('warn from green to yellow', changestate);
	assertTrue(onbefore);
	assertTrue(onenter);
	sm.panic();
	assertTrue(onleave);
	assertTrue(onafter);
	
}