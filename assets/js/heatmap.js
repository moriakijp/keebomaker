// import * as d3 from 'd3';
// import { downloadable } from 'd3-downloadable';

drawHeatmap = () => {
  const width = document.getElementById("heatmap-main").clientWidth;
  const height = document.getElementById("heatmap-main").clientHeight;
  const margin = {
    top: height * 0.2,
    bottom: height * 0.05,
    left: width * 0.05,
    right: width * 0.05
  };
  const colsize = select_col.value;
  const rowsize = select_row.value;

  const rectwidth = (rectheight =
    (width - margin.left - margin.right) / colsize);
  let data = JSON.parse(`[${textarea_layout.value}]`);
  d3.select("svg").remove(); /* erase previous svg */

  //# LAYOUT DATA CLEANING & ADD PROPERTY - "id" "col"
  let id = 0;
  for (i in data) {
    data[i] = data[i].map(char => {
      id++;
      // console.log("data.map(v => v.length): ", data.map(v => v.length));
      return {
        id: id,
        char: char,
        col: i == 0 ? id - 1 : id - 1 - recSum(data.map(v => v.length), i),
        //? col : (id     - 1) % data[i].length,
        row: Number(i),
        x:
          rectwidth *
          (i == 0 ? id - 1 : id - 1 - recSum(data.map(v => v.length), i)),
        y: rectheight * i
      };
    });
  }

  // data = flatten(data).filter(v => v.char !== "");
  data = flatten(data);
  console.log("data: ", data);
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
  const calcDistance = (x1, y1, x2, y2) =>
    ((x1 - x2) ** 2 + (y1 - y2) ** 2) ** (1 / 2);

  //# COUNT COST
  for (i in data) data[i].count = 0;
  for (j in letters)
    for (i in data) {
      if (letters[j].toUpperCase() == data[i].char.toUpperCase())
        data[i].count++;
    }
  // data.reduce((a, b) => {
  //   a[b] = a[b] ? a[b] + 1 : 1;
  //   return a;
  // }, []);

  ////# PARTIAL MATCH OF NUMBER OF CHARACTER STRINGS
  // for (i in data) {
  //   const pattern = new RegExp(data[i].char +"|| []", "g");
  //   let countmatched = (textarea_main.value.match(pattern) || [] ).length;
  //   if (countmatched) data[i].count += countmatched;
  // }

  //# DISTANCE COST
  // for (j in letters) {
  // for (i in data) {
  // if (i == letters[0]) matched.push(data[i]);
  // if (letters[j].toUpperCase() == data[i].char) {
  // prev.push(current.length != 0 ? current : data[i])
  // current.push(data[i])
  // console.log('current: ', current);
  // console.log('prev: ', prev);
  // data[i].dist = calcRelpos(current.shift(), prev.shift());
  // console.log(`data[${i}].dist: `, data[i].dist);
  //  if (letters[0]) prevc.push(data[i])
  // if (letters[j] == letters[0]) matched.push(data[i]);
  // console.log(Array.of(data[i].dist));
  // }
  // }
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

  //# POSITION COST
  for (i in data)
    if (homerow.includes(data[i].row) && homecol.includes(data[i].col))
      home.push(data[i]);
  for (i in data) {
    data[i].sum = 0;
    for (j in home) data[i].sum += calcRelpos(home[j], data[i]);
    data[i].pos = data[i].sum / home.length;
  }

  //# CALC AND SCALE
  for (i in data) data[i].cost = data[i].count * data[i].pos;
  const costmin = Math.min.apply(null, data.map(d => d.cost));
  const costmax = Math.max.apply(null, data.map(d => d.cost));
  const costScale = d3
    .scaleLinear()
    .domain([costmin, costmax])
    .range([0, 10]);

  for (i in data) data[i].cost = costScale(data[i].cost).toFixed(0);

  //# CREATE SCALE
  const countmin = Math.min.apply(null, data.map(d => d.count));
  const countmax = Math.max.apply(null, data.map(d => d.count));
  const colorScale = d3
    .scaleLinear()
    .domain([countmin, countmax])
    .range(["#F2F1EF", "#F22613"]);

  //this = nodes[i] !=document.getElementById('keys')

  //# DRAG BEHAVIOR
  const dragstarted = (d, i, nodes) => {
    d3
      .select(nodes[i])
      .classed("active", true)
      .raise()
      .select("rect.key")
      .classed("selected", true);
    // .attr("fill", "aquamarine");
  };

  const dragged = (d, i, nodes) => {
    // console.log('nodes[i]: ', nodes[i]);

    // console.log('d3.selectAll(\'g\'): ', d3.selectAll('g').filter((d,i)=>d.active));

    // nudge(d3.event.dx, d3.event.dy);
    d3
    // .select(nodes[i])
    .selectAll('.active')
    // .selectAll('g#keys.active')
    .selectAll("*")
    // .attr("x", (d.x = d3.event.x))
    // .attr("y", (d.y = d3.event.y))
    // .attr("x", (d, i, nodes) => (d.x + d3.event.x))
    // .attr("y", (d, i, nodes) => (d.y + d3.event.y))
    .attr("x", (d, i, nodes) => (d.x + d3.event.dx))
    .attr("y", (d, i, nodes) => (d.y + d3.event.dy))
    // .attr("transform", d => `translate(${d3.event.x - d.dx}, ${d3.event.y - d.dy})`);
    d3
      .select(nodes[i])
      .selectAll("circle")
      .attr("cx", (d.x = d3.event.x))
      .attr("cy", (d.y = d3.event.y));
    d3
      .select(nodes[i])
      .selectAll("circle.left")
      .attr("transform", `translate(${rectwidth * 0.1}, ${rectheight * 0.5})`);
    d3
      .select(nodes[i])
      .selectAll("circle.right")
      .attr(
        "transform",
        `translate(${rectwidth * (1 - 0.1)}, ${rectheight * 0.5})`
      );
    d3
      .select(nodes[i])
      .selectAll("circle.top")
      .attr("transform", `translate(${rectwidth * 0.5}, ${rectheight * 0.1})`);
    d3
      .select(nodes[i])
      .selectAll("circle.bottom")
      .attr(
        "transform",
        `translate(${rectwidth * 0.5}, ${rectheight * (1 - 0.1)})`
      );
  };

  // const nudge = (dx, dy) => {
  //   console.log("d3.selectAll('g#keys'): ", d3.selectAll("g#keys").selectAll("*").filter(d=>d.selected));
  //   return d3
  //     .selectAll("g#keys").filter(d => { d.active}).selectAll("*")
  //     .attr("x", d => { d.x += dx; })
  //     .attr("y", d => { d.y += dy; });
  // };

  const dragended = (d, i, nodes) => {
    d3
      // .select(nodes[i])
      .selectAll(".active")
      .classed("active", false)
      .select("rect.key")
      .classed("selected", false);
    // .attr("x", d => {
    //   console.log('nodes[i + 1].x: ', nodes[i + 1].x);
    //   if (d3.event.x > nodes[i + 1].x) /* align to grid */
    //     return nodes[i + 1].x;
    // })
    // .attr("y", d => {})
    // .attr("fill", d => (d.char && check_color.checked ? colorScale(d.count) : "#FFF"));
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

  // const zoom = (d, i, nodes) => {
  //   keys.attr("transform", d3.event.transform);
  // }

  //# DRAW HEATMAP
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
    // .style("margin", "30vw")
    .attr("cursor", "move")
    .call(drag)
    .on("click", (d, i, nodes) => {
      // if (d3.event.defaultPrevented) return; // click suppressed
      textarea_main.value += d3.event.shiftKey
        ? data[i].char.toUpperCase()
        : data[i].char.toLowerCase();
      label_char.innerHTML =
        "Char..." + countChar(textarea_main.value, textarea_layout.value);
      drawHeatmap();
    });
  // easeKeys(d, i, nodes);
  // .on('zoom', zoom);

  // keys
  //   .append("rect")
  //   .attr("class", "frame")
  //   .attr("x", d => rectwidth * d.col)
  //   .attr("y", d => rectheight * d.row)
  //   .attr("width", rectwidth)
  //   .attr("height", rectheight)
  //   .attr("rx", 10)
  //   .attr("ry", 10)
  //   .attr("fill", "white")
  //   .attr("stroke", "#ccc")
  //   .attr("stroke-dasharray", "3,3")
  //   .attr("stroke-linecap", "round")
  //   .attr("stroke-width", "1")

  const rects = keys
    .append("rect")
    .attr("class", "key")
    .attr("x", d => d.x)
    .attr("y", d => d.y)
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
    .attr("stroke-width", "1");

  // .call(mouseover)

  keys
    .append("circle")
    .attr("class", "left")
    .attr("cx", d => rectwidth * d.col)
    .attr("cy", d => rectheight * d.row)
    .attr("r", rectwidth * 0.05)
    .attr("fill", "white")
    .attr("style", "stroke: #ccc")
    .attr("transform", `translate(${rectwidth * 0.1}, ${rectheight * 0.5})`);

  keys
    .append("circle")
    .attr("class", "right")
    .attr("cx", d => rectwidth * d.col)
    .attr("cy", d => rectheight * d.row)
    .attr("r", rectwidth * 0.05)
    .attr("fill", "white")
    .attr("style", "stroke: #ccc")
    .attr(
      "transform",
      `translate(${rectwidth * (1 - 0.1)}, ${rectheight * 0.5})`
    );
  keys
    .append("circle")
    .attr("class", "top")
    .attr("cx", d => rectwidth * d.col)
    .attr("cy", d => rectheight * d.row)
    .attr("r", rectwidth * 0.05)
    .attr("fill", "white")
    .attr("style", "stroke: #ccc")
    .attr("transform", `translate(${rectwidth * 0.5}, ${rectheight * 0.1})`);
  keys
    .append("circle")
    .attr("class", "bottom")
    .attr("cx", d => rectwidth * d.col)
    .attr("cy", d => rectheight * d.row)
    .attr("r", rectwidth * 0.05)
    .attr("fill", "white")
    .attr("style", "stroke: #ccc")
    .attr(
      "transform",
      `translate(${rectwidth * 0.5}, ${rectheight * (1 - 0.1)})`
    );

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
    .style("font-size", d =>
      Math.min(rectwidth * 0.3, rectwidth / d.char.length ** 0.8)
    );
  // .attr("transform", `translate(${rectwidth * 0.5}, ${rectheight * 0.5})`);

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
    .style("font-size", rectwidth * 0.2);

  // var xScale = d3
  //   .scaleBand()
  //   .domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  //   .range([0, width]);

  svg_main
    .append("g")
    .selectAll("g")
    // .select("g")
    .data(data.filter(d => d.row == 1))
    .enter()
    // keys
    .append("text")
    .attr("id", "xAxisLabel")
    .attr("class", "axislabel")
    .text(d => `C${d.col + 1}`)
    .attr("x", d => rectwidth * d.col)
    .attr("y", 0)
    // .call(d3.axisTop(xScale))
    .attr("fill", "#333")
    .style("font-size", rectwidth * 0.2)
    .style("text-anchor", "middle")
    .attr(
      "transform",
      `translate(${rectwidth * 0.5 + margin.left}, ${-rectheight * 0.25 +
        margin.top})`
    );

  svg_main
    .append("g")
    .selectAll("g")
    .data(data.filter(d => d.col == 1))
    .enter()
    // keys
    .append("text")
    .attr("id", "yAxisLabel")
    .attr("class", "axislabel")
    .text(d => `R${d.row + 1}`)
    .attr("x", 0)
    .attr("y", d => rectheight * d.row)
    .attr("fill", "#333")
    .style("font-size", rectwidth * 0.2)
    .style("text-anchor", "end")
    .attr(
      "transform",
      `translate(${-rectwidth * 0.25 + margin.left}, ${rectheight * 0.5 +
        margin.top})`
    );
  // });
  //# LASSO BEHAVIOR
  const lassostarted = () => {
    lasso
      .items()
      .classed("active", false)
      .select("rect")
      .classed("not_possible", true)
      .classed("selected", false);
  };

  const lassoed = () => {
    lasso
      .possibleItems()
      .select("rect")
      .classed("not_possible", false)
      .classed("possible", true);
    lasso
      .notPossibleItems()
      .select("rect")
      .classed("not_possible", true)
      .classed("possible", false);
  };

  const lassoended = () => {
    lasso
      .items()
      .select("rect")
      .classed("not_possible", false)
      .classed("possible", false);
    lasso
      .selectedItems()
      .classed("active", true)
      .select("rect")
      .classed("selected", true);
  };

  const lasso = d3
    .lasso()
    .closePathDistance(75)
    .closePathSelect(true)
    .hoverSelect(true)
    .items(keys)
    .targetArea(svg_main)
    .on("start", lassostarted)
    .on("draw", lassoed)
    .on("end", lassoended);

  svg_main.call(lasso);
};

const updateHeatmap = () => {
  // keys
  //   .on("click", (d, i, nodes) => {
  //     // if (d3.event.defaultPrevented) return; // click suppressed
  //     textarea_main.value += d3.event.shiftKey ?
  //       data[i].char.toUpperCase():
  //       data[i].char.toLowerCase();
  //     label_char.innerHTML = "Char..." + countChar(textarea_main.value, textarea_layout.value);
  //     drawHeatmap();
  //     // easeKeys(d, i, nodes);
  // });
};

// const zoomed = (element) =>{
//   element.attr("transform", d3.event.transform);
// }

// var zoom = d3.zoom()
//     .translate(d3.select('svg').enter().translate())
//     .scale(d3.select('svg').scale())
//     .scaleExtent([height, 8 * height])
//     .on('zoom', zoomed);

// const arr = (new Array(4)).fill(1).map((v, i) => v + i)
// console.log(arr);
// console.log(data[1].row);
// console.log(() => (d){return d.row});
// const row = data.map(() => (d){ return d.row; })
// for(let k in data) {
//   if(data.hasOwnProperty(k)) {
//     console.log(k+ ':' + data[k]);
// }
//   }
