var ajaxRequester = (function() {
	var makeRequest = function makeRequest(method, url, data, success, error) {
		return $.ajax({
			method: method,
			headers: {
				"X-Parse-Application-Id": 'HiTBbzrkhwbh8yx5ibZk5kx5P8lIqwvOMf0z0Wxv',
				"X-Parse-REST-API-Key": 'pn2SxvzjJeDTFMsqHhdbozZI2AqyFYfsQoXt0GCV'
			},
			url: url,
			contentType: "application/json",
			data: JSON.stringify(data),
			success: success,
			error: error
		});	
	}
	function makeGetRequest(url, success, error) {
		makeRequest("GET", url, null, success, error);
	}
	function makePostRequest(url, data, success, error) {
		makeRequest("POST", url, data, success, error);
	}
	function makePutRequest(url, data, success, error) {
		makeRequest("PUT", url, data, success, error);
	}
	function makeDeleteRequest(url, success, error) {
		makeRequest("DELETE", url, null, success, error);
	}
	return {
		get: makeGetRequest,
		post: makePostRequest,
		put: makePutRequest,
		remove: makeDeleteRequest
	}
})()