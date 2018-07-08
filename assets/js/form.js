var upload = document.getElementById('upload-file');
var uploadedText;
var reader;

upload.addEventListener('change', function() {
  var uploadFile = document.getElementById('upload-file');
  var file = uploadFile.files[0];
  if (!file) alert('ファイルを選択してください。');
  var uploadText = document.getElementById('upload-text');
  reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function() {
    uploadText.innerHTML = reader.result;
    uploadedText = reader.result;
      // JSONに変換
      // uploadData = JSON.parse(reader.result);
  }
});

var display =  document.getElementById('message-button');

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

