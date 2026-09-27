/*
    THE CODE IN THIS FILE CORRESPONDS TO DRAWING THE TIMELINE
*/
var timelineWidth = 0.57 * windowWidth;

//draws a dc timeline that can be used to filter the nodes that are contained in the force directed graph
function drawTimeline2() {
    var timeChart = dc.barChart("#timeline-chart");
    var dateDim = crossFilteredData.dimension(function(d) {
        return d.production_date;
    });

    var hits = dateDim.group().reduceCount();
    var a = hits.top(4);
    var dateGroup = dateDim.group();

    //find the min date (using crossfilter functions)
    var minDate = dateDim.bottom(1)[0].production_date;

    //find the max date (using crossfilter functions)
    var maxDate = dateDim.top(1)[0].production_date;

    timeChart.width(960)
        .height(150)
        .margins({
            top: 50,
            right: 10,
            bottom: 20,
            left: 40
        })
        .dimension(dateDim)
        .group(hits)
        .transitionDuration(500)
        .elasticY(true)
        .x(d3.time.scale().domain([minDate, maxDate]))
        .xAxisLabel("Frequency")
        .y(d3.scale.linear().domain([0, 100]))
        .yAxisLabel("Date")
        .on("filtered", redrawGraph) //add an event handler to the crossfilter
        .xAxis();

    dc.renderAll();
}
