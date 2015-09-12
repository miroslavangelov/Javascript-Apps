var app = app || {};

app.model = (function() {
	function Model(rootUrl) {
		this.rootUrl = rootUrl;
		this.books = new Books(rootUrl);
	}
	var Books = (function() {
		function Books(rootUrl) {
			this.serviceUtl = rootUrl + 'Book/';
		}
		Books.prototype.getAll = function(success, error) {
			return ajaxRequester.get(this.serviceUtl, success, error)	
		}
		Books.prototype.add = function(book, success, error) {
			return ajaxRequester.post(this.serviceUtl, book, success, error)	
		}
		Books.prototype.remove = function(id, success, error) {
			return ajaxRequester.remove(this.serviceUtl + id, success, error)	
		}
		Books.prototype.put = function(id, success, error) {
			return ajaxRequester.put(his.serviceUtl + id, book, success, error)
		}
		return Books;
	})();

	return {
		get: function(rootUrl) {
			return new Model(rootUrl);
		}
		
	}
})()