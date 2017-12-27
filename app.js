var appFlickrAPI = angular.module('formFlickr', []);
appFlickrAPI.controller('FlickrController', ['$scope', '$http', function ($scope, $http) {
	$scope.showSelectedImage = false;
	
	$scope.master = {};
	$scope.images = {};

	$scope.search = function (searchCriteria) {
	if (searchCriteria.tags === undefined || searchCriteria.tags.trim() === "") {
	  searchCriteria.tags = null;
	  $scope.master = angular.copy(searchCriteria);
	  $scope.form.$submitted = true;
	  return false;
	}
	//$scope.form.tags.$setUntouched();
	$scope.form.tags.$setValidity();

	// URL for Flickr API
	var flickrAPI = "https://api.flickr.com/services/feeds/photos_public.gne";

	flickrAPI = flickrAPI + "?jsoncallback=JSON_CALLBACK"
	  + "&tags=" + encodeURIComponent($scope.searchCriteria.tags)
	  + "&tagmode=" + $scope.searchCriteria.mode
	  + "&format=json";

	// AJAX query to Flickr API
	$http.jsonp(flickrAPI)
	  .success(function (data, status, headers, config) {
	  $scope.images = data;
	  $scope.imagesStatus = status;

	})

	// handling error - if any
	  .error(function (data, status, headers, config) {
	  $scope.images = data;
	  $scope.imagesStatus = status;
	});

	// post-validation rest
	$scope.form.tags.$setValidity();
	};

	// reset form to initial state
	$scope.resetForm = function (form) {
		$scope.form.tags.$setValidity();
		$scope.images = {};
		$scope.searchCriteria = {};
		$scope.showSelectedImage = false;
	};

	// select an image when click on one
	$scope.clickAnImage = function (i) {
		 $scope.showSelectedImage = true;
		 $scope.title = i.title;
		 $scope.author = i.author;
		 $scope.tags = i.tags;
		 $scope.image = i.link;
	};
		
}]);