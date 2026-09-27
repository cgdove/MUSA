/*
THE CODE IN THIS FILE CORRESPONDS TO THE DRAWING OF THE PIE CHART
*/
//creates a dc pie chart where each sector represents a gallery of musa
function drawPieChart() {
    var pieChart = dc.pieChart('#quarter-chart');
    //dimension and group by gallery
    var categoryDim = crossFilteredData.dimension(function(d) {
        return d.gallery;
    });
    var grouping = categoryDim.group().reduceCount();
    var top4 = grouping.top(1);

    //the mapping of colours to galleries
    var pieChartColorScale = d3.scale.ordinal()
        .domain(["gallery1", "gallery2", "gallery3", "gallery4"])
        .range(["green", "blue", "red", "purple"]);

    pieChart
        .width(180)
        .height(180)
        .radius(80)
        .innerRadius(30)
        //.x(d3.scale.linear().domain([1,4]))
        .dimension(categoryDim)
        .on("filtered", redrawGraph)
        .colors(pieChartColorScale)
        .group(grouping);

    dc.renderAll();
}
