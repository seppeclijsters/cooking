const intro = require(`./states/Intro`);

let game;

const init = () => {
  game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO);
  game.global = {
    buttonTomatoUp: false,
    buttonMeatUp: false,
    buttonFishUp: false,
    buttonPotatoUp: false,
    buttonEggUp: false,
    buttonCarrotUp: false,
    buttonTomatoUp2: false,
    buttonMeatUp2: false,
    buttonFishUp2: false,
    buttonPotatoUp2: false,
    buttonEggUp2: false,
    buttonCarrotUp2: false,
    addscore: false,
    addscore2: false,
    led: 0,
    led2: 0,
    distance: 0,
    distance2: 0,
    score: 0,
    score2: 0,
  };



  game.state.add(`Intro`, intro, false);
  game.state.start(`Intro`);

  console.log(`game start`);
};

init();
