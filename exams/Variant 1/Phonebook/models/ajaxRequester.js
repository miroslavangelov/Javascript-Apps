'use strict';

var app = app || {};

app.requester = (function () {

	function makeRequest(method, headers, url, data) {
		var deffer = Q.defer();
		$.ajax({
			url: url,
			method: method,
			contentType: 'application/json',
			data: JSON.stringify(data),
			headers: headers,
			success: function(data) {
				deffer.resolve(data);
			},
			error: function(error) {
				deffer.reject(error);
			}
		});
			return deffer.promise;
		
	}
	function Requester() {
	}
	Requester.prototype.get = function(url, headers) {
		return makeRequest('GET', headers, url);
	}
	Requester.prototype.post = function (url, headers, data) {
        return makeRequest('POST', headers, url, data);
    };
	Requester.prototype.put = function (url, headers, data) {
        return makeRequest('PUT', headers, url, data);
    };
	Requester.prototype.remove = function (url, headers) {
        return makeRequest('DELETE', headers, url);
    };


    return {
        load: function () {
            return new Requester();
        }
	}
}());