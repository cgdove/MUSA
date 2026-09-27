/*
THE CODE IN THIS FILE CORRESPONDS TO THE DRAWING OF THE FORCE DIRECTED GRAPH
*/
//the following global variables keep track of the node the is selected as the root node at the given moment
var selected = "";
var selectedCircle;
var selectedImage;
var selectedSVG;
var selectedText;

var rootNodeObjectNumber;
var selectedObjectNumber;

//the following global variables keep track of the node that was previously selected as the root node
var previousCircle;
var previousImage;
var previousSVG;
var previousText;

//the radius of a node circle
var radius = 10; //before expansion
var radius_max = 100; //after expansion

var expandedCircle;
var expandedImage;
var expandedSVG;

//the dimensions of the force layout calculated from the dimensions of the window
var forceLayoutWidth = 0.70 * windowWidth;
var forceLayoutHeight = 0.68 * windowHeight;

var svgWidth = 150;
var circleRadius = forceLayoutHeight / 35; //The size of the nodes scales to this variable
var selectedCircleRadius = forceLayoutHeight / 3;
var svgWidth = circleRadius * 2;
var svgHeight = circleRadius * 2;

var maxRadius = 12,
    padding = 1.5, // separation between same-color nodes
    clusterPadding = 6; // separation between different-color nodes;

var strokeWidth = 3;

var force;
var svg;

//draws the graph for the first time given the nodes and links arrays
function initializeGraph(nodes, links) {

    var color = d3.scale.category10();

    createForceLayout();

    //make the initial tooltip for link type
    //this is not made visible until later
    var div2 = d3.select("body").append("div")
        .attr("id", "div2")
        .attr("class", "tooltip")
        .style("opacity", 0);

    var link = svg.selectAll(".link") //add a line to the force layout for each link
        .data(links)
        .enter().append("line")
        .attr("class", "link")
        .style("stroke-width", function(d) {
            return d.linkStrength * 3
        })
        .style("stroke", function(d) {
            if (d.isRootLink == true) {
                return "#ff9933";
            } else if (d.isRootLink == false) {
                return "lightgrey";
            }
        })
        .on("mouseover", function(d) {
            var linkTooltipText = "";

            var arrayIndex = 0;
            for (arrayIndex = 0; arrayIndex < d.linkTypes.length; arrayIndex++) { //add some text for every link type that exists for the current link in the iteration
                linkTooltipText += "<p>" + d.linkTypes[arrayIndex] + "</p>";
            };

            div2.transition() //create a tooltip for the linkType of the link
                .duration(200)
                .style("opacity", .9);
            div2.html(linkTooltipText) //the tooltip contains the artefact description
                .style("left", function(e) {
                    if (!d.isSelected) {
                        return (d.source.x - circleRadius) + "px";
                    } else {
                        return (d.source.x - selectedCircleRadius) + "px";
                    }
                })
                .style("top", function(e) {
                    if (!d.isSelected) {
                        return (d.source.y - circleRadius) + "px";
                    } else {
                        return (d.source.y - selectedCircleRadius) + "px";
                    }
                })
                .style("width", "180px")
                .style("height", "auto")
                .style("font-size", "20px");

        });

    //create circles that correspond to each node datapoint
    var graphicsElements = createNodeGraphics(div2);

    d3.selectAll("rect").moveToFront();
    d3.selectAll("text").moveToFront();

    graphicsElements[0].append("title")
        .text(function(d) {
            return d.title;
        });

    force.on("tick", function(e) { //update the positions of the nodes and links within the force layout on every tick
        link.attr("x1", function(d) {
                return d.source.x + circleRadius;
            }) //the (+circleRadius) aligns the links with the nodes
            .attr("y1", function(d) {
                return d.source.y + circleRadius;
            })
            .attr("x2", function(d) {
                return d.target.x + circleRadius;
            })
            .attr("y2", function(d) {
                return d.target.y + circleRadius;
            });

        graphicsElements[0].attr("x", function(d) {
                if (d.object_number != rootNodeObjectNumber) {
                    return d.x = Math.max(circleRadius, Math.min(forceLayoutWidth - radius, d.x));
                } else {
                    return d.x = forceLayoutWidth / 2 - selectedCircleRadius
                }
            })
            .attr("y", function(d) {
                if (d.object_number != rootNodeObjectNumber) {
                    return d.y = Math.max(circleRadius, Math.min(forceLayoutHeight - radius, d.y));
                } else {
                    return d.y = forceLayoutHeight / 2 - selectedCircleRadius
                }
            }); //the max/min places bounds on the edges of the force layout
    });
}

