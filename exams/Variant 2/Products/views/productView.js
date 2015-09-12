'use strict';

var app = app || {};

app.productView = (function () {
	function ProductView() {
	}
	
	ProductView.prototype.loadListAllProducts = function(selector, data) {
			$.get("templates/products.html", function(template) {
				var template = template.documentElement.outerHTML;
				var outHtml = Mustache.render(template, data);
				$(selector).html(outHtml)
			})
			.then(function() {
				$("#filter").click(function() {
					var allProducts = $("#products-list").children();
					var searchedName = $("#search-bar").val();
					var minPrice = parseFloat($("#min-price").val());
					var maxPrice = parseFloat($("#max-price").val());
					var category = $("#category").val();
					var products = data.results;
					var regex = new RegExp("^" + searchedName);
					
					allProducts.each(function() {
						var self = $(this),
						productName = self.attr('data-name'),
						productPrice = parseFloat(self.attr('data-price')),
                        productCategory = self.attr('data-category');

						if (productPrice >= minPrice && productPrice <= maxPrice && regex.test(productName) && (category === "All" || category === productCategory)) {
							self.show();
						}
						
						else {
							self.hide();
						}
						
					})
				})
			})
			.then(function() {
				$("#clear-filters").click(function() {
					var allProducts = $("#products-list").children();
					allProducts.each(function() {
						var self = $(this);
						self.show();
					})
				})
			})
	}
	
	ProductView.prototype.loadAddProduct = function(selector) {
		$.get("templates/add-product.html", function(template) {
			var template = template.documentElement.outerHTML;
			var outHtml = Mustache.render(template);
			$(selector).html(outHtml)
		})
		.then(function() {
			$("#add-product-button").click(function() {
				var name = $("#name").val();
				var category = $("#category").val();
				var price = $("#price").val();
				var checkPrice = parseFloat(price);
				if (isNaN(checkPrice)) {
					throw new Error("Invalid price!")
				}
				$.sammy(function() {
					this.trigger('add-product', {name: name, category: category, price: price});
				});
				return false
			})
		})
	}
	
	ProductView.prototype.loadEditProduct = function(selector, data) {
		$.get("templates/edit-product.html", function(template) {
			var template = template.documentElement.outerHTML;
			var outHtml = Mustache.render(template, data);
			$(selector).html(outHtml)
		})
		.then(function() {
			$("#edit-product-button").click(function() {
				var name = $("#name").val();
				var category = $("#category").val();
				var price = $("#price").val();
				$.sammy(function() {
					this.trigger('edit-product', {id: data.id, name: name, category: category, price: price});
				});
				return false
			})
		})
	}
	
	ProductView.prototype.loadDeleteProduct = function(selector, data) {
		$.get("templates/delete-product.html", function(template) {
			var template = template.documentElement.outerHTML;
			var outHtml = Mustache.render(template, data);
			$(selector).html(outHtml)
		})
		.then(function() {
			$("#delete-product-button").click(function() {
				$.sammy(function() {
					this.trigger('delete-product', {id: data.id});
				});
				return false
			})
		})
	}
	
	return {
		load: function() {
			return new ProductView()
		}
	}
})()

