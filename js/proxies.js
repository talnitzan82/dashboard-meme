(function (angular) {

    //// angularJS
    var mi = angular.module('proxies', []);

    mi.factory('proxy', proxyFactory);

    ///// JavaScript
    function proxyFactory($log, $http, $q) {

        return {
            getAllData: getAllData
        };

        function getAllData(table) {
            var defer = $q.defer();
            var url = 'server/getAllData.php?table=' + table;
            $http.post(url).
                success(function(data, status) {
                    defer.resolve(data);
                })
                .
                error(function(data, status) {
                    $scope.data.campProfits = data || "Request failed";
                    $scope.status = status;
                });
            return defer.promise;
        }

    }

}) (angular);