//creates the graphical representation of a particular data point
function createNodeGraphics(div2) {
    var returnValues = [];

    //create the group
    var nodeGroup = svg.selectAll(".node") //add a node to the force layout for each data point
        .data(nodes)
        .enter()
        .append("svg")
        .attr("class", "node")
        .attr("r", circleRadius)
        .attr("id", function(d) {
            return "node_" + d.object_number; //USE OBJECT NUMBER AS ID
        })
        .attr("title", function(d) { //give the group all the attributes that will be useful later
            return "node_" + d.title;
        })
        .attr("object_category", function(d) {
            return "node_" + d.object_category;
        })
        .attr("creator", function(d) {
            return "node_" + d.creator;
        })
        .attr("production_place", function(d) {
            return "node_" + d.production_place;
        })
        .attr("symbol_id", function(d) {
            return "symbol_id: " + d.symbol_id;
        })
        .attr("gallery", function(d) {
            return d.gallery;
        })
        .attr("object_number", function(d) {
            return d.object_number;
        })
        .call(force.drag);

    returnValues.push(nodeGroup); //we will need to return the nodeGroup at the end of the function

    //create the svg that will hold the circle and image that represent the node
    var nodeSVG = nodeGroup.append("svg")
        .attr("class", "nodeSVG")
        .attr("gallery", function(d) {
            return d.gallery;
        })
        .attr("object_number", function(d) {
            return d.object_number;
        })
        .attr("id", function(d) {
            return "svg_" + d.object_number;
        });

    returnValues.push(nodeSVG); //we will need to return the nodeSVG at the end of the function

    var circle = nodeSVG.append("circle") //append a circle to the force layout for each node
        .attr("r", circleRadius)
        .attr("cx", circleRadius)
        .attr("cy", circleRadius)
        .attr("id", function(d) {
            return "circle_" + d.object_number;
        }) //add the id in here
        .style("stroke",
            function(d) {
                if (d.gallery == "gallery1") {
                    return "green"
                } //the circles have different coloured rings depending on the gallery they belong to
                else if (d.gallery == "gallery2") {
                    return "blue"
                } else if (d.gallery == "gallery3") {
                    return "red"
                } else if (d.gallery == "gallery4") {
                    return "purple"
                } else {
                    return "black"
                };
            })
        .style("fill", "white")
        .style("stroke-width", "2");

    returnValues.push(circle); //we will need to return the circle at the end of the function

    var div1 = d3.select("body").append("div") //make the initial tooltip for description
        .attr("id", "div1")
        .attr("class", "tooltip")
        .style("opacity", 0);

    var div3 = d3.select("body").append("div") //make the initial tooltip for the image
        .attr("id", "div3")
        .attr("class", "tooltip")
        .style("opacity", 0);

    nodeSVG.append("image") //append an image to the force layout for each datapoint
        .attr("xlink:href", function(d) {
            return "symbols/" + d.image;
        })
        .attr("x", 0.2 * circleRadius)
        .attr("y", 0.2 * circleRadius)
        .attr("width", 1.5 * circleRadius)
        .attr("height", 1.5 * circleRadius)
        .attr("id", function(d) {
            return "image_" + d.object_number;
        })

    .on("click", function(d, i) { //the onclick handler
            selectedNode = d;
            selected = d.object_number;
            d.isSelected = true;
            var objectNumber = d.object_number;
            selectedObjectNumber = objectNumber;
            previousText = selectedText;

            //restore the previously highlighted circle to its original state

            previousCircle = selectedCircle;
            previousSVG = selectedSVG;
            previousImage = selectedImage;
            previousText1 = selectedText1;
            previousText2 = selectedText2;
            previousText3 = selectedText3;
            previousText4 = selectedText4;
        })
        .on("mouseover", function(d) {
            var objectNumber = d.object_number;
            rootNodeObjectNumber = objectNumber;

            //expandNode(objectNumber); //highlight and expand the circle that has been clicked  
            makeTooltipsVisible(div1, div3, d); //make artefact details tooltip visible

            svg.selectAll(".link").style("stroke", function(d) {  //change colour of links to match the new root node
                console.log("Changing stroke colour."); 
                if(d.target.object_number==rootNodeObjectNumber||d.source.object_number==rootNodeObjectNumber){return "#ff9933";} 
                else{return "lightgrey";} });

            changeNodeColor(objectNumber);
        })
        .on("mouseout", function(d) {
            console.log("Called mouseout.");
            var objectNumber = d.object_number;
            //decreaseNode(d, expandedCircle, expandedImage, expandedSVG); //revert the circle back to its normal colour and size
            //makeTooltipInvisible(div1, div2, d); //make the artefact details tooltip invisible
            decolorNode(objectNumber);
        });

    return returnValues; //return the group, svg and circle so that they can by modified in the call frame below
}

