const loadFile = () => {
    let uploadText = document.getElementById('upload-text'); // textarea
    let uploadFile = document.getElementById('upload-file'); // input
    let file = uploadFile.files[0];
    console.log(file);
    if (!file) alert('Please select a File.');
    let reader = new FileReader();
    reader.onload = () => {
        uploadText.value = reader.result;
    }
    reader.readAsText(file);
    heatmap(heatmap);
};

const countWord = (str) => {
    return str.split(" ").length;
};

const countChar = (str) => {
    return str.replace(" ", "").split("").length;
};

console.log(countWord("random string"));
console.log(countChar("random string"));

// fetch(url)
//     .then((response) => response.text())
//     .then((text) => {
//         addEventListener('change', () => {
//             draw(data)
//         })
//     });

// function sns_window(sns, share_url, share_title) {
//     var size = "";
//     var url = "";
//     switch (sns) {
//         case 'Facebook':
//             size = "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=800, width=600";
//             url = "//www.facebook.com/sharer.php?src=bm&u=" + share_url + "&t=" + share_title;
//             break;

//         case 'Twitter':
//             size = "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400, width=600";
//             url = "//twitter.com/share?url=" + share_url + "&text=" + share_title;
//             break;

//         case 'Google':
//             size = "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600, width=500";
//             url = "//plus.google.com/share?url=" + share_url;
//             break;

//         case 'Hatena':
//             size = "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600, width=1000";
//             url = "//b.hatena.ne.jp/entry/" + share_url;
//             break;

//         case 'Pocket':
//             size = "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=500, width=800";
//             url = "//getpocket.com/edit?url=" + share_url + "&title=" + share_title;
//             break;

//         case 'LINE':
//             url = "//line.me/R/msg/text/?" + share_title + "%0A" + share_url;
//             break;

//         default:
//             break;
//     }

//     // Googleアナリティクスにイベント送信 ('share'はGoogleアナリティクス上の表示文字。なんでもOK）
//     ga('send', 'social', sns, 'share', share_url, {
//         'nonInteraction': 1 //1にしないと、直帰率がおかしくなる（ イベント発行したユーザーは直帰しても直帰扱いでなくなる ）
//     });

//     // シェア画面の新規ウインドウを表示
//     　　
//     window.open(url, '_blank', size);

//     　
//     return false;
// }
