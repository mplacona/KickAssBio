// force test environment
process.env.NODE_ENV = 'test';

// get the application
var app = require('../app');
var http = require('http');

// use zombie as a headless browser
var Browser = require('zombie');

// load nodejs assert method
var assert = require('assert');

describe('index page', function(){
	before(function() {
		this.server = http.createServer(app).listen(3100);
		this.browser = new Browser({ site: 'http://localhost:3100' });
	});	
	
	// load index page
	before(function(done) {
		this.browser.visit('/', done);
	})

	it('should show login form', function(){
		var browser = this.browser;
		assert.ok(browser.success);
		assert.equal(browser.text('h1'), 'Hello!');
		assert.equal(browser.text('form label'), 'Username Password');
		assert.equal(browser.text('form p.subheading'), 'Please Login To Your Account');
	});
	
	it('should refuse empty submissions', function(done){
		var browser = this.browser;
		browser.pressButton('Sign in').then(function(){
			assert.ok(browser.success);
			assert.equal(browser.text('h1'), 'Hello!');
			assert.equal(browser.text('form label[for=user-tf]'), 'This field is required.')
			assert.equal(browser.text('form label[for=pass-tf]'), 'This field is required.')
		}).then(done, done);	
	});
	
	it('should show signup page', function(done){
		var browser = this.browser;
		browser.clickLink('Create An Account').then(function(){
			assert.ok(browser.success);
		}).then(done, done);
	});
	
	
	/*
	it('should accept complete submissions', function(done){
		var browser = this.browser;
		browser.fill('user', 'John');
		browser.fill('pass', 'Doe');
		browser.pressButton('Sign in').then(function(){
			//assert.ok(browser.success);
			//assert.equal(browser.text('h1'), 'User logged in');
			assert.equal(res.statusCode, 404);
		}).then(done, done);
	});
	*/
	
	
	after(function(done){
		this.server.close(done);
	});
});