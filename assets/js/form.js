let upload = document.getElementById('upload-file');

// let textarea = document.getElementById('textarea');
// textarea.value.addEventListener('change', heatmap);

heatmap(upload);


// let textarea = document.getElementById('upload-text');
// textarea.addEventListener('change', heatmap);


let resetbutton = document.getElementById('reset-button');
resetbutton.addEventListener('click', reset);

let samplebutton = document.getElementById('sample-button');

// sample.addEventListener('click', );

/* Sample */

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

    /* Upload a textfile */
    let reader;
    let uploadedText;
    upload.addEventListener('change', () => {
      let uploadFile = document.getElementById('upload-file');
      let file = uploadFile.files[0];
      if (!file) alert('Please select a File.');
      uploadText = document.getElementById('upload-text');
      // console.log(uploadText);
      reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        uploadText.value = reader.result;
        uploadedText = reader.result;
        // uploadData = JSON.parse(reader.result);
      }
      heatmap(upload);
    });

    /* Upload a textfile */
let displaybutton = document.getElementById('display-button');
displaybutton.addEventListener('click', heatmap);
