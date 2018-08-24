drawHeatmap(qwerty);
onkeydown = (e) => {
  if (e.shiftKey)
    drawHeatmap(qwerty_shift);
};
onkeyup = (e) => {
  if (!e.shiftKey)
    drawHeatmap(qwerty);
};
onresize = () => {
  drawHeatmap(qwerty);
};

textarea.focus();

textarea.addEventListener("input", () => {
  drawHeatmap(qwerty);
});

textarea.addEventListener("input", () => {
  drawHeatmap(qwerty);
});

// textarea.addEventListener("input", (e) => {
//   e.currentTarget.placeholder = countChar(e.currentTarget.value);
// });


reset.addEventListener("click", () => {
  resetHeatmap();
  count_word.innerHTML = 'Word...' + countWord(textarea.value);
  count_char.innerHTML = 'Char...' + countChar(textarea.value);
});

// const dropdown = document.getElementById("dropdown-menu");
// dropdown.addEventListener("click", () => {
//   event.stopPropagation();
//   dropdown.classList.toggle("is-active");
// });

textarea.addEventListener("input", (e) => {
  count_word.innerHTML = 'Word...' + countWord(textarea.value);
  count_char.innerHTML = 'Char...' + countChar(e.currentTarget.value);
});

select_sample.addEventListener("change", (e) => {
  var index = e.currentTarget.selectedIndex;
  option[1].value = lorem;
  option[2].value = jobs;
  option[3].value = hhkb;
  textarea.value = option[index].value;
  count_word.innerHTML = 'Word...' + countWord(textarea.value);
  count_char.innerHTML = 'Char...' + countChar(option[index].value);
  drawHeatmap(qwerty);
});

// document.getElementById("sample-text-1").addEventListener("change", (e) => {
//   textarea.value = jobs;
//   count.innerHTML = 'countChar...' + countChar(e.currentTarget.value);
//   drawHeatmap(qwerty);
// });
// document.getElementById("sample-text-2").addEventListener("change", (e) => {
//   textarea.value = lorem;
//   count.innerHTML = 'countChar...' + countChar(e.currentTarget.value);
//   drawHeatmap(qwerty);
// });
// document.getElementById("sample-text-3").addEventListener("change", (e) => {
//   textarea.value = hhkb;
//   count.innerHTML = 'countChar...' + countChar(e.currentTarget.value);
//   drawHeatmap(qwerty);
// });

input_file.addEventListener("change", () => {
  loadFile();
  count_word.innerHTML = 'Word...' + countWord(textarea.value);
  count_char.innerHTML = 'Char...' + countChar(textarea.value);
  drawHeatmap(qwerty);
});


// const block = document.getElementById('block');
// block.addEventListener('drag', ()=>{
//   console.log('aa');
//   drawHeatmap(qwerty);
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
//   textarea.value += 'a';
// });
