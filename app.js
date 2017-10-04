(function () {
  'use strict';

  var app = angular.module('examples', ['chart.js', 'ui.bootstrap']);

  app.config(function (ChartJsProvider) {
    ChartJsProvider.setOptions({
        colours: ['#46bfbd', '#4563bf', '#a145bf', '#bf4563'],
        responsive: true,
        animation: false,
        scaleOverride: true,
        scaleStartValue: 0,
        scaleStepWidth: 10,
        scaleSteps: 10,
        legendTemplate: ' '
    });
  });

  app.controller('BarCtrl', ['$scope', '$timeout', '$interval','$location','$http', function ($scope, $timeout, $interval, $location, $http) {

    $scope.options = { scaleShowVerticalLines: false };

    $scope.labels = [];

    $scope.data = [[]]
    
    var rawData = [];

    $interval(function(){
        $http({
            method: 'GET',
            url: '/version'
          })
          .then(
            function successCallback(response) {
                rawData.push(response.data.version);
             },
            function errorCallback(response) {
                rawData.push('error');
             }
        )
    },100)

    $interval(function () {
        if (rawData.length > 100) {
            rawData = rawData.splice(rawData.length-100,100);
        }
        var data = {}
        for (var i = 0; i < rawData.length; i++) {
            data[rawData[i]] = data[rawData[i]] ? data[rawData[i]]+1 : 1;
        }
        console.log('data',data);
        for (var k of Object.keys(data)) {
            var labelIndex = -1;
            for (var l = 0; l < $scope.labels.length; l++) {
                if ($scope.labels[l] == k) {
                    labelIndex = l;
                    break;
                }
            }
            if (labelIndex == -1) {
                labelIndex = $scope.labels.length;
                $scope.labels.push(k)
                var length = $scope.data.length;
                $scope.data[0].push(data[k]);
            } else {
                $scope.data[0][labelIndex] = data[k]
            }  
        }
        var spliced = false;
        do {
            spliced=false;
            for (var i = 0; i < $scope.labels.length; i++) {
                if (data[$scope.labels[i]] == undefined) {
                    $scope.data[0].splice(i,1);
                    $scope.labels.splice(i,1);
                    spliced=true;
                    break;
                }
            }
        } while (spliced);
    },1000)

  }]);

})();
