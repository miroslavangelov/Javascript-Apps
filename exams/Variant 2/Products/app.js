var app = app || {};
(function() {
	var appId = "bkRBPoD4TdsPC5fl0Isi2kg1S275yIZCjXQyWNbt";
	var restAPI = "esVGUlabHnk7fg0k1AsnNkFEDCNKFffHrJhOoCR5";
	var baseUrl = "https://api.parse.com/1/";
	var headers = app.headers.load(appId, restAPI);
	var requester = app.requester.load();
	
	var userModel  = app.userModel.load(baseUrl, requester, headers);
	var productModel = app.productModel.load(baseUrl, requester, headers);
	
	var userView = app.userView.load();
	var productView = app.productView.load();
	
	var userController = app.userController.load(userModel, userView);
	var productController = app.productController.load(productModel, productView);

	app.router = Sammy(function() {
		var selector = "#main";
		this.before(function() {
			var userId = sessionStorage["objectId"];
			if (userId) {
				$("#logged").show();
				$("#not-logged").hide();
			}
			else {
				$("#logged").hide();
				$("#not-logged").show();
			}
		})
		this.before("#/home/", function() {
			var userId = sessionStorage["objectId"];
			if (!userId) {
				this.redirect("#/")
				return false
			}
		})
		this.before("#/products/(.*)", function() {
			var userId = sessionStorage["objectId"];
			if (!userId) {
				this.redirect("#/")
				return false
			}
		})
		this.get("#/login/", function() {
			userController.loadLoginView(selector)
		})
		this.get("#/home/", function() {
			userController.loadWelcomeView(selector)
		})
		this.get("#/register/", function() {
			userController.loadRegisterView(selector);
		})
		this.get("#/", function() {
			userController.loadWelcomeGuestView(selector);
		})
		this.get("#/logout/", function() {
			userController.logout();
		})
		this.get("#/products/", function() {
			productController.listAllProducts(selector);
		})
		this.get("#/products/add/", function() {
			productController.loadAddProductView(selector);
		})
		this.get("#/products/edit/:data/", function() {
			productController.loadProductView(selector, this.params["data"], "edit");
		})
		this.get("#/products/delete/:data/", function() {
			productController.loadProductView(selector, this.params["data"], "delete");
		})
		this.bind('login', function(e, data) {
            userController.login(data.username, data.password);
        });
		this.bind('add-product', function(e, data) {
            productController.addProduct(data.name, data.category, data.price);
        });
		this.bind('edit-product', function(e, data) {
            productController.editProduct(data.id, data.name, data.category, data.price);
        });
		this.bind('delete-product', function(e, data) {
            productController.deleteProduct(data.id);
        });
		this.bind('register', function(e, data) {
            userController.register(data.username, data.password);
        });
	})
	
	app.router.run("#/")
})();

