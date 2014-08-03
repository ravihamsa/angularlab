var app = angular.module('d3App', []);
app.directive('donutChart', function(){

    var linkFn = function($scope, el, attributes){
        $scope.kids = [{name:'Manya', age:6}, {name:'Chaitanya', age:3}, {name:'Kavitha', age:23}]
        console.log(arguments);
    }

    return {
        restrict:'E',
        link:linkFn,
        templateUrl : 'templates/kids.html'
    }
})