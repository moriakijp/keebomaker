var upload = document.getElementById('upload-file');

upload.addEventListener('change', function() {
  var uploadFile = document.getElementById('upload-file');
  var file = uploadFile.files[0];
  if (!file) alert('ファイルを選択してください。');
  // var uploadData;
  var uploadText = document.getElementById('upload-text');
  var reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function() {
    uploadText.innerHTML = reader.result;
      // JSONに変換
      // uploadData = JSON.parse(reader.result);
  }
});

d3.json("data/qwerty2.json", function(data){
  console.log(data);
});
