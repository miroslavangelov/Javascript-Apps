'use strict';

var app = app || {};

app.userView = (function () {
	function UserView() {
	}
	
	UserView.prototype.loadLoginView = function(selector) {
			$.get("templates/login.html", function(template) {
				var template = template.documentElement.outerHTML;
				var outHtml = Mustache.render(template);
				$(selector).html(outHtml)
			})
			.then(function() {
				$("#login-button").click(function() {
					var username = $("#username").val();
					var password = $("#password").val();
					$.sammy(function() {
						this.trigger('login', {username: username, password: password});
					});
					return false
				})
			})
	}
	
	UserView.prototype.loadWelcomeView = function(selector, data) {
			$.get("templates/home.html", function(template) {
				var template = template.documentElement.outerHTML;
				var outHtml = Mustache.render(template, data);
				$(selector).html(outHtml)
			})
	}
	
	UserView.prototype.loadRegisterView = function(selector) {
		$.get("templates/register.html", function(template) {
				var template = template.documentElement.outerHTML;
				var outHtml = Mustache.render(template);
				$(selector).html(outHtml)
		})
		.then(function() {
				$("#register-button").click(function() {
					var username = $("#username").val();
					var password = $("#password").val();
					var confirmPassword = $("#confirm-password").val();
					if (password !== confirmPassword) {
						throw new Error("Passwords must be identical!")
					}
					$.sammy(function() {
						this.trigger('register', {username: username, password: password});
					});
					return false
				})
			})
	}
	
	UserView.prototype.loadWelcomeGuest = function(selector) {
		$.get("templates/welcome-guest.html", function(template) {
				var template = template.documentElement.outerHTML;
				var outHtml = Mustache.render(template);
				$(selector).html(outHtml)
		})
	}
	
	return {
		load: function() {
			return new UserView()
		}
	}
})()

