(function (angular) {

    //// angularJS
    var mi = angular.module('proxies', []);

    mi.factory('proxy', proxyFactory);

    ///// JavaScript
    function proxyFactory($log, $http, $q) {

        return {
            getCampProfits: getCampProfits,
            getCampProfitWithHours: getCampProfitWithHours,
            getCMProfits: getCMProfits,
            getCampProfitsInLastHour: getCampProfitsInLastHour,
            getTotalProfits: getTotalProfits
        };

        function getCampProfits(table,tag) {
            var defer = $q.defer();
            var url = 'server/getCampProfits.php?table=' + table + '&tag=' + tag;
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

        function getCampProfitsInLastHour() {
                    var defer = $q.defer();
                    var url = 'server/getProfitsInLastHour.php';
                    $http.post(url).
                        success(function(data, status) {
                            defer.resolve(data);
                        })
                        .
                        error(function(data, status) {
                            $scope.data = data || "Request failed";
                            $scope.status = status;
                        });
                    return defer.promise;
                }

        function getCampProfitWithHours(hours,table) {
            var defer = $q.defer();
            var url = 'server/getCampProfitsWithHours.php?hours=' + hours + '&table=' + table;
            $http.post(url).
                success(function(data, status) {
                    defer.resolve(data);
                })
                .
                error(function(data, status) {
                    $scope.data = data || "Request failed";
                    $scope.status = status;
                });
            return defer.promise;
        }

        function getCMProfits(table) {
                    var defer = $q.defer();
                    var url = 'server/getCMProfits.php?table=' + table;
                    $http.post(url).
                        success(function(data, status) {
                            defer.resolve(data);
                        })
                        .
                        error(function(data, status) {
                            $scope.data = data || "Request failed";
                            $scope.status = status;
                        });
                    return defer.promise;
                }

        function getTotalProfits(table,tag) {
            var defer = $q.defer();
            var url = 'server/getTotalProfits.php';
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