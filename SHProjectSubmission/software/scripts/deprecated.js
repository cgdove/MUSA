/*
THE CODE IN THIS FILE IS DEPRECATED AND NOT RELEVANT TO THE PRESENT WORKING STATE OF THE VISUALISATION
*/

function centreSelectedNodeV2(d, objectNumber) {
    console.log("Centering node.");

    console.log("OBJECT NUMBER OF D: " + d.object_number);

    //reset the charge and gravity to default

     force
      .gravity(-30)
      .charge(0.1);

    //set the gravity and charge to centre the node
    force
      .gravity(function(d) { 
        if(d.object_number.valueOf() == objectNumber.valueOf()) {
          return 10;
          console.log("Centring the node."); 
        }
        else {return 0;} })
      .charge(function(d) { if(d.object_number.valueOf() != objectNumber.valueOf()) {
        return -1000;
        console.log("Changing the charge."); 
      }
        else {return 0;} });
}

function centreSelectedNode(d, objectNumber) {
    console.log("^^^CENTERING NODE^^^");
    console.log("ORIGINAL POSITION OF NODE TO BE CENTRED: " + d.x + " , " + d.y);

    //select the dummy node's group
    var dummyGroup = d3.select("#node_0000");

    //get the x and y attributes of the dummy node's group
    var dummyX = dummyGroup.x;
    var dummyY = dummyGroup.y;   
    console.log("Dummy X: " + dummyX);
    console.log("Dummy Y: " + dummyY); 


    if(d.object_number.valueOf() == selected.valueOf()){
      console.log("(((((((((((((((Centred node has been found))))))))))))))))");
      var selectedGroup = d3.select("#node_" + objectNumber);
      console.log("ID TO BE CENTRED: " + "#node_" + objectNumber);
      selectedGroup
          .transition()
          .duration(1000)
          .attr("transform", function (d) {
             console.log("ENTERED THE TRANSFORM CALLBACK!");
             var centreX = forceLayoutWidth/2;
             var centreY = forceLayoutHeight/2;
             console.log("CENTRE X: " + centreX);
             console.log("CENTRE Y: " + centreY);
             d.x = centreX;
             d.y = centreY;
             console.log("ABOUT TO TRANSFORM NODE BY: (" + centreX + " , " + centreY +")");
             console.log("OBJECT NUMBER: " + objectNumber);
             return "translate(" + centreX + "," + centreY + ")";});
             //d.fixed = true;   //fix the node position
      }
    

    console.log("THE FOLLOWING TRANSFORM HAS BEEN DONE: " + d.x + " , " + d.y);
    console.log("^^^FINISHED CENTERING NODE^^^");
}

//write another collide function

//write to an x and y variable on the node


function collide(node) {
  console.log("Called collide.");
  console.log("Node radius: " + node.radius);
  console.log("Initial node.x: " + node.x);
  console.log("Initial node.y: " + node.y);
  var r = 20, //node.radius + 16,
      nx1 = node.x - r,
      nx2 = node.x + r,
      ny1 = node.y - r,
      ny2 = node.y + r;
  return function(quad, x1, y1, x2, y2) {
    if (quad.point && (quad.point !== node)) {
      var x = node.x - quad.point.x,
          y = node.y - quad.point.y,
          l = Math.sqrt(x * x + y * y),
          r = 20; //node.radius + quad.point.radius;
      if (l < r) {
        console.log("Applying change to node position.");
        l = (l - r) / l * .5;
        node.x -= x *= l;
        node.y -= y *= l;
        console.log("Final node.x: " + node.x);
        console.log("Final node.y: " + node.y);
        quad.point.x += x;
        quad.point.y += y;
      }
    }
    return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
}
}

function clusterGroups() {
  //select all groups that correpond to node depictions

  

  //transition all these groups to cluster around the selected group



}

function groupNodes(d) {
  //get the index of the currently selected node

  console.log("SELECTED NODE INDEX: " + d.index);

  //iterate through all links in force.links

  var linksLocal = force.links;
  console.log("NUMBER OF LINKS: " + linksLocal.length);


  //if the source of a link in force.links is the index of the currently selected node

  

  //then change the distance element of that array

}

function highlightConnectedNodes(d) {
  //find out id of the selected node

  //select all links/paths with that id as their source

  //increase the width and change the colour of the selected links/paths
  
}

function onNodeClick(d) {
     
    
}

