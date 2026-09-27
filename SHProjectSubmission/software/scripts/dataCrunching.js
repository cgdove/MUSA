var nodes = []; //global array variable where the loaded nodes are stored
var links = []; //global array variable where the loaded links are stored

var musaDataFilePath = "../data/musaData.json";

//takes the loaded data, uses it to get the corresponding nodes and links and then draws the corresponding force directed graph and timeline
function initializeData(error, data) {
    nodes = createNodes(data); //obtains an array of nodes from the json data

    crossFilteredData = crossfilter(nodes); //create a crossfilter that may be used to process the nodes data

    links = createCategoryEdges(nodes); //create the links that correspond to the nodes

    initializeGraph(nodes, links); //draw the force directed graph that corresponds to the nodes and links
    initializeSidebar(); //draw the sidebar
    drawTimeline2(); //draw the timeline that will filter the nodes of the graph
    drawPieChart(); //draw the pie chart
}


//reloads the content of the nodes and links arrays and redraws the graph correspondingly
function reloadData(error, data, currentVal) {
    switch (currentVal) {
        case "category":
            nodes = createNodes(musaDataFilePath);
            links = createCategoryEdges(nodes);
            break;
    }
    reloadGraph(nodes, links);
}

//creates an array of node objects from a JSON string
function createNodes(data) {
    var loadedNodes;
    loadedNodes = JSON.parse(JSON.stringify(data));
    return loadedNodes;
}

//determines and creates the links between nodes, storing the links in an array
function createCategoryEdges(node) {
    var rootNodeIndex = 5; //the index of the node that is the root node
    var links = [];
    var numberOfNodes = nodes.length;
    var start = 1;
    for (var count = 1; count < numberOfNodes; count++) { // go through all the nodes
        for (var i = start; i < numberOfNodes; i++) // go through all the nodes again
        {
            var newLink = {
                "source": i,
                "target": count,
                "sourceIndex": 1,
                "targetIndex": count,
                "isRootLink": false,
                "linkTypes": [],
                "linkStrength": 0
            }; //initially all connections are drawn to node 0
            if (count == rootNodeIndex) {
                newLink.isRootLink = true;
            }
            if (nodes[i].object_category.valueOf() == nodes[count].object_category.valueOf()) { //only push a link to the array if the nodes have matching categories
                newLink.linkStrength++;
                newLink.linkTypes.push("Object Category");
            }
            if (nodes[i].production_place.valueOf() == nodes[count].production_place.valueOf()) { //only push a link to the array if the nodes have matching categories
                newLink.linkStrength++;
                newLink.linkTypes.push("Production Place");
            }
            if (nodes[i].production_date.valueOf() == nodes[count].production_date.valueOf()) { //only push a link to the array if the nodes have matching categories
                newLink.linkStrength++;
                newLink.linkTypes.push("Production Place");
            }
            links.push(newLink); //push the new link to the links array
        }
        start = start + 1;
    }
    return links; // return the array of links based on object categories
}