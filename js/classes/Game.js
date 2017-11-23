const intro = require('./states/Intro');

let game;

const init = () => {
  game = new  Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO);
  game.state.add('Intro', intro, false);

  console.log('game start');
};

init();
