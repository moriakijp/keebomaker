var width = 960;
var height = 400;
var margin = {
  top: 0,
  bottom: 0,
  left: width * 0.2,
  right: width * 0.2
}
var blocksize = 120;

d3.json("data/qwerty2.json", function (errer, data) {
  var svg = d3.select("#myGraph").append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var row0-max = Math.max.apply(null, data.map(function (d) {
    return d.row0;
  }));
  var row1-max = Math.max.apply(null, data.map(function (d) {
    return d.row1;
  }));
  var row2-max = Math.max.apply(null, data.map(function (d) {
    return d.row2;
  }));
  var row3-max = Math.max.apply(null, data.map(function (d) {
    return d.row3;
  }));
  var row4-max = Math.max.apply(null, data.map(function (d) {
    return d.row4;
  }));

  var row0-colorScale = d3.scale.linear().domain([0, row0-max]).range(["#FFF5F2", "#F9690E"]);
  var row1-colorScale = d3.scale.linear().domain([0, row1-max]).range(["#FFF5F2", "#F9690E"]);
  var row2-colorScale = d3.scale.linear().domain([0, row2-max]).range(["#FFF5F2", "#F9690E"]);
  var row3-colorScale = d3.scale.linear().domain([0, row3-max]).range(["#FFF5F2", "#F9690E"]);
  var row4-colorScale = d3.scale.linear().domain([0, row4-max]).range(["#FFF5F2", "#F9690E"]);

  var heatmap = svg.selectAll('g').data(data).enter();

  heatmap.append('rect')
  .attr("class", "block")
  .attr("x", function (d, i) {
      return i * blocksize
    })
    .attr("y", blocksize)
    .attr("width", blocksize * 1)
    .attr("height", blocksize)
    .attr("fill", function (d) {
      return ScolorScale(d.row0);
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
      return LcolorScale(d.row1);
    })

  heatmap.append('rect')
    .attr("class", "block")
    .attr("x", function (d, i) {
      return i * blocksize
    })
    .attr("y", blocksize * 3)
    .attr("width", blocksize)
    .attr("height", blocksize)
    .attr("fill", function (d) {
      return LcolorScale(d.row2);
    })

  heatmap.append('rect')
    .attr("class", "block")
    .attr("x", function (d, i) {
      return i * blocksize
    })
    .attr("y", blocksize * 4)
    .attr("width", blocksize)
    .attr("height", blocksize)
    .attr("fill", function (d) {
      return LcolorScale(d.row3);
    })

  heatmap.append('rect')
    .attr("class", "block")
    .attr("x", function (d, i) {
      return i * blocksize
    })
    .attr("y", blocksize * 5)
    .attr("width", blocksize)
    .attr("height", blocksize)
    .attr("fill", function (d) {
      return LcolorScale(d.row4);
    })



  heatmap.append('text')
    .text(function (d) {
      return d.row0
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
      return d.row1
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

  heatmap.append('text')
    .text(function (d) {
      return d.row2
    })
    .attr("x", function (d, i) {
      return i * blocksize
    })
    .attr("y", blocksize * 3.5)
    .attr("text-anchor", "middle")
    .attr("fill", "#333")
    .attr("dy", ".35em")
    .attr("dx", blocksize / 2)
    .style({
      "font-size": 25
    });

  heatmap.append('text')
    .text(function (d) {
      return d.row3
    })
    .attr("x", function (d, i) {
      return i * blocksize
    })
    .attr("y", blocksize * 4.5)
    .attr("text-anchor", "middle")
    .attr("fill", "#333")
    .attr("dy", ".35em")
    .attr("dx", blocksize / 2)
    .style({
      "font-size": 25
    });

  heatmap.append('text')
    .text(function (d) {
      return d.row4
    })
    .attr("x", function (d, i) {
      return i * blocksize
    })
    .attr("y", blocksize * 5.5)
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
    .data(["row0", "row1", "row2", "row3", "row4"])
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
