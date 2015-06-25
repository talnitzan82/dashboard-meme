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

    $scope.getCampProfits = function(callback) {
        var tableName = $scope.currentTable;
        proxy.getCampProfits(tableName,$scope.tag)
            .then(function(data) {
                if (!$scope.data) {
                    $scope.data = {};
                }
                $scope.data.campProfits = data.data;
                callback();
            });
    };

    $scope.getCampProfitsInLastHour = function(callback) {
        var tableName = $scope.currentTable;
        proxy.getCampProfitsInLastHour()
            .then(function(data) {
                if (!$scope.data) {
                    $scope.data = {};
                }
                $scope.data.campProfitsLastHour = data.data[0].totalProfitOneHour;
                $scope.data.costOneHour = data.data[0].costOneHour;
                callback();
            });
    };

    $scope.getCampProfitWithHours = function(callback,hours) {
        var tableName = $scope.currentTable;
        proxy.getCampProfitWithHours(hours,tableName)
           .then(function(data) {
               $scope.data = data.data;
               callback();
       });
    };


    $scope.getCMProfits = function(callback) {
            var tableName = $scope.currentTable;
            proxy.getCMProfits(tableName)
                .then(function(data) {
                    $scope.data = data.data;
                    callback();
                });
        };

    $scope.getTotalProfits = function(callback) {
        var tableName = $scope.currentTable;
        proxy.getTotalProfits(tableName,$scope.tag)
            .then(function(data) {
                if (!$scope.data) {
                    $scope.data = {};
                }
                $scope.data.totalProfits = data;
                callback();
          });
    };
});

app.controller('overallCtrl', function($scope) {
    console.log('starting overallCtrl controller');
    $scope.name = "overallCtrl controller";
    $scope.title = 'overallCtrl title';
    $scope.totals = {};

    $scope.init = function()
    {
        $scope.getTotalProfits($scope.continueOverAll);
    }

    $scope.continueOverAll = function() {
        $scope.calculateTotal();
    }

    $scope.calculateTotal = function() {
    };

});

app.controller('profitsInLastHourCtrl', function($scope) {
    console.log('starting profitsInLastHourCtrl controller');
    $scope.name = "profitsInLastHourCtrl controller";
    $scope.title = 'profitsInLastHourCtrl title';
    $scope.totals = {};

    $scope.init = function()
    {
        $scope.getCampProfitsInLastHour($scope.continueOverAll)
    }

    $scope.continueOverAll = function() {
        $scope.calculateTotal();
    }

    $scope.calculateTotal = function() {
    };

});

app.controller('overallWithHoursCtrl', function($scope) {
    console.log('starting overallWithHoursCtrl controller');
    $scope.name = "overallWithHoursCtrl controller";
    $scope.title = 'overallWithHoursCtrl title';
    $scope.totals = {};

    $scope.init = function()
    {
        $scope.getCampProfitWithHours($scope.continueOverAll)
    }

    $scope.continueOverAll = function() {
        $scope.calculateTotal();
    }

    $scope.calculateTotal = function() {
        $scope.totals.profit = 0;
        var profit;
        for (var i in $scope.data) {
            profit = Number((($scope.data[i].profit)*1).toFixed(2))
            $scope.totals.profit += profit;
        }
    };

});

app.controller('totalProfitCtrl', function($scope) {
    console.log('starting totalProfitCtrl controller');
    $scope.name = "totalProfitCtrl controller";
    $scope.title = 'totalProfitCtrl title';
    $scope.totals = {};

    $scope.init = function()
    {
        $scope.getTotalProfits($scope.continueOverAll)
    }

    $scope.continueOverAll = function() {
        $scope.calculateTotal();
    }

    $scope.calculateTotal = function() {
        $scope.totals.profit = 0;
        var profit;
        var i = $scope.data.length
        while (i--) {
             profit = Number((($scope.data[i].profit)*1).toFixed(2))
                        if (Math.abs(profit) < 1 ) {
                            $scope.data.splice(i, 1);
                        } else {
                            $scope.totals.profit += profit;
                        }
        }
    };

});
