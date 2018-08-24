//rule... noun=state, intransitive motion / verb_noun=transitive motion. kebab_case.

const reset = document.getElementById("button-reset");

const select_sampletext = document.querySelector("#select-sampletext");

const sampletext_option = document.querySelectorAll("#select-sampletext option");

const select_layout = document.querySelector("#select-layout");

const layout_option = document.querySelectorAll("#select-layout option");

const input_file = document.getElementById('input-file');

const textarea = document.getElementById('textarea');

const count_char = document.getElementById("count-char");

const count_word = document.getElementById("count-word");

const qwerty = "data/qwerty.json";

const dvorak = "data/dvorak.json";

const colemak = "data/colemak.json";

const qwerty_shift = "data/qwerty-shift.json";
