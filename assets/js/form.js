var file = document.getElementById("file-input");

file.onchange = function(){
    if(file.files.length > 0) {
      document.getElementById('fiename').innerHTML = 	file.files[0].name;
    }
};

uploadFile.addEventListener('change', function() {
  var uploadFile = document.getElementById('upload-file');
  var file = uploadFile.files[0];
  if (!file) alert('ファイルを選択してください。');
  var uploadData;
  var uploadText = document.getElementById('upload-text');
  var reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function() {
      // そのまま表示
      uploadText.innerHTML = reader.result;
      // JSONに変換
      // uploadData = JSON.parse(reader.result);
    }
