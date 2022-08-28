//Choosing Income vs Age for my graph
// Check if data loads
d3.csv("data/data.csv").then(function(Data) {

    console.log(Data);

}).catch(function(error) {
    console.log(error);
  });

  
// set the dimensions and margins of the graph
var margin = {top: 10, right: 35, bottom: 35, left: 65},
    width = 800 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;


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
    .domain(d3.extent(Data, d => d.income))
    .range([0, width]);

// scale for dependent (y) coordinates
  var yScale = d3.scaleLinear()
  .domain([0, d3.max(Data, d => d.age)])
  .range([height, 0]);

  // Append axes
  // // Add X axis
  //   svg.append("g")
  //   .attr("transform", "translate(0," + height + ")")
  //   .call(d3.axisBottom(x));

  // // Add Y axis
  // svg.append("g")
  //   .call(d3.axisLeft(y));

  // Add circles
  svg.append('g')
    .selectAll("circle")
    .data(Data)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(d.income); } )
      .attr("cy", function (d) { return y(d.age); } )
      .attr("r", 4)
      .style("fill", "#69b3a2")

});

      // // Add circles
      // var circlesGroup = chartGroup.selectAll("circle")
      //   .data(Data)
      //   .enter()
      //   .append("circle")
      //   .attr("cx", d => xScale(d.income))
      //   .attr("cy", d => yScale(d.age))
      //   .attr("r", "10")
      //   .attr("fill", "blue")
      //   .attr("stroke-width", "1")
      //   .attr("stroke", "black");


// append circles























// function xMinMax() {
//     // min will grab the smallest datum from the selected column.
//     xMin = d3.min(theData, function(d) {
//       return parseFloat(d[curX]) * 0.90;
//     });

//     // .max will grab the largest datum from the selected column.
//     xMax = d3.max(theData, function(d) {
//       return parseFloat(d[curX]) * 1.10;
//     });
//   }

//   // b. change the min and max for y
//   function yMinMax() {
//     // min will grab the smallest datum from the selected column.
//     yMin = d3.min(theData, function(d) {
//       return parseFloat(d[curY]) * 0.90;
//     });

//     // .max will grab the largest datum from the selected column.
//     yMax = d3.max(theData, function(d) {
//       return parseFloat(d[curY]) * 1.10;
//     });
//   }


// We append the circles for each row of data (or each state, in this case).