function disperseNodes(d, objectNumber) {  //use transitions to disperse the unselected nodes to the peripheries of the screen
   force.stop(); //stop the simulation
   console.log("^^^DISPERSING NODES^^^");
   console.log("THE NODES ARRAY: " + force.nodes());
   console.log("THE FIRST NODE: " + force.nodes()[0]);
   console.log("THE FIRST NODE'S X VALUE: " + force.nodes()[0].x);
   console.log("THE FIRST NODE's INDEX: " + force.nodes()[0].index);
   force.charge(0);
   svg.selectAll(".node")  //move the unselected nodes to the sides of the viewport
        .transition()
        .duration(1000)
        .attr("x", function(d) {
         if(d.object_number.valueOf() != selected.valueOf()) {
                if(d.gallery.valueOf() == "gallery1") {   //if the node is in gallery 1
                d.x = getRandomArbitrary(0, 0.3*forceLayoutWidth);
            	console.log("Node is at TOP LEFT.");
            	return d.x;   //THESE TRANSFORMATIONS SHOULD UPDATE THE ATTRIBUTES TO BE RENDERED - NOT JUST HARD CODED
        	}
                else if(d.gallery.valueOf() == "gallery2") {   //if the node is in gallery 2
            	console.log("Node is at BOTTOM RIGHT.");
                d.x = getRandomArbitrary(0.7*forceLayoutWidth, forceLayoutWidth);
                return d.x;
        	}
                else if(d.gallery.valueOf() == "gallery3") {    //if the node is in gallery 3
                console.log("Node is at TOP RIGHT.");
                d.x = getRandomArbitrary(0.7*forceLayoutWidth, forceLayoutWidth);
                return d.x;
                }
                else if(d.gallery.valueOf() == "gallery4") {    //if the node is in gallery 4
                console.log("Node is at BOTTOM LEFT.");
                d.x = getRandomArbitrary(0, 0.3*forceLayoutWidth);
                return d.x;
                }
             }
         })
        .attr("y", function(d) {
         if(d.object_number.valueOf() != selected.valueOf()) {
                if(d.gallery.valueOf() == "gallery1") {   //if the node is in gallery 1
                d.y = getRandomArbitrary(0, 0.3*forceLayoutHeight);
            	console.log("Node is at TOP LEFT.");
            	return d.y;   //THESE TRANSFORMATIONS SHOULD UPDATE THE ATTRIBUTES TO BE RENDERED - NOT JUST HARD CODED
        	}
                else if(d.gallery.valueOf() == "gallery2") {   //if the node is in gallery 2
            	console.log("Node is at BOTTOM RIGHT.");
                d.y = getRandomArbitrary(0.7*forceLayoutHeight, forceLayoutHeight);
                return d.y;
        	}
                else if(d.gallery.valueOf() == "gallery3") {    //if the node is in gallery 3
                console.log("Node is at TOP RIGHT.");
                d.y = getRandomArbitrary(0, 0.3*forceLayoutHeight);
                return d.y;
                }
                else if(d.gallery.valueOf() == "gallery4") {    //if the node is in gallery 4
                console.log("Node is at BOTTOM LEFT.");
                d.y = getRandomArbitrary(0.7*forceLayoutHeight, forceLayoutHeight);
                return d.y;
                }
              }
          });
        

          force.nodes()[d.index].fixed = true;
    console.log("^^^FINISHED DISPERSING NODES^^^");
}

var testData = [
        {times: [{"starting_time": 1355752800000, "ending_time": 1355759900000}, {"starting_time": 1355767900000, "ending_time": 1355774400000}]},
        {times: [{"starting_time": 1355759910000, "ending_time": 1355761900000}, ]},
        {times: [{"starting_time": 1355761910000, "ending_time": 1355763910000}]},
      ];

var currentVal = "keywords";

function initializeOptionMenu()
{
	var optionForm = d3.select("#sidebar")
	    .append("form")
	    .append("select")
            .attr("name", "optionMenu")
	    .attr("id", "optionMenu")
	    .attr("width", 400);
	
	optionForm.append("option")
	    .attr("value", "category")
	    .text("category");

	

}

function displayNodeLabels(d, object_number) {
    
    selectedNode = d3.select('#node_' + d.object_number);

    selectedNode.append("text")
            .attr("id", "text_" + d.object_number + "_1")
            .attr("transform", function(d){
              return "rotate(" + parseInt("90") + ")" + "translate(" + "30" + "," + (0.5)*10 + ")";
            })
            .style("font-size", function(d){
              return 30;
            })
            .style("fill", "darkOrange")
            .text(d.title);

    selectedNode.append("text")
            .attr("id", "text_" + d.object_number + "_2")
            .attr("transform", function(d){
              return "rotate(" + parseInt("0") + ")" + "translate(" + "30" + "," + (0.5)*10 + ")";
            })
            .style("font-size", function(d){
              return 30;
            })
            .style("fill", "darkOrange")
            .text(d.object_category);


    selectedNode.append("text")
            .attr("id", "text_" + d.object_number + "_3")
            .attr("transform", function(d){
              return "rotate(" + parseInt("180") + ")" + "translate(" + "30" + "," + (0.5)*10 + ")";
            })
            .style("font-size", function(d){
              return 30;
            })
            .style("fill", "darkOrange")
            .text(d.creator);

    selectedNode.append("text")
            .attr("id", "text_" + d.object_number + "_4")
            .attr("transform", function(d){
              return "rotate(" + parseInt("270") + ")" + "translate(" + "30" + "," + (0.5)*10 + ")";
            })
            .style("font-size", function(d){
              return 30;
            })
            .style("fill", "darkOrange")
            .text(d.production_place);
}

