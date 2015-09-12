var app = app || {};

app.controller = (function() {
	function Controller(dataPersister) {
		this.persister = dataPersister;
	}
	Controller.prototype.load = function(selector) {
		var _this = this;
		this.atachEvents();
		this.persister.books.getAll(
			function(data) {
				_this.loadBooks(data);
			},
			function(error) {
				console.log(error);
			}
		)
	}
	function createBook(book) {
		var bookWrapper = $("<div>")
		$("<div />").append("Name: " + book.title).appendTo(bookWrapper);
		$("<div />").append("Author: " + book.author).appendTo(bookWrapper);
		var deleteButton = $("<button class='deleteBookBtn'>Delete Button</button>");
		deleteButton.attr("data-id", book.objectId);
		deleteButton.appendTo(bookWrapper)
		
		return bookWrapper;
	}
	Controller.prototype.loadBooks = function(data) {
		for (var i = 0; i < data.results.length; i++) {
			var book = data.results[i];
			var bookWrapper = createBook(book);
			$("#allBooks").append(bookWrapper);
		}
	}
	Controller.prototype.atachEvents = function() {
		var _this = this;
		$("#addBook").click(function(event) {
			var book = {
				title: $("#title").val(),
				author: $("#author").val()
			}
			_this.persister.books.add(book, 
				function addBookSuccessHandler(data) {
					var bookWrapper = createBook(data);
					$("#allBooks").append(bookWrapper);
				},
				function addBookErrorHandler(error) {
					console.log(error)
				}
			)
		})
		$("#allBooks").on("click", ".deleteBookBtn", function(event) {
			var id = $(this).attr("data-id")
			_this.persister.books.remove(id,
				function(data) {
					console.log(data)
				},
				function(error) {
					console.log(error)
				}
			)
		
		})
	}

	
	return {
		get: function(dataPersister) {
			return new Controller(dataPersister);
		}
	}
})()