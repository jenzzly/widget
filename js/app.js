var myApp = angular.module('myApp', []);

		myApp.service('AppService', function($http, $q) {

							var appService = this;
            
							appService.weather= function(zip,state) {

								var promise = $http.get('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22' + zip + '%2C%20'+ state +'%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys').then(
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
            $scope.state= 'VA';
            
            $scope.search = function() {

				var promise = AppService.weather($scope.zip,$scope.state);

				promise.then(function(data) {

					console.log(data);
					$scope.wh = data.query.results.channel;
				
				}, function(error) {
                    console.log(error);
					$scope.wh= "Error";
				});
                
            };

          });