//creates a force layout object, gives it some data and starts it
function createForceLayout() {
    //create the force layout
    force = d3.layout.force()
        .gravity(function(d) {
            return 10;
        }) //set the parameters
        .charge(function(d) {
            if (d.object_number.valueOf() != "0000") {
                return -120;
            } else {
                return -120;
            }
        })
        .linkDistance(function(d) {
            if (d.source.object_number.valueOf() == "0000") {
                return 12 * circleRadius;
            } else {
                return 10 * circleRadius
            }
        })
        .linkStrength(0.1)
        .friction(0.9)
        .alpha(0.1)
        .theta(0.8)
        .size([forceLayoutWidth, forceLayoutHeight]);

    //create the svg
    svg = d3.select("#mainviz").append("svg")
        .attr("width", forceLayoutWidth)
        .attr("height", forceLayoutHeight);

    force //load the nodes and links data into the force layout
        .nodes(nodes)
        .links(links)
        .start();
}

//makes the artefact details tooltip visible
function makeTooltipsVisible(div1, div3, d) {
    div1.transition()
        .duration(200)
        .style("opacity", .9);
    div1.html("<h3><b>" + d.title + "</b></h3>" + "<p>" + d.description + "</p>" + "<p>" + d.creator + "</p>" + "<p>" + d.production_place + "</p>" + "<p>" + d.production_date + "</p>") //the tooltip contains the artefact description
        .style("left", function(e) {
            if (!d.isSelected) {
                return /*(d.x - circleRadius) - 130*/forceLayoutWidth - 170 + "px";
            } else {
                return /*(d.x - selectedCircleRadius)*/700 + "px";
            }
        })
        .style("top", function(e) {
            if (!d.isSelected) {
                return /*(d.y - circleRadius) - 90*/forceLayoutHeight - 325 + "px";
            } else {
                return /*(d.y - selectedCircleRadius)*/700 + "px";
            }
        })
        .style("width", "180px")
        .style("height", "auto")
        .style("font-size", "20px");
    div3.transition()
        .duration(200)
        .style("opacity", .9);
    div3.html("<img src='symbols/" + d.image + "' height='150' width='125'>")
        .style("left", function(e) {
            if (!d.isSelected) {
                return /*(d.x - circleRadius) - 130*/forceLayoutWidth - 170 + "px";
            } else {
                return /*(d.x - selectedCircleRadius)*/700 + "px";
            }
        })
        .style("top", function(e) {
            if (!d.isSelected) {
                return /*(d.y - circleRadius) - 90*/forceLayoutHeight - 475 + "px";
            } else {
                return /*(d.y - selectedCircleRadius)*/700 + "px";
            }
        })
        .style("width", "180px")
        .style("height", "auto")
        .style("font-size", "20px");
}

//makes the artefact details tooltip invisible
function makeTooltipInvisible(div1, div2, d) {
    div1.transition()
        .duration(500)
        .style("opacity", 0);

    div2.transition()
        .duration(500)
        .style("opacity", 0);
}

//expands and changes the colour of the graphical representation of the node corresponding to the given object number
function expandNode(objectNumber) { //increase the size of a node's circle and change the circle's fill colour to orange
    expandedCircle = d3.select("#circle_" + objectNumber); //the id should go here
    expandedCircle.transition().duration(800).style("fill", "orange").attr("r", selectedCircleRadius).attr("cx", selectedCircleRadius).attr("cy", selectedCircleRadius);
    expandedSVG = d3.select("#svg_" + objectNumber);
    expandedSVG.transition().duration(800).attr("width", 2 * selectedCircleRadius).attr("height", 2 * selectedCircleRadius);
    expandedImage = d3.select("#image_" + objectNumber);
    expandedImage.transition().duration(800).attr("x", 38).attr("y", 38).attr("width", selectedCircleRadius * 1.5).attr("height", selectedCircleRadius * 1.5);
}

function changeNodeColor(objectNumber) {
    console.log("ORANGE OBJECT NUMBER: " + objectNumber);
    var coloredCircle = d3.select("#circle_" + objectNumber); //the id should go here
    coloredCircle.transition().duration(200).style("fill", "orange");
}

function decolorNode(objectNumber) {
    console.log("WHITE OBJECT NUMBER: " + objectNumber);
    var coloredCircle = d3.select("#circle_" + objectNumber); //the id should go here
    console.log("ABOUT TO DECOLOR NODE");
    coloredCircle.transition().duration(200).style("fill", "white");
    console.log("DECOLORED NODE");
}

