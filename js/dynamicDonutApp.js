var  app = angular.module('dynamicDonutApp', []);

app.directive('donutChart', function () {

    var linkFn = function ($scope, el, attributes) {

        var color = d3.scale.category10();
        var data = $scope.data;
        var width = 300;
        var height = 300;
        var min = Math.min(width, height);
        var svg = d3.select(el[0]).append('svg');
        var pie = d3.layout.pie().sort(null);
        pie.value(function(d){return d.value});
        var arc = d3.svg.arc()
            .outerRadius(min / 2 * 0.9)
            .innerRadius(min / 2 * 0.5);
        svg.attr({width: width, height: height});

        var g = svg.append('g')
// center the donut chart
            .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
        // add the <path>s for each arc slice
        var arcs = g.selectAll('path').data(pie(data))
            .enter().append('path')
            .style('stroke', 'white')
            .attr('d', arc)
            .attr('fill', function (d, i) { return color(i) });




        $scope.$watch('data', function(){
            console.log(JSON.stringify(data));
            arcs = arcs.data(pie(data))
                .attr('d', arc)
                .attr('fill', function (d, i) { return color(i) });

            arcs.enter().append('path')
                .style('stroke', 'white')
                .attr('d', arc)
                .attr('fill', function (d, i) { return color(i) });

            arcs.exit().remove();
        }, true);
    }

    return {
        restrict: 'E',
        link: linkFn,
        transclude:false,
        scope: { data: '=' }
    }
})