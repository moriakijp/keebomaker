drawHeatmap = (layout) => {
  const width = textarea.clientWidth;
  // console.log("textareacw:" + width);
  const height = innerHeight;
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


    // /* Create layout.json from user input layout */
    // for (i in data) data[i].val = 0;
    // data[0].cost = '1';

    /* create colorScale */
    const min = Math.min.apply(null, data.map(d => d.val));
    const max = Math.max.apply(null, data.map(d => d.val));
    const colorScale = d3.scaleLinear().domain([min, max]).range(["#F2F1EF", "#F22613"]);

    const createScale = (array, scaledmin, scaledmax) => {
      const min = Math.min.apply(null, array);
      const max = Math.max.apply(null, array);
      return d3.scaleLinear().domain([min, max]).range([scaledmax, scaledmax]);
    }

    d3.select("svg").remove(); // erase previous svg


    /* drag */
    function dragstarted(d) {
      d3.select(this).raise().select("text").classed("active", true);
      console.log('this: ', this);
    };

    function dragged(d) {
      d3.select(this).select("rect")
        .attr("x", d.x = d3.event.x)
        .attr("y", d.y = d3.event.y)
        .attr("transform", `translate(-${margin.left+blocksize/2}, -${ margin.top+blocksize/2 })`)

      d3.select(this).select("text")
        .attr("x", d.x = d3.event.x)
        .attr("y", d.y = d3.event.y)
        .attr("transform", `translate(-${margin.left+blocksize/2}, -${ margin.top+blocksize/2 })`)

    };

    function dragended(d) {
      d3.select(this).select("text").classed("active", false);
    };
    var drag = d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);

    /* draw heatmap */
    const keys = d3
      .select("#heatmap")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .selectAll("g")
      .data(data)
      .enter()
      .append("g")
      .attr("transform", `translate(${margin.left}, ${ margin.top })`)
      .call(drag)
      .on("click", (d, i) => {
        // if (d3.event.defaultPrevented) return; // click suppressed
        textarea.value += data[i].char;
        count_char.innerHTML = 'Char...' + countChar(textarea.value);
        drawHeatmap(layout);
      })


    keys
      .append('rect')
      .attr("x", (d, i) => blocksize * (i % colsize))
      .attr("y", (d, i) => blocksize * (data[i].row - 1))
      .attr("width", blocksize)
      .attr("height", blocksize)
      .attr("rx", 10)
      .attr("ry", 10)
      .attr("fill", d => (d.char) ? colorScale(d.val) : '#FFF')
      .style("opacity", 0.9)
      .attr('stroke', '#ccc')
      .attr('stroke-dasharray', '3,3')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', '1')
      .transition()
      // .delay((d, i)=>{ return i * 100 })
      .duration(300)
      .ease(d3.easeExpOut)
      .attr("rx", 30)
      .attr("ry", 30)
      .transition()
      .duration(200)
      .ease(d3.easeExpOut)
      .attr("rx", 10)
      .attr("ry", 10)

    keys.append('text')
      // .attr('class', 'text')
      .text(d => {
        if (d.char && d.val) return `${d.char}(${d.val})`;
        else if (d.char) return `${d.char}`;
        else return "";
      })
      .attr("x", (d, r) => blocksize * (r % colsize))
      .attr("y", (d, r) => blocksize * (data[r].row - 1))
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("fill", "#333")
      .attr("dx", blocksize / 2)
      .attr("dy", blocksize / 2)
      .style("font-size", d => d.val ? blocksize * 0.2 : blocksize * 0.4);

    /* calc distance from home position as 'cost'  */

    // calcAbspos = (d) => Math.floor(Math.sqrt(d.row ** 2 + d.col ** 2));
    // data[i].abspos = calcAbspos(data[i]);

    const home = [];
    const homerow = [3]
    const homecol = [2, 3, 4, 5, 8, 9, 10, 11];
    for (i in data)
      if (homerow.includes(data[i].row) && homecol.includes(data[i].col))
        home.push(data[i]);

    calcRelpos = (d, i) => Math.sqrt((d.row - i.row) ** 2 + (d.col - i.col) ** 2);

    for (i in data) {
      data[i].sum = 0;
      for (j in home) {
        data[i].sum += data[i].relpos = calcRelpos(home[j], data[i]);
      }
      data[i].ave = data[i].sum / home.length;
      data[i].cost = (data[i].val * data[i].ave).toFixed(1);
      // data[i].cost = createScale(, 0, 100);
    }


    keys
      .append('text')
      // .attr('class', 'text')
      .text(d => d.char ? d.cost : "")
      .attr("x", (d, r) => blocksize * (r % colsize))
      .attr("y", (d, r) => blocksize * (data[r].row - 1))
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("dx", blocksize / 2)
      .attr("dy", blocksize / 2 + 20)
      .attr("fill", "orange")
      .style("font-size", blocksize * 0.2);


    const xLabels = keys.selectAll(".Label")
      .data(data)
      .enter().append("text")
      .text((d) => `C${d.col}`)
      .attr("x", (d, i) => blocksize * ((i % colsize) + 0.5))
      .attr("y", 0)
      .attr("fill", "#333")
      .style("font-size", blocksize * 0.2)
      .style("text-anchor", "middle")
      .attr("transform", `translate(${0}, ${0})`);

    const yLabels = keys.selectAll(".Label")
      .data(data)
      .enter().append("text")
      .text(d => `R${d.row}`)
      .attr("fill", "#333")
      .attr("x", 0)
      .attr("y", (d, i) => blocksize * (data[i].row - 0.5))
      .style("font-size", blocksize * 0.2)
      .style("text-anchor", "end")
      .attr("transform", `translate(${0}, ${0})`);

  });
};


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