function drawTimeline() {
    	//put this in a function
	    console.log("HERE1");
        
    
    console.log("DATA FOR TIMELINE: " + data);

    var dateDim = crossFilteredData.dimension(function(d) {return d.date;});
    var hits = dateDim.group().reduceSum(function(d) {return d.total;}); 
    console.log("HERE3");
    var hits = dateDim.group().reduceSum(dc.pluck('total')); 


    var hitslineChart = dc.lineChart("#timeline-chart"); 

	hitslineChart
	.width(500).height(200)
	.dimension(dateDim)
	.group(hits)
	.x(d3.time.scale().domain([minDate,maxDate])); 

	dc.renderAll();
	console.log("HERE4");
    }

function infoBox(d, object_number) {
    selectedSVG = d3.select('#svg_' + object_number);
    selectedSVG.attr("width",350);
    selectedSVG.attr("height",350);
    selectedCircle = d3.select("#circle_" + object_number);
    var rectangle = selectedSVG.append("rect")
                            .attr("x", 120)
                            .attr("y", 120)
                            .attr("width", 350)
                            .attr("height", 350)
                            .attr("class", "shape")
                            .style("fill", "orange");
                            
    selectedNode.append("text")
            .attr("id", "text" + object_number + "_4")
            .attr("class", "shape")
            .style("fill", "navy")
            .text(d.description);

    d3plus.textwrap()   //USE D3PLUS TO WRAP THE TEXT TO THE SURROUNDING RECTANGLE
    .container(d3.select("#text" + object_number + "_4"))
    .align("start")
    .x(70)
    .y(70)
    .draw();

    selectedSVG.attr("width",350);
    selectedSVG.attr("height",350);
}

function createCategoryEdgesDEPRECATED(nodes)   // creates links according to matching categories between artefact nodes
{
  console.log("NUMBER OF NODES INPUT: " + nodes.length);
  var links = [];
        var numberOfNodes = nodes.length;
        var start = 1;
        for(var count = 0; count < numberOfNodes; count++){  // go through all the nodes
          for(var i = start; i < numberOfNodes; i++)  // go through all the nodes again
          {
            if(nodes[i].object_category.valueOf() == nodes[count].object_category.valueOf()) {  //only push a link to the array if the nodes have matching categories
              var newLink = {"source": i, "target": count, "sourceIndex": i, "targetIndex": count, "isDummyLink":false };
              links.push(newLink);
              console.log("added a link!");
              console.log("Link source: " + newLink.source);
              console.log("Link target: " + newLink.target);
            }
          }
          start = start + 1;
        }
  console.log("NUMBER OF LINKS OUTPUT: " + links.length);
  return links;   // return the array of links based on object categories
}

function objectToArray(myObj) {
  x = [];
  for( var i in myObj ) {
      x[i] = myObj[i][0];
  }
  return x;
}

function removeOldNodes() {
  node = svg.selectAll(".node"),
  link = svg.selectAll(".link");

  link = link.data(links);
  link.exit().remove();

  node = node.data(nodes);
  node.exit().remove();

  force.start();
}


function addNewNodes() {
  node = svg.selectAll(".node"),
  link = svg.selectAll(".link");

  link = link.data(links);
  link.enter().insert("line", ".node").attr("class", "link");

  node = node.data(nodes);
  node.enter().append("circle").attr("class", function(d) { return "node " + d.symbol_id; }).attr("r", 20).style("fill", "green");

  force.start();
}

function timelineCircle(musaData) {
  var timelineData = getTimelineData(musaData);
        var chart = d3.timeline()
            .tickFormat( 
            {format: d3.time.format("%I %p"),
            tickTime: d3.time.hours,
            tickInterval: 1,
            tickSize: 30})
            .display("circle"); // toggle between rectangles and circles

        var svg = d3.select("#timeline").append("svg").attr("width", timelineWidth)
          .datum(timelineData).call(chart);
      }  

    
    function getTimelineData(musaData) {
    console.log("Called getTimelineData.");
        console.log("Musa Data Keys: " + Object.keys(musaData.valueOf(1)));
        timelineData = [{times:[]}];
      for(var artefact in musaData) {
          console.log("BEEN ROUND LOOP");
          console.log("Artefact: " + artefact);
          var year = artefact.valueOf("1");
        var date = "0/0/" + year;
        console.log("Date: " + date);
          var timestamp = new Date(date).getTime();
        console.log("Timestamp: " + timestamp);
        var timeObject = {"starting_time": timestamp};
        timelineData[0].times.push(timeObject);
      }
      return timelineData;
    }

function positionLinks(link) {
  link.attr("x1", function(d) { return d.source.x; })
    .attr("y1", function(d) { return d.source.y; })
    .attr("x2", function(d) { return d.target.x; })
    .attr("y2", function(d) { return d.target.y; });
}

//removes all the existing links from the force directed graph
function removeAllLinks() {
  //remove the logical links so that the nodes can fly off to the edges
  force.links([]);
  
  //remove the lines that represent the links
  d3.selectAll("line").remove();
}
