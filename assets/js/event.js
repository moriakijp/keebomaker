/* NOTE: arranged in order of occurrence of assumed events */

const layouts = {
  qwerty,
  arr,
  qwerty_shift,
  dvorak,
  dvorak_shift,
  colemak,
  colemak_shift
};

const sampleTexts = {
  alice,
  mingpao,
  xingyusi,
  lorem,
  jobs,
  hhkb,
  alpha,
};

const cols = Array(10).fill(10).map((v, i) => v + i).reverse();
const rows = Array(10).fill(1).map((v, i) => v + i).reverse();
onload = () => {
  Object.keys(sampleTexts).forEach(k => {
    let option = document.createElement('option');
    option.text = k;
    option.value = sampleTexts[k];
    option.selected = (k == 0) ? true : false;
    select_sampletext.appendChild(option);
  })
  Object.keys(layouts).forEach(k => {
    let option = document.createElement('option');
    option.text = k;
    option.value = layouts[k];
    option.selected = (k == 0) ? true : false;
    select_layout.appendChild(option);
  })
  Object.values(cols).forEach(k => {
    let option = document.createElement('option');
    option.text = k;
    option.selected = (k == 14) ? true : false;
    select_col.appendChild(option);
  })
  Object.values(rows).forEach(k => {
    let option = document.createElement('option');
    option.text = k;
    option.selected = (k == 4) ? true : false;
    select_row.appendChild(option);
  })
  textarea_main.value = select_sampletext.value;
  layout = select_layout.value;
  fetch(layout)
    .then(response => response.text())
    .then(text => {
      textarea_layout.value = `${text.replace(/\s|\n/g, "").replace(/^\[|\]$/g, "").replace(/\],/g, "\],\n")}`;
    }).then(drawHeatmap);
}

select_sampletext.addEventListener('change', (e) => {
  const i = e.currentTarget.selectedIndex;
  textarea_main.value = select_sampletext[i].value;
  label_word.innerHTML = 'Word...' + countWord(textarea_main.value);
  label_char.innerHTML = 'Char...' + countChar(select_sampletext[i].value);
  drawHeatmap();
});

select_layout.addEventListener('change', (e) => {
  const i = e.currentTarget.selectedIndex;
  const layout = select_layout[i].value;
  // select_col.option[layout[0].length].selected = true;
  // select_row.option[layout.length].selected = true;
  fetch(layout)
    .then(response => response.text())
    .then(text => {
      select_col.value = JSON.parse(text)[0].length;
      select_row.value = JSON.parse(text).length;
      textarea_layout.value = `${text.replace(/\s|\n/g, "").replace(/^\[|\]$/g, "").replace(/\],/g, "\],\n")}`;
    }).then(drawHeatmap);
});

input_main.addEventListener('change', () => {
  const file_main = input_main.files[0];
  readFileAsText(file_main, textarea_main);
  label_word.innerHTML = 'Word...' + countWord(textarea_main.value);
  label_char.innerHTML = 'Char...' + countChar(textarea_main.value);
  label_cost.innerHTML = 'Cost[ count * distance * position ]...' + countChar(textarea_layout.value);
  drawHeatmap();
});

input_layout.addEventListener('change', () => {
  const file_layout = input_layout.files[0];
  readFileAsText(file_layout, textarea_layout);
  label_cost.innerHTML = 'Cost[ count * distance * position ]...' + countChar(textarea_layout.value);
  drawHeatmap();
});

onresize = () => {
  drawHeatmap();
};

select_col.addEventListener('focus', () => {
  select_col.prev = select_col.value;
})
select_col.addEventListener('change', () => {
  const arr = Array.from(JSON.parse(`[${textarea_layout.value}]`));
  // console.log(arr.forEach((v, i) => Math.max(v[i].length, v[i - 1].length)));
  const d = select_col.value - select_col.prev;
  console.log('d: ', d);
  if (d > 0) arr.forEach(a => {
    for (let i = 0; i < d; i++) a.push("");
  });
  else arr.forEach(a => {
    for (let i = 0; i < d * -1; i++) a.pop("");
  });
  select_col.prev = select_col.value;
  textarea_layout.value = JSON.stringify(arr).replace(/\s|\n/g, "").replace(/^\[|\]$/g, "").replace(/\],/g, "\],\n");
  layout = "[" + textarea_layout.value + "]"
  drawHeatmap();
});

select_row.addEventListener('focus', () => {
  select_row.prev = select_row.value;
})
select_row.addEventListener('change', () => {
  const arr = Array.from(JSON.parse(`[${textarea_layout.value}]`));
  const new_row = Array(arr[0].length).fill('')
  const d = select_row.value - select_row.prev;
  if (d > 0)
    for (let i = 0; i < d; i++) arr.push(new_row);
  else
    for (let i = 0; i < d * -1; i++) arr.pop();
  select_row.prev = select_row.value;
  textarea_layout.value = JSON.stringify(arr).replace(/\s|\n/g, "").replace(/^\[|\]$/g, "").replace(/\],/g, "\],\n");
  layout = "[" + textarea_layout.value + "]"
  drawHeatmap()
});

// check_shift.addEventListener('change', () => {
//   if (check_shift.checked) {
//     layout = `${layout.slice(0,-5)}-shift.json`;
//     drawHeatmap();
//   } else {
//     layout = document.getElementById('select-layout').value;
//     drawHeatmap();
//   }
// });

check_count.addEventListener('change', () => {
  drawHeatmap();
});

check_color.addEventListener('change', () => {
  drawHeatmap();
});

button_reset.addEventListener('click', () => {
  textarea_main.value = '';
  label_word.innerHTML = 'Word...' + countWord(textarea_main.value);
  label_char.innerHTML = 'Char...' + countChar(textarea_main.value);
  label_cost.innerHTML = 'Cost[ count * distance * position ]...' + countChar(textarea_layout.value);
  drawHeatmap();
});

textarea_main.focus();

textarea_main.addEventListener('input', () => {
  label_word.innerHTML = 'Word...' + countWord(textarea_main.value);
  label_char.innerHTML = 'Char...' + countChar(textarea_main.value);
  label_cost.innerHTML = 'Cost[ count * distance * position ]...' + countChar(textarea_layout.value);
  drawHeatmap();
});

textarea_layout.addEventListener('input', () => {
  label_word.innerHTML = 'Word...' + countWord(textarea_main.value);
  label_char.innerHTML = 'Char...' + countChar(textarea_main.value);
  label_cost.innerHTML = 'Cost[ count * distance * position ]...' + countChar(textarea_layout.value);

  const arr = Array.from(JSON.parse(`[${textarea_layout.value}]`));
  select_col.value = arr.map(v => v.length).reduce((a, c) => a > c ? a : c);
  select_row.value = arr.length;
  drawHeatmap();
});
