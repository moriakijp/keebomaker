// import * as d3 from 'd3'
// import {
//   downloadable
// } from 'd3-downloadable'

// d3.select('svg#heatmap-main')
//   .call(downloadable());

drawHeatmap = layout => {
  const width = document.getElementById("heatmap-main").clientWidth;
  const height = document.getElementById("heatmap-main").clientHeight;
  const margin = {
    top: height * 0.20,
    bottom: height * 0.05,
    left: width * 0.05,
    right: width * 0.05
  };
  const colsize = select_col.value;
  const rowsize = select_row.value;

  // for (i = 0; i < rowsize; i++)
  //   for (j = 0; j < colsize; j++)
  //     if (data[i][j] == letters[i].toUpperCase())
  //       data.count++;

  const rectwidth = rectheight = (width - margin.left - margin.right) / colsize;

  d3.json(layout).then(data => {
    d3.select("svg").remove(); // erase previous svg
    // for (i = 0; i < rowsize; i++) {
    //   for (j = 0; j < colsize; j++) {
    //     data[i][j].col = j;
    //     data[i][j].row = i;
    //   }
    // }

    // const obj = data.map(x =>
    //   x.reduce((acc, cur) => {
    //     acc.push(...cur);
    //   }, [])
    // );

    // const obj = data.map((char) => ({
    //   char
    // }));


    /* LAYOUT DATA CLEANING & ADD PROPERTY */
    for (i in data) {
      data[i] = data[i].map(char => ({
        char: char,
        col: data[i].indexOf(char),
        row: i
      }));
    }
    // data = flatten(data).filter(v => v.char !== "");
    data = flatten(data);
    for (i in data)
      if (data[i].char === "") data[i].col = i % colsize;


    // for (i in data)
    //   if (data[i].char === "") {
    //     tmp = data[i].col.shift();
    //     data[i].col = tmp;
    //   }

    // for (i in data) {
    //   tmp = data[i].col;
    //   while (tmp = data[i].col.shift())
    //     console.log('tmp: ', tmp);


    // for (j in data[i])
    //   if (data[i].col.length > 1)
    //     data[i].col = data[i].col.shift();
    //   else if (data[i].col.length == 1)
    //   data[i].col = data[i].col[0];
    // }

    // for (i in rowsize)
    //   for (j in colsize) {
    //     data[i][j].char = data[i][j];
    //     data[i][j].col = i % colsize + 1;
    //     data[i][j].row = Math.floor(i / colsize) + 1;
    //   }
    const letters = Array.from(textarea_main.value);
    // console.log('letters : ', letters);
    let matched,
      current,
      prev,
      home = [];
    const homerow = [3];
    const homecol = [2, 3, 4, 5, 8, 9, 10, 11];
    const calcRelpos = (a, b) =>
      Math.sqrt((a.row - b.row) ** 2 + (a.col - b.col) ** 2);

    /* COUNT COST */
    for (i in data) data[i].count = 0;
    for (j in letters)
      for (i in data)
        if (letters[j].toUpperCase() == data[i].char) data[i].count++;

    /* DISTANCE COST */

    // for (j in letters) {
    //   for (i in data) {
    //     // if (i == letters[0]) matched.push(data[i]);
    //     if (letters[j].toUpperCase() == data[i].char) {
    //       prev.push(current.length != 0 ? current : data[i])
    //       current.push(data[i])
    //       console.log('current: ', current);
    //       console.log('prev: ', prev);
    //       data[i].dist = calcRelpos(current.shift(), prev.shift());
    //       console.log(`data[${i}].dist: `, data[i].dist);
    //       // if (letters[0]) prevc.push(data[i])
    //       if (letters[j] == letters[0]) matched.push(data[i]);
    //       console.log(Array.of(data[i].dist));
    //     }
    //   }
    // }

    // console.log(matched);
    // console.log(matched.length);

    // for (i in matched) {
    //   current = data[i]
    //   prev = data.length ? data[data.length - 1] : current
    //   data[i].dist = calcRelpos(current, prev);
    //   console.log(`data[${i}].dist: `, data[i].dist);
    // }

    // console.log(`data[${i}].dist: `, data[i].dist.toFixed(1));
    // data[i].dist = (data[i] != data[0]) ? calcRelpos(, data[i]) : 0;

    // for (j in letters)
    //   for (i in data)
    //     if (letters[j].toUpperCase() == data[i].char)
    //       matched.push(data[i]);
    // console.log('matched: ', matched);

    // for (i in data) data[i].dist = 0;
    // for (j in matched) {
    //   for (i in data) {
    //     if (matched[j] == data[i])
    //       data[i].dist = calcRelpos(matched[j], data[i]);
    //   }
    //   console.log('data[i].dist: ', data[i].dist);
    // }

    /* POSITION COST */
    for (i in data)
      if (homerow.includes(data[i].row) && homecol.includes(data[i].col))
        home.push(data[i]);
    for (i in data) {
      data[i].sum = 0;
      for (j in home) data[i].sum += calcRelpos(home[j], data[i]);
      data[i].pos = data[i].sum / home.length;
    }

    /* CALC AND SCALE */
    for (i in data) data[i].cost = data[i].count * data[i].pos;
    const costmin = Math.min.apply(null, data.map(d => d.cost));
    const costmax = Math.max.apply(null, data.map(d => d.cost));
    const costScale = d3
      .scaleLinear()
      .domain([costmin, costmax])
      .range([0, 10]);
    for (i in data) data[i].cost = costScale(data[i].cost).toFixed(0);

    /* CREATE SCALE */
    const countmin = Math.min.apply(null, data.map(d => d.count));
    const countmax = Math.max.apply(null, data.map(d => d.count));
    const colorScale = d3
      .scaleLinear()
      .domain([countmin, countmax])
      .range(["#F2F1EF", "#F22613"]);

    /* DRAG BEHAVIOR */
    //this = nodes[i] !=document.getElementById('keys')

    const dragstarted = (d, i, nodes) => {
      d3
        .select(nodes[i])
        .raise()
        .classed("active", true)
        .select("rect")
        .attr("fill", "aquamarine");
    };

    const dragged = (d, i, nodes) => {
      d3
        .select(nodes[i])
        .select("rect")
        .attr("x", (d.x = d3.event.x))
        .attr("y", (d.y = d3.event.y))
        .attr(
          "transform",
          `translate(-${margin.left + rectwidth / 2}, -${margin.top +
          rectheight / 2})`
        );
      d3
        .select(nodes[i])
        .select("text.char")
        .attr("x", (d.x = d3.event.x))
        .attr("y", (d.y = d3.event.y))
        .attr(
          "transform",
          `translate(-${margin.left + rectwidth / 2}, -${margin.top +
            rectheight / 2})`
        );
      d3
        .select(nodes[i])
        .selectAll("text.count")
        // .selectAll('*')
        .attr("x", (d.x = d3.event.x))
        .attr("y", (d.y = d3.event.y))
        .attr(
          "transform",
          `translate(-${margin.left + rectwidth / 2}, -${margin.top +
      rectheight / 2})`
        );
    };

    const dragended = (d, i, nodes) => {
      d3
        .select(nodes[i])
        .classed("active", false)
        .select("rect")
        .attr(
          "fill",
          d => (d.char && check_color.checked ? colorScale(d.count) : "#FFF")
        );
    };

    const drag = d3
      .drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);

    const easeKeys = (d, i, nodes) => {
      console.log("nodes[i]: ", nodes[i]);
      d3
        .select(nodes[i])
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
        .attr("ry", 10);
    };

    const mouseover = (d, i, nodes) => {
      d3.select(nodes[i])
        .classed("active", true)
        .select("circle")
        .attr("fill", "red");
    }

    // const zoom = (d, i, nodes) => {
    //   keys.attr("transform", d3.event.transform);
    // }


    /* DRAW HEATMAP */
    const svg_main = d3
      .select("#heatmap-main")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("font-family", "Arial");

    const keys = svg_main
      .selectAll("g")
      .data(data)
      .enter()
      .append("g")
      .attr("id", "keys")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .attr("cursor", "move")
      .call(drag)
      .on("click", (d, i, nodes) => {
        // if (d3.event.defaultPrevented) return; // click suppressed
        // textarea_main.value += check_shift.checked ? data[i].char.toUpperCase() : data[i].char.toLowerCase();
        textarea_main.value += data[i].char.toLowerCase();
        label_char.innerHTML = "Char..." + countChar(textarea_main.value, textarea_layout.value);
        drawHeatmap(layout);
        // easeKeys(d, i, nodes);
      })
    // .on('zoom', zoom);

    keys
      .append("rect")
      .attr("class", "key")
      .attr("x", d => rectwidth * d.col) // considering "" does not have .col
      .attr("y", d => rectheight * d.row)
      .attr("width", rectwidth)
      .attr("height", rectheight)
      .attr("rx", 10)
      .attr("ry", 10)
      .attr(
        "fill",
        d => (d.char && check_color.checked ? colorScale(d.count) : "#FFF")
      )
      .style("opacity", 0.9)
      .attr("stroke", "#ccc")
      .attr("stroke-dasharray", "3,3")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", "1")
    // .call(mouseover)

    // keys
    //   .append("circle")
    //   .attr("class", "top_handle")
    //   .attr("cx", d => rectwidth * d.col)
    //   .attr("cy", d => rectheight * d.row)
    //   .attr("dy", d => rectwidth * 0.5)
    //   .attr("r", rectwidth * 0.05)
    //   .attr("fill", "grey")
    //   .attr("transform", `translate(${rectwidth * 0.05}, ${rectwidth*0.5})`)


    keys
      .append("text")
      .attr("class", "char")
      .text(d => d.char)
      .attr("x", d => rectwidth * d.col)
      .attr("y", d => rectheight * d.row)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("dx", rectwidth * 0.5)
      .attr("dy", rectheight * 0.5)
      .attr("fill", "black")
      .style("font-size", rectwidth * 0.3);

    keys
      .append("text")
      .attr("class", "count")
      // .text(d => (d.char && d.count != 0 ? d.count : ''))
      .text(d => (check_count.checked && d.count != 0 ? d.count : ""))
      .attr("x", d => rectwidth * d.col)
      .attr("y", d => rectheight * d.row)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("dx", rectwidth * 0.75)
      .attr("dy", rectheight * 0.75)
      .attr("fill", "black")
      .style("font-size", rectwidth * 0.2)

    var xScale = d3.scaleBand()
      .domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
      .range([0, width]);

    // svg_main.data(data).enter()
    keys
      .append("text")
      .attr("id", "xAxisLabel")
      .attr("class", "axislabel")
      .text(d => `C${d.col}`)
      .attr("x", d => rectwidth * d.col)
      .attr("y", 0)
      // .call(d3.axisTop(xScale))
      .attr("fill", "#333")
      .style("font-size", rectwidth * 0.2)
      .style("text-anchor", "middle")
      .attr("transform", `translate(${rectwidth*0.5}, ${-rectheight*0.25})`);

    keys
      .append("text")
      .attr("id", "yAxisLabel")
      .attr("class", "axislabel")
      .text(d => `R${d.row}`)
      .attr("x", 0)
      .attr("y", d => rectheight * d.row)
      .attr("fill", "#333")
      .style("font-size", rectwidth * 0.2)
      .style("text-anchor", "end")
      .attr("transform", `translate(${-rectwidth*0.25}, ${rectheight*0.5})`);

  });

};

//TODO
// const zoomed = (element) =>{
//   element.attr("transform", d3.event.transform);
// }

// var zoom = d3.zoom()
//     .translate(d3.select('svg').enter().translate())
//     .scale(d3.select('svg').scale())
//     .scaleExtent([height, 8 * height])
//     .on('zoom', zoomed);



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
