'use strict';

var app = app || {};

app.productModel = (function () {
	function ProductModel(baseUrl, requester, headers) {
		this.serviceUrl = baseUrl + "classes/Product/";
		this.requester = requester;
		this.headers = headers;
	}
	
	ProductModel.prototype.listAllProducts = function() {
		return this.requester.get(this.serviceUrl, this.headers.getHeaders())
	}
	
	ProductModel.prototype.addProduct = function(name, category, price) {
		var userId = sessionStorage["objectId"];
		var data = {
			name: name,
			category: category,
			price: price,
			ACL: {}
		}
		data.ACL[userId] = {"write":true,"read":true};
		data.ACL['*'] = {"read": true};
		return this.requester.post(this.serviceUrl, this.headers.getHeaders(), data)
	}
	
	ProductModel.prototype.editProduct = function(productId, name, category, price) {
		var data = {
			name: name,
			category: category,
			price: price
		}
		return this.requester.put(this.serviceUrl + productId, this.headers.getHeaders(), data)
	}
	
	ProductModel.prototype.deleteProduct = function(productId) {
		return this.requester.remove(this.serviceUrl + productId, this.headers.getHeaders())
	}
	
	return {
		load: function(baseUrl, requester, headers) {
			return new ProductModel(baseUrl, requester, headers)
		}
	}
})()

