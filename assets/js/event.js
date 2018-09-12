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
  sampleText: "",
  alice,
  mingpao,
  xingyusi,
  lorem,
  jobs,
  hhkb,
  alpha,
};
const cols = Array.from(Array(20));
const rows = Array.from(Array(20));


onload = () => {
  Object.keys(sampleTexts).forEach(k => {
    let option = document.createElement('option');
    option.text = k;
    option.value = sampleTexts[k];
    option.selected = (k == 0) ? true : false;
    document.getElementById('select-sampletext').appendChild(option);
  })
  Object.keys(layouts).forEach(k => {
    let option = document.createElement('option');
    option.text = k;
    option.value = layouts[k];
    option.selected = (k == 0) ? true : false;
    document.getElementById('select-layout').appendChild(option);
  })
  Object.keys(cols).forEach(k => {
    let option = document.createElement('option');
    option.text = option.value = k;
    option.selected = (k == 14) ? true : false;
    document.getElementById('select-col').appendChild(option);
  })
  Object.keys(rows).forEach(k => {
    let option = document.createElement('option');
    option.text = option.value = k;
    option.selected = (k == 4) ? true : false;
    document.getElementById('select-row').appendChild(option);
  })
  layout = document.getElementById('select-layout').value;
  drawHeatmap(layout);
}

select_sampletext.addEventListener('change', (e) => {
  const i = e.currentTarget.selectedIndex;
  textarea_main.value = select_sampletext[i].value;
  label_word.innerHTML = 'Word...' + countWord(textarea_main.value);
  label_char.innerHTML = 'Char...' + countChar(select_sampletext[i].value);
  drawHeatmap(layout);
});

select_layout.addEventListener('change', (e) => {
  const i = e.currentTarget.selectedIndex;
  const layout = select_layout[i].value;
  fetch(layout)
    .then(response => response.text())
    .then(text => {
      textarea_layout.value = `${text.replace(/\[\n|\n\]/g, "")}`;
    });
  drawHeatmap(layout);
});

input_main.addEventListener('change', () => {
  const file_main = input_main.files[0];
  readFileAsText(file_main, textarea_main);
  label_word.innerHTML = 'Word...' + countWord(textarea_main.value);
  label_char.innerHTML = 'Char...' + countChar(textarea_main.value);
  label_cost.innerHTML = 'Cost[ count * distance * position ]...' + countChar(textarea_layout.value);
  drawHeatmap(layout);
});

input_layout.addEventListener('change', () => {
  const file_layout = input_layout.files[0];
  readFileAsText(file_layout, textarea_layout);
  label_cost.innerHTML = 'Cost[ count * distance * position ]...' + countChar(textarea_layout.value);
  drawHeatmap(layout);
});

onresize = () => {
  drawHeatmap(layout);
};

select_col.addEventListener('change', () => drawHeatmap(layout));
select_row.addEventListener('change', () => drawHeatmap(layout));

// check_shift.addEventListener('change', () => {
//   if (check_shift.checked) {
//     layout = `${layout.slice(0,-5)}-shift.json`;
//     drawHeatmap(layout);
//   } else {
//     layout = document.getElementById('select-layout').value;
//     drawHeatmap(layout);
//   }
// });

check_count.addEventListener('change', () => {
  drawHeatmap(layout);
});

check_color.addEventListener('change', () => {
  drawHeatmap(layout);
});

button_reset.addEventListener('click', () => {
  textarea_main.value = '';
  label_word.innerHTML = 'Word...' + countWord(textarea_main.value);
  label_char.innerHTML = 'Char...' + countChar(textarea_main.value);
  label_cost.innerHTML = 'Cost[ count * distance * position ]...' + countChar(textarea_layout.value);
  drawHeatmap(layout);
});

textarea_main.focus();

textarea_main.addEventListener('input', () => {
  label_word.innerHTML = 'Word...' + countWord(textarea_main.value);
  label_char.innerHTML = 'Char...' + countChar(textarea_main.value);
  label_cost.innerHTML = 'Cost[ count * distance * position ]...' + countChar(textarea_layout.value);
  drawHeatmap(layout);
});

textarea_layout.addEventListener('input', () => {
  label_word.innerHTML = 'Word...' + countWord(textarea_main.value);
  label_char.innerHTML = 'Char...' + countChar(textarea_main.value);
  label_cost.innerHTML = 'Cost[ count * distance * position ]...' + countChar(textarea_layout.value);
  console.log('`${"["+textarea_layout.value+"]"}`: \n', `${"[\n"+textarea_layout.value+"\n]"}`);
  // layout = JSON.parse(`${"[\n"+textarea_layout.value+"\n]"}`);
  drawHeatmap(layout);
});
