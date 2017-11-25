const intro = require('./states/Intro');

let game;

const init = () => {
  game = new  Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO);
  game.state.add('Intro', intro, false);
  game.state.start("Intro");

  console.log('game start');
};

init();
