var app = app || {};
app.userController = (function(){
	function UserController(model, views) {
		this.model = model;
		this.viewBag = views;
	}
	
	UserController.prototype.loadLoginPage = function(selector) {
		this.viewBag.loginView.loadLoginView(selector, this)
	}
	
	UserController.prototype.loadRegisterPage = function(selector) {
		this.viewBag.registerView.loadRegisterView(selector, this)
	}
	
	UserController.prototype.loadEditProfilePage = function(selector) {
		var data = {
			username: sessionStorage["username"],
			fullName: sessionStorage["fullName"]
		}
		this.viewBag.editProfileView.loadEditProfileView(selector, this, data)
	}
	
	UserController.prototype.login = function(username, password) {
		return this.model.login(username, password)
		.then(function(loginData){
			setUserToStorage(loginData);
			window.location.replace("#/home/");
		}, function(error){
			console.log(error)
		})
		//.done();
	}
	
	UserController.prototype.register = function(username, password, fullName) {
		return this.model.register(username, password, fullName)
		.then(function(registerData) {
			var data = {
				username: username,
				fullName: fullName,
				objectId: registerData.objectId,
				sessionToken: registerData.sessionToken
			}
			setUserToStorage(data);
			window.location.replace("#/home/");
		})
	}
	
	UserController.prototype.logout = function() {
		return this.model.logout()
		.then(function() {
			clearUserFromStorage();
			window.location.replace("#/");
		}, function(error) {
			console.log(error)
		})
		//.done()
	}
	
	UserController.prototype.editProfile = function(username, password, fullName) {
		var userId = sessionStorage["objectId"];
		return this.model.editProfile(userId, username, password, fullName)
		.then(function(data) {
			if (username !== "") {
				sessionStorage["username"] = username;
			}
			if (fullName !== "") {
				sessionStorage["fullName"] = fullName;
			}
			window.location.replace("#/home/");
		})
	}
	
	function setUserToStorage(data) {
			sessionStorage["username"] = data.username;
			sessionStorage["fullName"] = data.fullName;
			sessionStorage["objectId"] = data.objectId;
			sessionStorage["sessionToken"] = data.sessionToken;
	}
	function clearUserFromStorage() {
		delete	sessionStorage["username"]
		delete	sessionStorage["fullName"]
		delete	sessionStorage["objectId"]
		delete	sessionStorage["sessionToken"]
	}
	
	return {
		load: function(model, views) {
			return new UserController(model, views);
		}
	}
})()