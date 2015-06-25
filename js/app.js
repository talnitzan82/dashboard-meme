var app = angular.module('myApp', ['proxies']);


app.controller('mainAppController',function ($scope, $http, $q, $location, proxy) {
    $scope.name = "Main app controller";
    $scope.proxy = proxy;
    $scope.tag = getQueryParams(location.search).tag;

    $scope.getCurrentTable = function() {
        var currentTime = new Date();
        var tableName = "data.Impression" + currentTime.getUTCDate() + (currentTime.getMonth() + 1) + "n";
        return tableName;
    };

    $scope.currentTable = $scope.getCurrentTable();

    $scope.getAllData = function(callback) {
        var tableName = $scope.currentTable;
        proxy.getAllData(tableName,$scope.tag)
            .then(function(data) {
                if (!$scope.data) {
                    $scope.data = {};
                }
                data.data[0].totalProfitDesktop = data.data[0].totalProfitDesktopAPNX*1 + data.data[0].totalProfitDesktopMM*1;
                data.data[0].totalProfitLastHourDesktop = data.data[0].totalProfitOneHourDesktopAPNX*1 + data.data[0].totalProfitOneHourDesktopMM*1;
                data.data[0].totalProfitMobile = data.data[0].totalProfitMobileAPNX*1 + data.data[0].totalProfitMobileMM*1;
                data.data[0].totalProfitLastHourMobile = data.data[0].totalProfitOneHourMobileAPNX*1 + data.data[0].totalProfitOneHourMobileMM*1;
                $scope.data = data.data;
            //    callback();
            });
    };

    $scope.init = function() {
        $scope.getAllData();
    }

});

