const loadFile = () => {
    let uploadText = document.getElementById('upload-text'); // textarea
    let uploadFile = document.getElementById('upload-file'); // input
    let file = uploadFile.files[0];
    if (!file) alert('Please select a File.');
    let reader = new FileReader();
    //! console.log(heatmap);
    reader.onload = () => {
        uploadText.value = reader.result;
    }
    reader.readAsText(file);
    heatmap(heatmap);
};


const loadLocalFile = (url) => {
    let uploadText = document.getElementById('upload-text'); // textarea
    let file = new File([""], url);
    if (!file) return;
    let reader = new FileReader();
    reader.onload = (file) => {
        uploadText.value = reader.result;
    }
    reader.readAsText(file);
    heatmap(heatmap);
};



// fetch(url)
//     .then((response) => response.text())
//     .then((text) => {
//         addEventListener('change', () => {
//             draw(data)
//         })
//     });
