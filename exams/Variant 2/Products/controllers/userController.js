'use strict';

var app = app || {};

app.userController = (function () {
	function UserController(model, views) {
		this.model = model;
		this.views = views;
	}
	
	UserController.prototype.loadLoginView = function(selector) {
		return this.views.loadLoginView(selector);
	}
	
	UserController.prototype.loadWelcomeView = function(selector) {
		var data = {
			username: sessionStorage["username"]
		}
		return this.views.loadWelcomeView(selector, data);
	}
	
	UserController.prototype.loadRegisterView = function(selector) {
		return this.views.loadRegisterView(selector);
	}
	
	UserController.prototype.loadWelcomeGuestView = function(selector) {
		return this.views.loadWelcomeGuest(selector);
	}
	
	UserController.prototype.login = function(username, password) {
		return this.model.login(username, password)
		.then(function(loginData) {
			setSessionStorage(loginData);
			window.location.replace("#/home/");
		}, function(error) {
			console.log(error)
		})
	}
	
	UserController.prototype.register = function(username, password) {
		return this.model.register(username, password)
		.then(function(registerData) {
			var data = {
				username: username,
				objectId: registerData.objectId,
				sessionToken: registerData.sessionToken
			}
			setSessionStorage(data);
			window.location.replace("#/home/");
		}, function(error) {
			console.log(error)
		})
	}
	
	UserController.prototype.logout = function() {
		return this.model.logout()
		.then(function() {
			clearSessionStorage();
			window.location.replace("#/")
		}, function(error) {
			console.log(error)
		})
	}
	
	function setSessionStorage(data) {
		sessionStorage["username"] = data.username;
		sessionStorage["objectId"] = data.objectId;
		sessionStorage["sessionToken"] = data.sessionToken;
	}
	function clearSessionStorage(data) {
		delete	sessionStorage["username"]
		delete	sessionStorage["objectId"]
		delete	sessionStorage["sessionToken"]
	}
	return {
		load: function(model, views) {
			return new UserController(model, views)
		}
	}
})()

