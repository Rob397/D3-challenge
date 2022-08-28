//Choosing Income vs Age for my graph
// Check if data loads
d3.csv("data/data.csv").then(function(Data) {

    console.log(Data);

}).catch(function(error) {
    console.log(error);
  });

  
// set the dimensions and margins of the graph
var margin = {top: 35, right: 35, bottom: 45, left: 65},
    width = 800 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;


// append the svg object to the body of the page
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");


//Read the data
d3.csv("data/data.csv").then(function(Data) {


// cast the data from the csv as numbers
  Data.forEach(function(data){
      data.obesity = +data.obesity;
      data.income = +data.income;
      data.smokes = +data.smokes;
      data.age = +data.age;
      data.healthcare = +data.healthcare;
      data.poverty = +data.poverty;
  });



// create scales
// x scale
var xScale = d3.scaleLinear()
    .domain([d3.min(Data, d => d.income) * 0.92 , d3.max(Data, d => d.income * 1.15)])
    .range([0, width]);

// scale for dependent (y) coordinates
  var yScale = d3.scaleLinear()
  .domain([d3.min(Data, d => d.age) * 0.85, d3.max(Data, d => d.age *1.15)])
  .range([height, 0]);


  // var bottomAxis = d3.axisBottom(xTimeScale);
  // var leftAxis = d3.axisLeft(yLinearScale);
  // Append axes
  // Add X axis
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale));

  // Add Y axis
  svg.append("g")
    .call(d3.axisLeft(yScale));

// Add circles
svg.append('g')
  .selectAll("circle")
  .data(Data)
  .enter()
  .append("circle")
    .attr("cx", function (d) { return xScale(d.income); } )
    .attr("cy", function (d) { return yScale(d.age); } )
    .attr("r", 13)
    .attr("fill", "blue")
    .attr("stroke-width", "2")
    .attr("opacity", 0.4);
      // .style("fill", "#69b3a2")
      
  // Create circle labels
  svg
    .selectAll(".stateText")
    .data(Data)
    .enter()
    .append("text")
    .classed("stateText", true)
    .attr("x", (d) => xScale(d.income))
    .attr("y", (d) => yScale(d.age))
    .attr("dy", 3)
    .attr("font-size", 12)
    .text((d) => d.abbr);


// Append axes titles
var xLabelsGroup = svg.append("g")
.attr("transform", `translate(${width / 2}, ${height + margin.top/2})`);

var yLabelsGroup = svg.append("g")
.attr("transform", `translate(${-50}, ${height/2})`);


xLabelsGroup.append("text")
        .classed("aText", true)
        .classed("active", true)
        .attr("x", 0)
        .attr("y", 20)
        .attr("value", "income")
        .text("Median Income ($)");

yLabelsGroup.append("text")
        .classed("aText", true)
        .classed("active", true)
        .attr("x", -12)
        .attr("y", 20)
        .attr("value", "age")
        .text("Median Age").attr("transform", "rotate(-90)");

});



