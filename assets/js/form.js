let textarea = document.getElementById('upload-text');
textarea.addEventListener('input', heatmap);

let resetbutton = document.getElementById('reset-button');
resetbutton.addEventListener('click', reset);

let dropdown = document.querySelector('.dropdown');
dropdown.addEventListener('click', (event) => {
  event.stopPropagation();
  dropdown.classList.toggle('is-active');
});


// let samplebutton = document.getElementById('sample-button');
// sample.addEventListener('click', );
// let sample = document.getElementById('sample-button');
// sample.addEventListener('click', () => {
// uploadText = document.getElementById('upload-text');
// let ajax = new XMLHttpRequest();
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

let upload = document.getElementById('upload-file');
upload.addEventListener('change', () => {
  let reader;
  let uploadedText;
  let uploadFile = document.getElementById('upload-file');
  let file = uploadFile.files[0];
  if (!file) alert('Please select a File.');
  uploadText = document.getElementById('upload-text');
  //! console.log(heatmap);
  reader = new FileReader();
  reader.readAsText(file);
  reader.onload = () => {
    uploadText.value = reader.result;
    uploadedText = reader.result;
    //! uploadData = JSON.parse(reader.result);
  }
  heatmap(heatmap);
});

heatmap(heatmap);
onresize = () => heatmap(heatmap);

/* Upload a textfile */
// let displaybutton = document.getElementById('display-button');
// displaybutton.addEventListener('click', heatmap);
