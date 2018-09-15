/* data location*/
const arr = 'data/qwerty-arr.json';
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

const input_main = document.getElementById('input-main');

const input_layout = document.getElementById('input-layout');

const textarea_main = document.getElementById('textarea-main');

const textarea_layout = document.getElementById('textarea-layout');

const label_char = document.getElementById('label-char');

const label_word = document.getElementById('label-word');

const label_cost = document.getElementById('label-cost');

const check_shift = document.getElementById('check-shift');

const check_count = document.getElementById('check-count');

const check_color = document.getElementById('check-color');

/* flag */


/* function */

const readFileAsText = (file, textarea) => {
  const reader = new FileReader();
  if (!file) alert('Please select a File.');
  reader.readAsText(file);
  reader.onload = () => textarea.value = reader.result;
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

const countCost = (str, layout) => {

}


const recSum = (arr, i) => {
  let sum = 0;
  if (i == 0) return sum;
  else {
    sum = recSum(arr, --i);
    return sum + arr[i];
  }
};


const flatten = array => {
  return array.reduce((acc, cur) => {
    return Array.isArray(cur) ? acc.concat(flatten(cur)) : acc.concat(cur);
  }, []);
};

const decrementDegree = array => array.reduce((pre, current) => {
  pre.push(...current);
  return pre
});

const allIndexOf = (array, target) => {
  if (array === null) {
    return [-1];
  }
  var len = array.length,
    // hasIndexOf = Array.prototype.indexOf, // you know, because of IE
    // i = (hasIndexOf) ? this.indexOf(target) : 0,
    i = array.indexOf(target),
    n,
    idx = 0,
    result = [];
  if (len === 0 || i === -1) {
    return [-1];
  }
  // if (hasIndexOf) {
  // Array.indexOf does exist
  for (n = 0; n <= len; n++) {
    i = array.indexOf(target, idx);
    if (i !== -1) {
      idx = i + 1;
      result.push(i);
    } else {
      return result;
    }
  }
  return result;
  // } else {
  //   // Array.indexOf doesn't exist
  //   for (n = 0; n <= len; n++) {
  //     if (array[n] === target) {
  //       result.push(n);
  //     }
  //   }
  //   return (result.length > 0) ? result : [-1];
  // }
};

const removeElement = (arr) => {
  var what, a = arguments,
    L = a.length,
    ax;
  while (L > 1 && arr.length) {
    what = a[--L];
    while ((ax = arr.indexOf(what)) !== -1) {
      arr.splice(ax, 1);
    }
  }
  return arr;
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
