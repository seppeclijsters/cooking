//import Game from './classes/Game';
console.log('script.js');
const Game = require('./classes/Game')



const init = () => {
  if(isWebfontLoaded()) {
    startGame();
    return;
  }
  window.WebFontConfig.active = e => startGame();
};

const isWebfontLoaded = () => {
  return document.documentElement.classList.contains('wf-active');
};

const startGame = () => {
  new Game();
};

init();
