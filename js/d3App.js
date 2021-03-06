var app = angular.module('d3App', []);
app.directive('donutChart', function () {
    var linkFn = function ($scope, el, attributes) {

        var color = d3.scale.category10();
        var data = $scope.data;
        var width = 300;
        var height = 300;
        var min = Math.min(width, height);
        var svg = d3.select(el[0]).append('svg');
        var pie = d3.layout.pie().sort(null);
        var arc = d3.svg.arc()
            .outerRadius(min / 2 * 0.9)
            .innerRadius(min / 2 * 0.5);
        svg.attr({width: width, height: height});

        var g = svg.append('g')
// center the donut chart
            .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
        // add the <path>s for each arc slice
        g.selectAll('path').data(pie(data))
            .enter().append('path')
            .style('stroke', 'white')
            .attr('d', arc)
            .attr('fill', function (d, i) { return color(i) });


    }

    return {
        restrict: 'E',
        link: linkFn,
        transclude:false,
        scope: { data: '=' }
    }
})

app.directive('donutChartList', function(){
    var linkFn = function($scope, el, attributes){
        $scope.kids = [{name:'Manya', age:6, chartData:[8,3,7]}, {name:'Chaitanya', age:3, chartData:[2,5,9]}, {name:'Kavitha', age:23, chartData:[6,2,3]}]
        console.log(arguments);
    }

    return {
        restrict:'E',
        link:linkFn,
        templateUrl: 'templates/kids.html'
    }
})