var app = angular.module('treeApp', []);

app.directive('workStream', function(){
    var tree = d3.layout.tree()
        .nodeSize([0, 20]);

    var diagonal = d3.svg.diagonal()
        .projection(function(d) { return [d.y, d.x]; });

    var margin = {top: 30, right: 20, bottom: 30, left: 20},
        width = 960 - margin.left - margin.right,
        barHeight = 20,
        barMarginBottom = 10,
        barWidth = 200;

    var i = 0,
        duration = 400,
        root;

    function color(d) {
        return d._children ? "#3182bd" : d.children ? "#c6dbef" : "#fd8d3c";
    }



    var linkFn = function($scope, el, attributes){
        var treeData = $scope.treeData;
        var nodes = tree.nodes(treeData);
        var height = Math.max(500, nodes.length * barHeight + margin.top + margin.bottom);

        var svg = d3.select(el[0]).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr('height', height)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // Compute the "layout".
        nodes.forEach(function(n, i) {
            n.x = i * (barHeight + barMarginBottom) ;
        });

        var node = svg.selectAll("g.node")
            .data(nodes, function(d) { return d.id || (d.id = ++i); });

        var nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
            //.style("opacity", 1e-6);

        // Enter any new nodes at the parent's previous position.
        nodeEnter.append("rect")
            .attr("y", -barHeight / 2)
            .attr("height", barHeight)
            .attr("width", barWidth)
            .style("fill", color)
            //.on("click", click);

        nodeEnter.append("text")
            .attr("dy", 3.5)
            .attr("dx", 5.5)
            .text(function(d) { return d.name; });

    }
    return {
        restrict:'E',
        link:linkFn
    }
})


app.directive('workBreakDownStructure', function () {

    var linkFn = function ($scope, el, attributes) {
        var treeData = {
            name: 'Project',
            type: 'project',
            children: [
                {
                    name: 'workStream1',
                    type: 'workStream',
                    children: [
                        {
                            name: 'phase1',
                            type: 'phase',
                            children: [
                                {
                                    name: 'activity1',
                                    type: 'activity'
                                }
                            ]
                        },
                        {
                            name: 'phase2',
                            type: 'phase',
                            children: [
                                {
                                    name: 'activity1',
                                    type: 'activity'
                                }
                            ]
                        },
                        {
                            name: 'phase3',
                            type: 'phase',
                            children: [
                                {
                                    name: 'activity1',
                                    type: 'activity'
                                }
                            ]
                        },
                        {
                            name: 'phase4',
                            type: 'phase',
                            children: [
                                {
                                    name: 'activity1',
                                    type: 'activity'
                                }
                            ]
                        },
                        {
                            name: 'phase5',
                            type: 'phase',
                            children: [
                                {
                                    name: 'activity1',
                                    type: 'activity'
                                }
                            ]
                        }
                    ]
                },
                {
                    name: 'workStream2',
                    type: 'workStream',
                    children: [
                        {
                            name: 'phase1',
                            type: 'phase',
                            children: [
                                {
                                    name: 'activity1',
                                    type: 'activity'
                                }
                            ]
                        }]
                },
                {
                    name: 'workStream3',
                    type: 'workStream',
                    children: [
                        {
                            name: 'phase1',
                            type: 'phase',
                            children: [
                                {
                                    name: 'activity1',
                                    type: 'activity'
                                }
                            ]
                        }]
                }
            ]
        }

        var size = {
            width: 800,
            height: 800
        }

        var options = {
            fontSize: 13,
            nodeRadius: 10
        }

        var maxLabelLength = 200;

        var tree = d3.layout.tree()
            .sort(null)
            .nodeSize([100, 30])
            //.size([size.height, size.width - maxLabelLength * options.fontSize])
            .children(function (d) {
                return (!d.children || d.children.length === 0) ? null : d.children;
            });

        var link = d3.svg.diagonal()
            .projection(function (d) {
                return [ d.x, d.y];
            });




        var svg = d3.select(el[0]).append('svg');
        svg.attr('width', size.width).attr('height', size.height);


        var workStream = svg.selectAll('g.work-stream')
            .data(treeData.children)
            .enter()
            .append('g')
            .attr('class', 'work-stream')
            .attr('transform', function(d, i){
                return "translate(" + (i*200)+ ",0)";
            })


        var links = workStream.selectAll("path.link")
            .data(function(d){
                var nodes = tree.nodes(d);
                var links = tree.links(nodes);
                return links;
            })
            .enter()
            .append("svg:path")
            .attr("class", "link")
            .attr("d", link);



    /*
        var layoutRoot = svg.append("svg:g")
            .attr("class", "container")
            .attr("transform", "translate(" + size.width / 2 + ",0)");

        var link = d3.svg.diagonal()
            .projection(function (d) {
                return [ d.x, d.y];
            });

        layoutRoot.selectAll("path.link")
            .data(links)
            .enter()
            .append("svg:path")
            .attr("class", "link")
            .attr("d", link);


        var nodeGroup = layoutRoot.selectAll("g.node")
            .data(nodes)
            .enter()
            .append("svg:g")
            .attr("class", "node")
            .attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            });

        nodeGroup.append("svg:circle")
            .attr("class", "node-dot")
            .attr("r", options.nodeRadius);

        nodeGroup.append("svg:text")
            .attr("text-anchor", function (d) {
                return d.children ? "end" : "start";
            })
            .attr("dx", function (d) {
                var gap = 2 * options.nodeRadius;
                return d.children ? -gap : gap;
            })
            .attr("dy", 3)
            .text(function (d) {
                return d.name;
            });
        */


    }


    return {
        restrict: 'E',
        link: linkFn
    }
});