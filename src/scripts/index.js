import '../styles/index.scss';

console.log('Loaded index.js');

function main() {
  document.querySelector('#text').innerText = 'Text Loaded From index.js';
}

window.addEventListener('load', main);
