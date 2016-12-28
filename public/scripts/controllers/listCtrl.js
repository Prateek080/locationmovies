app.controller('listCtrl', ['$window', '$q', '$interval', '$http', '$scope', '$rootScope', '$state', '$stateParams', 'MODULE_CONFIG',
    function($window, $q, $interval, $http, $scope, $rootScope, $state, $stateParams, MODULE_CONFIG) {

        var url = 'http://localhost:3000';
        $scope.loadTags = function(data) {
            if (data) {
                var deferred = $q.defer();
                console.log(data);
                $http.get(url + '/getmovies/' + data).then(function(response) {
                    if (response) {
                        console.log(response.data);
                        deferred.resolve(response.data);
                    }
                });
                return deferred.promise;
            }
        }

        $scope.calldata = function($tag) {
            console.log($tag);
            $scope.tags = [];
            $http.get(url + '/moviebyId/' + $tag.name).then(function(response) {
                if (response.data) {
                    $scope.locations=response.data.data;
                }
            });
        }
    }
]);
