const resetHeatmap = () => {
  textarea.value = "";
  // d3.select("svg").remove()
  drawHeatmap(qwerty);
};
drawHeatmap = (layout) => {
  const width = textarea.clientWidth;
  // console.log("textareacw:" + width);
  const height = width * 0.5;
  const margin = {
    top: height * 0.05,
    bottom: height * 0.05,
    left: width * 0.05,
    right: width * 0.05
  }
  const colsize = 14;
  const blocksize = (width - margin.left - margin.right) / colsize;

  d3.json(layout).then((data) => {
    /* Count chars matching */
    const uploadedText = textarea.value;
    const character = Array.from(uploadedText);
    for (let j in character) {
      for (let i in data) {
        if (character[j].toUpperCase() == data[i].char) {
          data[i].val++;
        }
      }
    }

    /* create colorScale */
    const min = Math.min.apply(null, data.map((d) => {
      return d.val;
    }));
    const max = Math.max.apply(null, data.map((d) => {
      return d.val;
    }));
    // const colorScale = d3.scale.linear().domain([min, max]).range(["#F2F1EF", "#F22613"]);
    const colorScale = d3.scaleLinear().domain([min, max]).range(["#F2F1EF", "#F22613"]);

    d3.select("svg").remove(); // erase previous svg

    /* draw heatmap */
    const svg = d3.select("#heatmap").append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



    // const dragstarted = (d) => {
    //   d3.event.sourceEvent.stopPropagation();
    //   d3.select(this).classed("dragging", true);
    // };
    // const dragged = (d) => {
    //   d3.select(this).attr("x", d.x = d3.event.x).attr("y", d.y = d3.event.y);
    // };
    // const dragended = (d) => {
    //   d3.select(this).classed("dragging", false);
    // };
    // var drag = d3.behavior.drag()
    //   .on("dragstart", dragstarted)
    //   .on("drag", dragged)
    //   .on("dragend", dragended);

    svg.selectAll('g').data(data).enter()
      .append('rect')
      .attr("id", "block")
      .attr("class", "block")
      .attr("x", (d, r) => {
        return blocksize * (r % colsize);
      })
      .attr("y", (d, r) => {
        return blocksize * (data[r].row - 1);
      })
      .attr("width", blocksize)
      .attr("height", blocksize)
      .attr("rx", 10)
      .attr("ry", 10)
      .attr("fill", (d) => {
        return (d.char) ? colorScale(d.val) : '#FFF';
      })
      .attr('stroke', '#ccc')
      // .on("click", (d, i) => {
      //   if (d3.event.defaultPrevented) return; // click suppressed
      //   console.log("clicked!");
      //   textarea.value += data[i].char;
      //   count_char.innerHTML = 'Char...' + countChar(textarea.value);
      //   drawHeatmap(layout);
      // })

      // .on("drag", (d, i) => {
      //   d3.select(svg).attr({
      //     'x': d3.event.x,
      //     'y': d3.event.y
      //   })
      // })
      // .call(drag)
      // .call(d3.behavior.drag())
      //   .on('drag', drag))
      .attr('stroke-dasharray', '3,3')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', '1')
      .transition()
      // .delay((d, i)=>{ return i * 100 })
      .duration(100)
      .ease(d3.easeExpOut)
      .attr("rx", 20)
      .attr("ry", 20)
      .transition()
      .duration(50)
      .ease(d3.easeExpOut)
      .attr("rx", 10)
      .attr("ry", 10)

    svg.selectAll('g').data(data).enter()
      .append('text')
      .text((d) => {
        return d.char + "(" + d.val + ")";
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
        "font-size": blocksize * 0.2
      });

    const xLabels = svg.selectAll(".Label")
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
      .style("font-size", blocksize * 0.2)
      .style("text-anchor", "middle")
      .attr("transform", "translate(" + 0 + "," + 0 + ")");

    const yLabels = svg.selectAll(".Label")
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
      .style("font-size", blocksize * 0.2)
      .style("text-anchor", "end")
      .attr("transform", "translate(" + 0 + "," + 0 + ")");

  });
};


// drag = (d) => {
//   console.log('ab');
//   d3.behavior.drag()
//     .on("drag", () => {
//       d3.select(this)
//         .attr({
//           x: d3.event.x,
//           y: d3.event.y
//         })
//     });
// };

//TODO
// var zoom = d3.behavior.zoom()
//     .translate(d3.select("svg").enter().translate())
//     .scale(d3.select("svg").scale())
//     .scaleExtent([height, 8 * height])
//     .on("zoom", zoomed);

//TODO
// const arr = (new Array(4)).fill(1).map((v, i) => v + i)
// console.log(arr);
// console.log(data[1].row);
// console.log(() => (d){return d.ro/w});
// const row = data.map(() => (d){ return d.row; })
// for(let k in data) {
//   if(data.hasOwnProperty(k)) {
//     console.log(k+ ':' + data[k]);
// }
//   }

//todo
// svg.selectAll('g').data(data)
//   .on("click", ()=>{
//   console.log(this);
//   svg.select(this).attr("x", (d, r) => {
//     return blocksize * (r % colsize+1);
//   })
//   .attr("y", (d, r) => {
//     return blocksize * (data[r].row );
//   });})

//todo
// d3.selectAll('#block')
// .on('drag', drag )
// .call(drag)
// .call(d3.behavior.drag()
//   .on("start", dragstarted)
//   .on("drag", dragged)
//   .on("end", dragended));

// function dragstarted(d) {
//   if (!d3.event.active) line_force.alphaTarget(0.3).restart();
//   d.fx = d.x;
//   d.fy = d.y;
// }

// function drag(d) {
//   d.x = d3.event.x;
//   d.y = d3.event.y;
// }

// function dragended(d) {
//   if (!d3.event.active) line_force.alphaTarget(0);
//   d.fx = null;
//   d.fy = null;
// }

// var drag = d3.behavior.drag()
//             .on("drag", function(d) {
//               d.x = d3.event.x;
//               d.y = d3.event.y;
//               d3.select(this).attr("x", d.x).attr("y", d.y);
//             });
