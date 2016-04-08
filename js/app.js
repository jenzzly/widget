var myApp = angular.module('myApp', []);

		myApp.service('AppService', function($http, $q) {

							var appService = this;
            
							appService.weather= function(zip) {

								var promise = $http.get('https://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20weather.forecast%20WHERE%20woeid%3D%22' + zip + '%22&format=json&diagnostics=true&callback=').then(
												function(success) {
													console.log(success.data);
													return success.data;
												}, function(error) {
													console.log(error);
													return $q.reject(error);
												});

								return promise;
							};
      
						});


        myApp.controller('weatherCtrl', function($scope,AppService){

            $scope.zip= '22030';
            
            $scope.search = function() {

				var promise = AppService.weather($scope.zip);

				promise.then(function(data) {

					console.log(data);
					$scope.wh = data.query.results.channel;
				
				}, function(error) {
                    console.log(error);
					$scope.wh= "Error";
				});
                
            };

          });