//decreases the size of the graphical representation of the node corresponding to the given object number
function decreaseNode(d, previousCircle, previousImage, previousSVG) { //decrease the size of a node's circle and picture and set the circle's fill colour to white
    selectedText1 = d3.select("#text_" + d.object_number + "_1");
    selectedText2 = d3.select("#text_" + d.object_number + "_2");
    selectedText3 = d3.select("#text_" + d.object_number + "_3");
    selectedText4 = d3.select("#text_" + d.object_number + "_4");
    if (previousCircle != null) {
        circleRadius = forceLayoutHeight / 40;
        previousCircle.transition().duration(200).style("fill", "white").attr("r", circleRadius).attr("cx", circleRadius).attr("cy", circleRadius);
        previousSVG.transition().duration(200).attr("width", 120).attr("height", 120); //change the svg size too
        previousImage.transition().duration(200).attr("x", 0.2 * circleRadius).attr("y", 0.2 * circleRadius).attr("width", 1.5 * circleRadius).attr("height", 1.5 * circleRadius);
    }
}

//redraws the force directed graph using the filtered version of the dataset from the crossfilter
function redrawGraph() {
    var dateDim = crossFilteredData.dimension(function(d) {
        return d.production_date;
    });
    var newNodes = dateDim.top(Infinity); //this data structure is not yet correct
    console.log("NEW NODES LENGTH: " + newNodes.length);
    var newLinks = createCategoryEdges(newNodes); //create the new edges
    console.log("NEW LINKS LENGTH: " + newLinks.length);
    updateNodes(newNodes, newLinks);
}

//update the force layout to contain only the most recent filtered subset of the datapoints
function updateNodes(newNodes, newLinks) {
    
    console.log("POINT 1");
    force.nodes(newNodes)
        .links(newLinks)
        .alpha(10)
        .start();


    console.log("POINT 2");
    var link = svg.selectAll(".link").remove();

    link = svg.selectAll(".link")
        .data(newLinks)
        .enter()
        .append("line")
        .attr("class", "link")
        .style("stroke-width", function(d) {
            return Math.sqrt(d.value);
        })
        .style("stroke", "lightgrey");

    var node = svg.selectAll(".node").remove();

    var link = svg.selectAll(".link")
        .data(links)
        .enter().append("line")
        .attr("class", "link")
        .style("stroke-width", function(d) {
            return Math.sqrt(d.value);
        })
        .style("stroke", function(d) {
            if (d.isDummyLink) {
                return "white";
            }
        });

    console.log("POINT 3");

    var graphicsElements = createNodeGraphics(div2);


    var div = d3.select("body").append("div") //make the initial tooltip   
        .attr("class", "tooltip")
        .style("opacity", 0);

    graphicsElements[0].append("image")
        .attr("xlink:href", function(d) {
            return "symbols/" + d.image;
        })
        .attr("x", 0.2 * circleRadius)
        .attr("y", 0.2 * circleRadius)
        .attr("width", 1.5 * circleRadius)
        .attr("height", 1.5 * circleRadius)
        .attr("id", function(d) {
            console.log("POINT 4");
            return "image_" + d.object_number;
        })
    .on("click", function(d, i) {
            selectedNode = d;

            selected = d.object_number;
            var objectNumber = d.object_number;
            expandNode(objectNumber); //highlight and expand the circle that has been clicked
            previousText = selectedText;
            decreaseNode(d, previousCircle, previousImage, previousSVG);

            //restore the previously highlighted circle to its original state

            previousCircle = selectedCircle;
            previousSVG = selectedSVG;
            previousImage = selectedImage;
            previousText1 = selectedText1;
            previousText2 = selectedText2;
            previousText3 = selectedText3;
            previousText4 = selectedText4;

        })
        .on("mouseover", function(d) {
            //create tooltip on mouseover      
            makeTooltipVisible(div1, d); //make artefact details tooltip visible
        })
        .on("mouseout", function(d) {
            //makeTooltipInvisible(div1, div2, d); //make the artefact details tooltip invisible
        });

    d3.selectAll("rect").moveToFront();
    d3.selectAll("text").moveToFront();

    graphicsElements[1].append("title")
        .text(function(d) {
            return d.title;
        });

    force.on("tick", function(e) {

        link.attr("x1", function(d) {
                return d.source.x;
            })
            .attr("y1", function(d) {
                return d.source.y;
            })
            .attr("x2", function(d) {
                return d.target.x;
            })
            .attr("y2", function(d) {
                return d.target.y;
            });

        graphicsElements[0].attr("x", function(d) {
                return d.x - 20;
            }) //the -20 aligns the nodes with the links
            .attr("y", function(d) {
                return d.y - 20;
            });

    });
}