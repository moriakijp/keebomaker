var upload = document.getElementById('upload-file');
var uploadedText;
var reader;

upload.addEventListener('change', function () {
  var uploadFile = document.getElementById('upload-file');
  var file = uploadFile.files[0];
  if (!file) alert('ファイルを選択してください。');
  var uploadText = document.getElementById('upload-text');
  reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function () {
    uploadText.innerHTML = reader.result;
    uploadedText = reader.result;
    // JSONに変換
    // uploadData = JSON.parse(reader.result);
  }
});

var display = document.getElementById('message-button');

display.addEventListener('click', () => {
  var charactor = uploadedText.charAt(0);
  reader = new FileReader();

  console.log(charactor);
  // console.log(uploadedText);
  // d3.json("data/qwerty2.json", function (errer, data) {
  //   d3.select(data)
  //       .append('div')
  //       .selectAll()
  //       .data(data)
  //       .enter()
  //       .append('div')
  //       .text(function (dataRow){
  //         return dataRow['Q'];
  //       })
  // }

  // for(key in obj[0])
  //   if( charactor == obj[key]) obj[key].value++;
});


var blocksize = 60;
var width = 960;
var height = 400;
var margin = {
  top: 0,
  bottom: 0,
  left: width * 0,
  right: width * 0
}

d3.json("data/qwerty4.json", function (errer, data) {

  var svg = d3.select("#heatmap").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var max = Math.max.apply(null, data.map(function(d){
       return d.value;
    }));

  var colorScale = d3.scale.linear().domain([0, max]).range(["#F2F1EF", "#F22613"]);

  var heatmap = svg.selectAll('g').data(data).enter();

  let arr = (new Array(4)).fill(1).map((v, i) => v + i)

  console.log(arr);
  console.log(data);
  console.log(data.length);

  heatmap.append('rect')
    .attr("class", "block")
    .attr("x", function (d, i) {
    return i * blocksize;
  })
  .attr("y", blocksize * 1 )
  .attr("width", blocksize)
  .attr("height", blocksize)
  .attr("fill", function (d) {
    return colorScale(d.value);
  });
  heatmap.append('rect')
  .attr("class", "block")
  .attr("x", function (d, i) {
  return i * blocksize;
})
.attr("y", blocksize * 2)
.attr("width", blocksize)
.attr("height", blocksize)
.attr("fill", function (d) {
  return colorScale(d.value);
});

heatmap.append('rect')
.attr("class", "block")
.attr("x", function (d, i) {
return i * blocksize;
})
.attr("y", blocksize * 3)
.attr("width", blocksize)
.attr("height", blocksize)
.attr("fill", function (d) {
return colorScale(d.value);
});

  heatmap.append('rect')
    .attr("class", "block")
    .attr("x", function (d, i) {
    return i * blocksize;
  })
  .attr("y", blocksize * 4 )
  .attr("width", blocksize)
  .attr("height", blocksize)
  .attr("fill", function (d) {
    return colorScale(d.value);
  });

});
