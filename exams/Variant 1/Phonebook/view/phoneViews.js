var app = app || {};

app.phoneViews = (function() {
		function PhoneViews() {
			this.listPhones = {
				loadPhonesView: loadPhonesView
			}
			this.addPhone = {
				addPhoneView: addPhoneView
			}
			this.editPhone = {
				editPhoneView: editPhoneView
			}
			this.deletePhone = {
				deletePhoneView: deletePhoneView
			}
		}
	
		function loadPhonesView(selector, data) {

			$.get("templates/phone-book.html", function(template) {
				var template = template.documentElement.outerHTML;
				var outHtml = Mustache.render(template, data);
				$(selector).html(outHtml);
			})
		}
		
		function addPhoneView(selector, controller) {
			$.get("templates/add-phone.html", function(template) {
				var template = template.documentElement.outerHTML;
				var outHtml = Mustache.render(template);
				$(selector).html(outHtml);
			})
			.then(function() {
				$("#addPhone").click(function() {
					var person = $("#personName").val();
					var phoneNumber = $("#phoneNumber").val();
					return controller.addPhone(person, phoneNumber)
				})
			})
		}
		
		function editPhoneView(selector, controller, data) {
			$.get("templates/edit-phone.html", function(template) {
				var template = template.documentElement.outerHTML;
				var outHtml = Mustache.render(template, data);
				$(selector).html(outHtml);
			})
			.then(function() {
				$("#editPhone").click(function() {
					var person = $("#personName").val();
					var phoneNumber = $("#phoneNumber").val();
					return controller.editPhone(data.id, person, phoneNumber)
				})
			})
		}
		
		function deletePhoneView(selector, controller, data) {
			$.get("templates/delete-phone.html", function(template) {
				var template = template.documentElement.outerHTML;
				var outHtml = Mustache.render(template, data);
				$(selector).html(outHtml);
			})
			.then(function() {
				$("#deleteButton").click(function() {
					var person = $("#personName").val();
					var phoneNumber = $("#phoneNumber").val();
					return controller.deletePhone(data.id)
				})
			})
		}

	return {
		load: function() {
			return new PhoneViews()
		}
	}
})()