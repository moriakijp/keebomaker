drawHeatmap();
onresize = () => drawHeatmap();
document.getElementById("upload-text").focus();

document.getElementById("upload-text").addEventListener("input", drawHeatmap);

// document.getElementById("upload-text").addEventListener("input", (e) => {
//   e.currentTarget.placeholder = countChar(e.currentTarget.value);
// });


document.getElementById("reset-button").addEventListener("click", () => {
  reset();
  document.getElementById("count").innerHTML = 'countChar : ' + countChar(document.getElementById("upload-text").value);
});

// const dropdown = document.getElementById("dropdown-menu");
// dropdown.addEventListener("click", () => {
//   event.stopPropagation();
//   dropdown.classList.toggle("is-active");
// });

document.getElementById("upload-text").addEventListener("input", (e) => {
  document.getElementById("count").innerHTML = 'countChar : ' + countChar(e.currentTarget.value);
});

let select = document.querySelector("#sample");
let option = document.querySelectorAll("#sample option");
select.addEventListener("change", (e) => {
  var index = e.currentTarget.selectedIndex;
  option[1].value = lorem;
  option[2].value = jobs;
  option[3].value = hhkb;
  document.getElementById("upload-text").value = option[index].value;
  document.getElementById("count").innerHTML = 'countChar : ' + countChar(option[index].value);
  drawHeatmap();
});

// document.getElementById("sample-text-1").addEventListener("change", (e) => {
//   document.getElementById("upload-text").value = jobs;
//   document.getElementById("count").innerHTML = 'countChar : ' + countChar(e.currentTarget.value);
//   drawHeatmap();
// });
// document.getElementById("sample-text-2").addEventListener("change", (e) => {
//   document.getElementById("upload-text").value = lorem;
//   document.getElementById("count").innerHTML = 'countChar : ' + countChar(e.currentTarget.value);
//   drawHeatmap();
// });
// document.getElementById("sample-text-3").addEventListener("change", (e) => {
//   document.getElementById("upload-text").value = hhkb;
//   document.getElementById("count").innerHTML = 'countChar : ' + countChar(e.currentTarget.value);
//   drawHeatmap();
// });

document.getElementById("upload-file").addEventListener("change", () => {
  loadFile();
  document.getElementById("count").innerHTML = 'countChar : ' + countChar(document.getElementById("upload-text").value);
  drawHeatmap();
});


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
