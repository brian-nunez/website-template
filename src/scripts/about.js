import '../styles/index.scss';

console.log('Loaded about.js');

function main() {
  document.querySelector('#text').innerText = 'Text Loaded From about.js';
}

window.addEventListener('load', main);
