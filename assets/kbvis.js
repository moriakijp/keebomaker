var width = 960;
var height = 400;
var margin = {
  top: 0,
  bottom: 0,
  left: width * 0.2,
  right: width * 0.2
}
var blocksize = 120;

d3.csv("data/qwerty.csv", function (errer, data) {

  d3.text("data/qwerty.csv", function(error, text) {
    var data = d3.csv.parseRows(text);
    for(var i=0; i<data.length; ++i)
      console.log(data[i]);
});

  var svg = d3.select("#myGraph").append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var Smax = Math.max.apply(null, data.map(function (d) {
    return d.score
  }));
  var Lmax = Math.max.apply(null, data.map(function (d) {
    return d.lost
  }));

  var ScolorScale = d3.scale.linear().domain([0, Smax]).range(["#FFF5F2", "#F9690E"]);
  var LcolorScale = d3.scale.linear().domain([0, Lmax]).range(["#FFF5F2", "#F9690E"]);


  var heatmap = svg.selectAll('g').data(data).enter();

  heatmap.append('rect')
  .attr("class", "block")
  .attr("x", function (d, i) {
      return i * blocksize
    })
    .attr("y", blocksize)
    .attr("width", blocksize)
    .attr("height", blocksize)
    .attr("fill", function (d) {
      return ScolorScale(d.score);
    })

  heatmap.append('rect')
    .attr("class", "block")
    .attr("x", function (d, i) {
      return i * blocksize
    })
    .attr("y", blocksize * 2)
    .attr("width", blocksize)
    .attr("height", blocksize)
    .attr("fill", function (d) {
      return LcolorScale(d.lost);
    })
  // .transition()
  // .delay(function(d,i){return i * 100})
  // .duration(2000)
  // .ease("circle")
  // .attr("rx",0)
  // .attr("ry",0);


  heatmap.append('text')
    .text(function (d) {
      return d.score
    })
    .attr("x", function (d, i) {
      return i * blocksize
    })
    .attr("y", blocksize * 1.5)
    .attr("text-anchor", "middle")
    .attr("fill", "#333")
    .attr("dy", ".35em")
    .attr("dx", blocksize / 2)
    .style({
      "font-size": 25
    });

  heatmap.append('text')
    .text(function (d) {
      return d.lost
    })
    .attr("x", function (d, i) {
      return i * blocksize
    })
    .attr("y", blocksize * 2.5)
    .attr("text-anchor", "middle")
    .attr("fill", "#333")
    .attr("dy", ".35em")
    .attr("dx", blocksize / 2)
    .style({
      "font-size": 25
    });


  var xLabels = svg.selectAll(".Label")
    .data(data)
    .enter().append("text")
    .text(function (d) {
      return d.time;
    })
    .attr("y", 0)
    .attr("x", function (d, i) {
      return i * blocksize;
    })
    .attr("fill", "#333")
    .style({
      "font-size": 15
    })
    .style("text-anchor", "middle")
    .attr("transform", "translate(60," + blocksize / 1.1 + ")");

  var yLabels = svg.selectAll(".Label")
    .data(["score", "lost"])
    .enter().append("text")
    .text(function (d) {
      return d;
    })
    .attr("fill", "#333")
    .attr("x", 0)
    .attr("y", function (d, i) {
      return i * blocksize;
    })
    .style({
      "font-size": 15
    })
    .style("text-anchor", "end")
    .attr("transform", "translate(-20," + blocksize * 1.6 + ")");

});


// document.querySelector('#message-button').addEventListener('click', () => {
//       const canvas = document.querySelector('#myGraph');
//       drawHeatmap(canvas, data);
// })
