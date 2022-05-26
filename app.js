const hexChars = '0123456789ABCDEF';
function $(id) { return document.getElementById(id) }
function genColorCode() {
	let code = '';
	for (let i=0; i<6; i++) {
		code += hexChars[Math.floor(Math.random() * 16)];
	}
	return code;
}
function calcHexScore(guess, actual) {
	let score = 0;
	let details = '=';
	for (let i=0; i<3; i++) {
		let subscore = parseInt(guess.substring(i*2, i*2+2), 16) - parseInt(actual.substring(i*2, i*2+2), 16);
		if (subscore === 0) {
			details += '±0/';
		} else if (subscore > 0) {
			details += '+' + subscore + '/';
		} else {
			details += subscore + '/';
		}
		score += Math.abs(subscore);
	}
	return score + details.slice(0, -1);
}
const guess_input = $('guess_input');
const color_block = $('color_block');
const last_guess_text = $('last_guess_text');
const last_actual_text = $('last_actual_text');
const last_score_text = $('last_score');

let currentColor = genColorCode();
let lastColor = '000000';
color_block.style.backgroundColor = '#' + currentColor;
$('guess_form').addEventListener('submit', (e) => {
	e.preventDefault();
	if (guess_input.value === '' || guess_input.value.length !== 6 || !guess_input.value.match(/[0-9A-Fa-f]{6}/g)) {
		guess_input.value = '000000';
	}
	last_guess_text.textContent = guess_input.value.toUpperCase();
	last_guess_splotch.style.backgroundColor = '#' + guess_input.value.toUpperCase();
	last_actual_text.textContent = currentColor;
	last_actual_splotch.style.backgroundColor = '#' + currentColor;
	last_score_text.textContent = calcHexScore(guess_input.value, currentColor);
	guess_input.value = '';
	currentColor = genColorCode();
	color_block.style.backgroundColor = '#' + currentColor;
})
