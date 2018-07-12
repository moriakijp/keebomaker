let heatmap = () => {
  // ! console.log(innerWidth);
  // ! console.log(innerHeight);
  //! console.log(screen.width);
  //! console.log(document.getElementById('content').clientWidth);
  //! console.log(document.getElementById('content').offsetWidth);
  let width = document.getElementById('content').clientWidth;
  let height = width * 0.5;
  let margin = {
    top: height * 0.05,
    bottom: height * 0.05,
    left: width * 0.05,
    right: width * 0.05
  }
  let colsize = 14;
  let blocksize = (width - margin.left - margin.right)  / colsize;

  /* character match detection */
  d3.json("data/qwerty.json", (errer, data) => {
    uploadedText = document.getElementById('upload-text').value;
    let character = Array.from(uploadedText);
    for (let j in character) {
      for (let i in data) {
        if (character[j].toUpperCase() == data[i].char) {
          data[i].val++;
          //! console.log(data[i].val);
        }
      }
    }

    d3.select("svg").remove();
    let svg = d3.select("#heatmap").append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let min = Math.min.apply(null, data.map((d) => {
      return d.val;
    }));
    let max = Math.max.apply(null, data.map((d) => {
      return d.val;
    }));

    let colorScale = d3.scale.linear().domain([min, max]).range(["#F2F1EF", "#F22613"]);

    let heatmap = svg.selectAll('g').data(data).enter();

    // let arr = (new Array(4)).fill(1).map((v, i) => v + i)

    // console.log(arr);
    // console.log(data[1].row);
    // console.log(() => (d){return d.ro/w});
    // let row = data.map(() => (d){ return d.row; })
    // for(let k in data) {
    //   if(data.hasOwnProperty(k)) {
    //     console.log(k+ ':' + data[k]);
    //   }
    // }

    heatmap.append('rect')
      .attr("class", "block")
      .attr("x", (d, r) => {
        return blocksize * (r % colsize);
      })
      .attr("y", (d, r) => {
        return blocksize * (data[r].row - 1);
      })
      .attr("width", blocksize)
      .attr("height", blocksize)
    // .attr("rx", 50)
      // .attr("ry", 50)
      .attr("fill", (d) => {
        return (d.char) ? colorScale(d.val) : '#FFFFFF';
      })
      // .transition()
      // .delay(function(d,i){return i * 100})
      // .duration(2000)
      // .ease("elastic")
      // .attr("rx", 0)
      // .attr("ry", 0);

    heatmap.append('text')
      .text((d) => {
        return d.char;
      })
      .attr("x", (d, r) => {
        return blocksize * (r % colsize);
      })
      .attr("y", (d, r) => {
        return blocksize * (data[r].row - 1);
      })
      .attr("text-anchor", "middle")
      .attr("fill", "#333")
      .attr("dx", blocksize / 2)
      .attr("dy", blocksize / 2)
      .style({
        "font-size":  blocksize * 0.4
      });

    let xLabels = svg.selectAll(".Label")
      .data(data)
      .enter().append("text")
      .text((d) => {
        return "C" + String(d.col);
      })
      .attr("x", (d, i) => {
        return blocksize * ((i % colsize) + 0.5);
      })
      .attr("y", 0)
      .attr("fill", "#333")
      .style({
        "font-size":  blocksize * 0.2
      })
      .style("text-anchor", "middle")
      .attr("transform", "translate(" + 0 + "," + 0 + ")");

    let yLabels = svg.selectAll(".Label")
      .data(data)
      .enter().append("text")
      .text((d) => {
        return "R" + String(d.row);
      })
      .attr("fill", "#333")
      .attr("x", 0)
      .attr("y", (d, i) => {
        return blocksize * (data[i].row - 0.5);
      })
      .style({
        "font-size": blocksize * 0.2
      })
      .style("text-anchor", "end")
      .attr("transform", "translate(" + 0 + "," + 0 + ")");
  });
};

let reset = () => {d3.select("svg").remove()};
