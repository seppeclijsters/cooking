class Intro extends Phaser.State {
  Preload(){
  }
  create(){
    console.log('hello');
    this.game.backgroundColor = "#4488AA";
  }
}

module.exports = Intro;
