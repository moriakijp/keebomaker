drawHeatmap();
onresize = () => drawHeatmap();
document.getElementById("upload-text").focus();

document.getElementById("upload-text").addEventListener("input", drawHeatmap);

document.getElementById("reset-button").addEventListener("click", reset);

const dropdown = document.getElementById("sample-menu");
dropdown.addEventListener("click", () => {
  event.stopPropagation();
  dropdown.classList.toggle("is-active");
});

document.getElementById("sample-text-1").addEventListener("click", () => {
  document.getElementById("upload-text").value = jobs;
  drawHeatmap();
});
document.getElementById("sample-text-2").addEventListener("click", () => {
  document.getElementById("upload-text").value = lorem;
  drawHeatmap();
});
document.getElementById("sample-text-3").addEventListener("click", () => {
  document.getElementById("upload-text").value = hhkb;
  drawHeatmap();
});

document.getElementById("upload-file").addEventListener("change", loadFile);

// const block = document.getElementById('block');
// block.addEventListener('drag', ()=>{
//   console.log('aa');
//   drawHeatmap();
// });

// var drag = d3.behavior.drag()
//                       .on("drag", (d, i)=>{
//                         d.x = d3.event.x;
//                         d.y = d3.event.y;
//                         d3.select(this)
//                         .attr("transform", (d,i)=>{
//                           return "translate(" + [ d.x, d.y ] + ")"
//                         })
//                       });

// let block = document.querySelector('.block');
// let block = document. getElementById('block')
// block.addEventListener('click', () => {
//   document.getElementById('upload-text').value += 'a';
// });
