// kbvis
// Copyright (c) 2018 Akihito Morita
// MIT License

/* Upload a textfile */

var upload = document.getElementById('upload-file');
var reader;
var uploadedText;

upload.addEventListener('change', () => {
  var uploadFile = document.getElementById('upload-file');
  var file = uploadFile.files[0];
  if (!file) alert('Please select a File.');
  uploadText = document.getElementById('upload-text');
  // console.log(uploadText);
  reader = new FileReader();
  reader.readAsText(file);
  reader.onload = () => {
    uploadText.innerHTML = reader.result;
    uploadedText = reader.result;
    // uploadData = JSON.parse(reader.result);
  }
});


var sample = document.getElementById('sample-button');
sample.addEventListener('click', () => {
  console.log(uploadedText);
});
/* Sample */

// var sample = document.getElementById('sample-button');
// sample.addEventListener('click', () => {
  // uploadText = document.getElementById('upload-text');
  // var ajax = new XMLHttpRequest();
  // ajax.open("get", "data/sample.txt", false)
  // response.setContentType("text/plain");
  // ajax.addEventListener("load", ()=>{console.log(this.response);},false);
  // ajax.send();
  // reader = new FileReader('data/sample.txt');
  // reader.readAsDataURL();
  // console.log(reader.result);
  // uploadText.onload = () => () {
    // uploadText.innerHTML = reader.result;
    // uploadedText = reader.result;
    // }
    // })


    /* Display heatmap */

    var blocksize = 65;
    var width = 960;
    var height = 400;
    var margin = {
      top: height * 0.05,
      bottom: height * 0.05,
      left: width * 0.05,
      right: width * 0.05
    }

    var display = document.getElementById('display-button');
    display.addEventListener('click', () => {

      /* character match detection */
      d3.json("data/qwerty.json", (errer, data) => {
        uploadedText = document.getElementById('upload-text').value;
    var character=Array.from(uploadedText);
    for(var j in character){
      for(var i in data){
       if( character[j].toUpperCase() == data[i].char ) {data[i].val++; console.log(data[i].val);}
      }
    }

    d3.select("svg").remove();
    var svg = d3.select("#heatmap").append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var min = Math.min.apply(null, data.map((d) => {
      return d.val;
    }));
    var max = Math.max.apply(null, data.map((d) => {
      return d.val;
    }));

    var colorScale = d3.scale.linear().domain([min, max]).range(["#F2F1EF", "#F22613"]);

    var heatmap = svg.selectAll('g').data(data).enter();

    // let arr = (new Array(4)).fill(1).map((v, i) => v + i)

    // console.log(arr);
    // console.log(data[1].row);
    // console.log(() => (d){return d.ro/w});
    // var row = data.map(() => (d){ return d.row; })
    // for(let k in data) {
    //   if(data.hasOwnProperty(k)) {
    //     console.log(k+ ':' + data[k]);
    //   }
    // }

    heatmap.append('rect')
      .attr("class", "block")
      .attr("x", (d, r) => {
        return (r % 14) * blocksize;
      })
      .attr("y", (d, r) => {
        return blocksize * data[r].row;
      })
      .attr("width", blocksize)
      .attr("height", blocksize)
      .attr("fill", (d) =>  {
        return colorScale(d.val);
      });


    heatmap.append('text')
      .text((d) => {
        return d.char;
      })
      .attr("x", (d, r) => {
        return (r % 14) * blocksize;
      })
      .attr("y", (d, r) => {
        return blocksize * data[r].row;
      })
      .attr("text-anchor", "middle")
      .attr("fill", "#333")
      .attr("dy", blocksize / 2)
      .attr("dx", blocksize / 2)
      .style({
        "font-size": 25
      });

    var xLabels = svg.selectAll(".Label")
      .data(data)
      .enter().append("text")
      .text((d) => {
        return "C"+String(d.col);
      })
      .attr("y", 0)
      .attr("x", (d, i) => {
        return (i % 14-1) * blocksize;
      })
      .attr("fill", "#333")
      .style({
        "font-size": 15
      })
      .style("text-anchor", "middle")
      .attr("transform", "translate(100," + blocksize / 1.5 + ")");

    var yLabels = svg.selectAll(".Label")
      .data(data)
      .enter().append("text")
      .text((d) =>{
        return "R"+String(d.row);
      })
      .attr("fill", "#333")
      .attr("x", 0)
      .attr("y", (d, i) => {
        return blocksize * (data[i].row-1);
      })
      .style({
        "font-size": 15
      })
      .style("text-anchor", "middle")
      .attr("transform", "translate(-20," + blocksize * 1.5 + ")");

  });

});
