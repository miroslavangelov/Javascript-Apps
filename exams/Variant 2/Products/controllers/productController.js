'use strict';

var app = app || {};

app.productController = (function () {
	function ProductController(model, views) {
		this.model = model;
		this.views = views;
	}
	
	ProductController.prototype.loadAddProductView = function(selector) {
		return this.views.loadAddProduct(selector);
	}
	
	ProductController.prototype.loadProductView = function(selector, urlParams, action) {
		var data = urlParams.split("&");
		var outData = {
			id: data[0].split("id=")[1],
			name: data[1].split("name=")[1],
			category: data[2].split("category=")[1],
			price: data[3].split("price=")[1]
		}
		if (action === "delete") {
			return this.views.loadDeleteProduct(selector, outData);
		}
		else {
			return this.views.loadEditProduct(selector, outData);
		}
		
	}
	
	ProductController.prototype.listAllProducts = function(selector) {
		var _this = this;
		return _this.model.listAllProducts()
		.then(function(data) {
			var products = data.results;
			data.categories = [];
			var userId = sessionStorage["objectId"];
			products.forEach(function(product) {
				if (product.ACL[userId]) {
					product.showButtons = true;
				}
				if (data.categories.indexOf(product.category) < 0) {
					data.categories.push(product.category);
				}
				
            });
			return _this.views.loadListAllProducts(selector, data)
		}, function(error) {
			console.log(error)
		})
	}
	
	ProductController.prototype.addProduct = function(name, category, price) {
		return this.model.addProduct(name, category, price)
		.then(function(data) {
			window.location.replace("#/products/");
		}, function(error) {
			console.log(error)
		})
	}
	
	ProductController.prototype.editProduct = function(productId, name, category, price) {
		return this.model.editProduct(productId, name, category, price)
		.then(function(data) {
			window.location.replace("#/products/");
		}, function(error) {
			console.log(error)
		})
	}
	
	ProductController.prototype.deleteProduct = function(productId) {
		return this.model.deleteProduct(productId)
		.then(function(data) {
			window.location.replace("#/products/")
		}, function(error) {
			console.log(error)
		})
	}
	
	
	return {
		load: function(model, views) {
			return new ProductController(model, views)
		}
	}
})()

