let textarea = document.getElementById('upload-text');
textarea.addEventListener('input', heatmap);

let resetbutton = document.getElementById('reset-button');
resetbutton.addEventListener('click', reset);

let dropdown = document.getElementById('sample-menu');
dropdown.addEventListener('click', ()=>{
  event.stopPropagation();
  dropdown.classList.toggle('is-active');
});
// let sample = document.getElementById('sample-text-1');
// sample.addEventListener('click', loadLocalFile('data/sample.txt'));

// document.addEventListener('click', (event)=>{});

let upload = document.getElementById('upload-file');
upload.addEventListener('change', loadFile);


heatmap(heatmap);
onresize = () => heatmap(heatmap);

// let block = document.querySelector('.block');
// let block = document. getElementById('block')
// block.addEventListener('click', () => {
//   document.getElementById('upload-text').value += 'a';
// });
