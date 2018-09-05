/* NOTE: arranged in order of occurrence of assumed events */

const layouts = {
  qwerty,
  qwerty_shift,
  dvorak,
  dvorak_shift,
  colemak,
  colemak_shift
};

const sampleTexts = {
  sampleText: "",
  alice,
  lorem,
  jobs,
  hhkb
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
  count_word.innerHTML = 'Word...' + countWord(textarea_main.value);
  count_char.innerHTML = 'Char...' + countChar(select_sampletext[i].value);
  drawHeatmap(layout);
});

select_layout.addEventListener('change', (e) => {
  const i = e.currentTarget.selectedIndex;
  layout = select_layout[i].value;
  drawHeatmap(layout);
});

input_file.addEventListener('change', () => {
  uploadFile();
  count_word.innerHTML = 'Word...' + countWord(textarea_main.value);
  count_char.innerHTML = 'Char...' + countChar(textarea_main.value);
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

check_cost.addEventListener('change', () => {
  drawHeatmap(layout);
});

check_color.addEventListener('change', () => {
  drawHeatmap(layout);
});

button_reset.addEventListener('click', () => {
  textarea_main.value = '';
  countText();
});

textarea_main.focus();
textarea_main.addEventListener('input', () => {
  countText();
});
