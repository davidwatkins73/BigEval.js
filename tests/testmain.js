var BigEval = require("../BigEval.js");
var cf = require("./common.js");

/**
 * Basic tests - simple arithmetic
 */
exports.testBasics = {
	setUp: function(callback){
		this.b = new BigEval();
		callback();
	},

	test1: function(test){
		test.equals(this.b.exec("12+45*10"), 462);
		test.done();
	},

	test2: function(test){
		test.equals(this.b.exec("12/4 * 5 + 45*13 - 72 * 598"), -42456);
		test.done();
	},

	testMulDiv: function(test){
		test.equals(Math.round(this.b.exec("345 / 23 * 124 / 41 * 12")), 544);
		test.done();
	}
};


/**
 * test basic expressions
 * @param test
 */
exports.testBasic = function(test){
	var b = new BigEval();
	test.equals(b.exec("12+45*10"), 462);
	test.done();
};

/**
 * Batch auto tests
 * @param test
 */
exports.testBatch = function(test){
	cf.autoTest(test, new BigEval());
};



exports.testRoots = {
	testCustomRoot: function(test) {
		global.defaultRootFn = function() { return 11; };
		var b = new BigEval({customRootFn: function() { return 22; }});

		test.equals(22, b.exec("customRootFn()"));
		test.equals("ERROR", b.exec("defaultRootFn()"));
		test.done();
	},

	testDefaultRoot: function(test) {
		global.defaultRootFn = function() { return 11; };
		var b = new BigEval();
		test.equals(11, b.exec("defaultRootFn()"));
		test.done();
	},

	testPrototypeFn: function(test) {
		BigEval.prototype.pf = function() { return 2; };
		var b = new BigEval({ foo: () => 2 });
		test.equals(2, b.exec("pf()"));
		test.done();
	}
};
