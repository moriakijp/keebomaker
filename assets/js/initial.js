/* data location*/
const qwerty = 'data/qwerty.json';
const qwerty_shift = 'data/qwerty-shift.json';

const dvorak = 'data/dvorak.json';
const dvorak_shift = 'data/dvorak-shift.json';

const colemak = 'data/colemak.json';
const colemak_shift = 'data/colemak-shift.json';



/* element */

const button_reset = document.getElementById('button-reset');

const select_sampletext = document.querySelector('#select-sampletext');

const select_layout = document.querySelector('#select-layout');

const select_col = document.querySelector('#select-col');

const select_row = document.querySelector('#select-row');

const input_file = document.getElementById('input-file');

const textarea_main = document.getElementById('textarea-main');

const count_char = document.getElementById('count-char');

const count_word = document.getElementById('count-word');

const check_shift = document.getElementById('check-shift');

const check_count = document.getElementById('check-count');

const check_cost = document.getElementById('check-cost');

const check_color = document.getElementById('check-color');

/* flag */


/* function */

const uploadFile = () => {
  let file = input_file.files[0];
  // console.log(file);
  if (!file) alert('Please select a File.');
  let reader = new FileReader();
  reader.onload = () => textarea_main.value = reader.result;
  reader.readAsText(file);
};

const countWord = str => {
  if (str == '') return 0;
  return str.replace(/(^\s*)|(\s*$)/gi, '')
    //exclude start and end white-space
    .replace(/[\s]{2,}/gi, ' ')
    //convert 2 or more spaces to 1
    .replace(/\n /, '\n')
    // exclude newline with a start spacing
    .split(/\s+/).length;
};

const countChar = str => {
  // console.log(this.name);
  if (str == '') return 0;
  return str.replace(/\s/gi, '')
    //exclude all white-space
    .replace(/[\n]*/gi, '')
    //exclude all newline
    .split('').length;
};

const countText = () => {
  count_word.innerHTML = 'Word...' + countWord(textarea_main.value);
  count_char.innerHTML = 'Char...' + countChar(textarea_main.value);
  drawHeatmap(layout);
}

// const complementalColor = c => {
//   return '#' + (('ffffff' ^ c).toString(16)).slice(-6)
// }

// const complementalColor = (r, g, b) => {
//   if (!isNaN(r + g + b) && 0 <= r, g, b && r, g, b <= 255) {
//     const max = Math.max(r, Math.max(g, b));
//     const min = Math.min(r, Math.min(g, b));
//     const sum = max + min;
//     console.log('sum : ', sum);
//     const [nr, ng, nb] = [sum - r, sum - g, sum - b];
//     const complementalColor = `rgb(${nr},${ng},${nb})`;
//     return complementalColor;
//   } else return null;
// }

// fetch(url)
//     .then((response) => response.text())
//     .then((text) => {
//         addEventListener('change', () => {
//             draw(data)
//         })
//     });
// fetch(url)


// function sns_window(sns, share_url, share_title) {
//     var size = '';
//     var url = '';
//     switch (sns) {
//         case 'Facebook':
//             size = 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=800, width=600';
//             url = '//www.facebook.com/sharer.php?src=bm&u=' + share_url + '&t=' + share_title;
//             break;

//         case 'Twitter':
//             size = 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400, width=600';
//             url = '//twitter.com/share?url=' + share_url + '&text=' + share_title;
//             break;

//         case 'Google':
//             size = 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600, width=500';
//             url = '//plus.google.com/share?url=' + share_url;
//             break;

//         case 'Hatena':
//             size = 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600, width=1000';
//             url = '//b.hatena.ne.jp/entry/' + share_url;
//             break;

//         case 'Pocket':
//             size = 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=500, width=800';
//             url = '//getpocket.com/edit?url=' + share_url + '&title=' + share_title;
//             break;

//         case 'LINE':
//             url = '//line.me/R/msg/text/?' + share_title + '%0A' + share_url;
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