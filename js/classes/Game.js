const intro = require(`./states/Intro`);

let game;

const init = () => {
  game = new  Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO);
  game.global = {
    buttonTomatoUp: false,
    buttonMeatUp: false,
    buttonFishUp: false,
    buttonPotatoUp: false,
    buttonEggUp: false,
    buttonCarrotUp: false,
    addscore: false,
    led: 0
  };



  game.state.add(`Intro`, intro, false);
  game.state.start(`Intro`);

  console.log(`game start`);
};

init();
