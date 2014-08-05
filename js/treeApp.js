var app = angular.module('treeApp', []);

app.directive('workBreakDownStructure', function(){

    var linkFn = function($scope, el, attributes){
        var treeData = {
            name:'Project',
            type:'project',
            children:[]
        }

        var size = {
            width:800,
            height:800
        }

        var tree = d3.layout.tree()
            .sort(null)
            .size([size.height, size.width - maxLabelLength*options.fontSize])
            .children(function(d)
            {
                return (!d.contents || d.contents.length === 0) ? null : d.contents;
            });

        var nodes = tree.nodes(treeData);
        var links = tree.links(nodes);

    }


    return {
        restrict:'E',
        link:linkFn
    }
});