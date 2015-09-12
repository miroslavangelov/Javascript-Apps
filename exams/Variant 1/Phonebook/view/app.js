var app = app || {};
(function() {
	var appId = "CvuyGSn1go6l8egwSoKxEkr5pXjzqPQuAABaapMa",
	restAPI = "oKagRsTdJqRakofEXpEga3wCWV118wLBJ8bnoPCH",
	baseUrl = "https://api.parse.com/1/";
	var headers = app.headers.load(appId, restAPI);
	var requester = app.requester.load();
	var userModel = app.userModel.load(baseUrl, requester, headers);
	var phoneModel = app.phoneModel.load(baseUrl, requester, headers);
	
	var homeViews = app.homeViews.load();
	var userViews = app.userViews.load();
	var phoneViews = app.phoneViews.load();
	
	var userController = app.userController.load(userModel, userViews);
	var phoneController = app.phoneController.load(phoneModel, phoneViews);
	var homeController = app.homeController.load(homeViews);
	
	
	app.router = Sammy(function() {
		var selector = "#wrapper";
		
		this.before(function() {
			var userId = sessionStorage["objectId"];
			if (userId) {
				$("#menu").show();
			}
			else {
				$("#menu").hide();
			}
		})
		this.before("#/home/", function() {
			var userId = sessionStorage["objectId"];
			if (!userId) {
				this.redirect("#/")
				return false
			}
		})
		this.before("#/phones/(.*)", function() {
			var userId = sessionStorage["objectId"];
			if (!userId) {
				this.redirect("#/")
				return false
			}
		})
		this.before("#/profile/(.*)", function() {
			var userId = sessionStorage["objectId"];
			if (!userId) {
				this.redirect("#/")
				return false
			}
		})
		this.before("#/logout/(.*)", function() {
			var userId = sessionStorage["objectId"];
			if (!userId) {
				this.redirect("#/")
				return false
			}
		})
		
		this.get("#/", function() {
			homeController.welcomeScreen(selector)
		})
		this.get("#/login/", function() {
			userController.loadLoginPage(selector)
		})
		this.get("#/register/", function() {
			userController.loadRegisterPage(selector)
		})
		this.get("#/profile/edit/", function() {
			userController.loadEditProfilePage(selector)
		})
		this.get("#/home/", function() {
			homeController.homeScreen(selector)
		})
		this.get("#/logout/", function() {
			userController.logout();
		})
		this.get("#/phones/", function() {
			phoneController.listAllPhones(selector);
		})
		this.get("#/phones/add/", function() {
			phoneController.loadAddPhone(selector);
		})
		this.get("#/phones/edit/:data/", function() {
			phoneController.loadPhoneView(selector, this.params["data"], "edit");
		})
		this.get("#/phones/delete/:data/", function() {
			phoneController.loadPhoneView(selector, this.params["data"], "delete");
		})

	})
	app.router.run("#/")
	

})()