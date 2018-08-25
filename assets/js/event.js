let layout = qwerty;
drawHeatmap(layout);
onresize = () => {
  drawHeatmap(layout);
};
onkeydown = (e) => {
  if (e.shiftKey) {
    layout = qwerty_shift;
    drawHeatmap(layout);
  }
};
onkeyup = (e) => {
  if (!e.shiftKey) {
    layout = qwerty;
    // drawHeatmap(layout);
  }
};

reset.addEventListener("click", () => {
  resetHeatmap();
  countText();
});

// const dropdown = document.getElementById("dropdown-menu");
// dropdown.addEventListener("click", () => {
//   event.stopPropagation();
//   dropdown.classList.toggle("is-active");
// });

textarea.focus();
textarea.addEventListener("input", () => {
  countText();
});

select_sampletext.addEventListener("change", (e) => {
  var index = e.currentTarget.selectedIndex;
  sampletext_option[1].value = lorem;
  sampletext_option[2].value = jobs;
  sampletext_option[3].value = hhkb;
  textarea.value = sampletext_option[index].value;
  count_word.innerHTML = 'Word...' + countWord(textarea.value);
  count_char.innerHTML = 'Char...' + countChar(sampletext_option[index].value);
  drawHeatmap(qwerty);
});

select_layout.addEventListener("change", (e) => {
  var index = e.currentTarget.selectedIndex;
  layout_option[0].value = qwerty;
  layout_option[1].value = dvorak;
  layout_option[2].value = colemak;
  layout = layout_option[index].value;

  drawHeatmap(layout);
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
  uploadFile();
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
//                           return "translate(${d.x}, ${ d.y })"
//                         })
//                       });

// let block = document.querySelector('.block');
// let block = document. getElementById('block')
// block.addEventListener('click', () => {
//   textarea.value += 'a';
// });
