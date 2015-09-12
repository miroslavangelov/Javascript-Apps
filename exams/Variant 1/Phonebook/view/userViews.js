var app = app || {};

app.userViews = (function() {
	function UserViews() {
		this.loginView = {
			loadLoginView: loadLoginView
		}
		this.registerView = {
			loadRegisterView: loadRegisterView
		}
		this.editProfileView = {
			loadEditProfileView: loadEditProfileView
		}
	}
	
		function loadLoginView(selector, controller) {
			$.get("templates/login.html", function(template) {
				var template = template.documentElement.outerHTML;
				var outHtml = Mustache.render(template);
				$(selector).html(outHtml)
				
			}).then(function() {
				$("#loginButton").click(function() {
					var username = $("#username").val();
					var password = $("#password").val();
					return controller.login(username, password)
				})
			})
		}
		function loadRegisterView(selector, controller) {
			$.get("templates/register.html", function(template) {
				var template = template.documentElement.outerHTML;
				var outHtml = Mustache.render(template);
				$(selector).html(outHtml)
			})
			.then(function() {
				$("#registerButton").click(function() {
					var username = $("#username").val();
					var password = $("#password").val();
					var fullName = $("#fullName").val();
					return controller.register(username, password, fullName)
				})
			})
		}
		
		function loadEditProfileView(selector, controller, data) {
			$.get("templates/edit-profile.html", function(template) {
				var template = template.documentElement.outerHTML;
				var outHtml = Mustache.render(template, data);
				$(selector).html(outHtml)
				
			}).then(function() {
				$("#editProfileButton").click(function() {
					var username = $("#username").val();
					var password = $("#password").val();
					var fullName = $("#fullName").val();
					return controller.editProfile(username, password, fullName)
				})
			})
		}

	return {
		load: function() {
			return new UserViews()
		}
	}
})()