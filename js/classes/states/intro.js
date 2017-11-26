const Button = require(`../objects/Button.js`);
const Play = require(`./play.js`);
const Instruct = require(`./Instruct.js`);

class Intro extends Phaser.State {
  preload(){
    this.load.image(`logo`, `./assets/logo.png`);
    this.load.image(`how_button`,`./assets/hoe_button.png`);
    this.load.image(`start_button`,`./assets/start_button.png`);

    this.game.load.image(`tiles`, `assets/tiles.png`);
    this.game.load.image(`pot`, `assets/cooking_pot.png`);

    this.game.state.add(`Play`, Play, false);
    this.game.state.add(`Instruct`, Instruct, false);
  }
  create(){
    this.game.stage.backgroundColor = "#ab332f";
    this.logo();
    this.buttons();
  }
  logo(){
    this.logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY - 180, `logo`);
    this. game.add.tween(this.logo).from({y: -200}, 1500, Phaser.Easing.Bounce.Out, true);
	  this.logo.anchor.set(0.5);
  }

  buttons() {
    this.how_button = new Button(this.game, this.game.world.centerX + 150, this.game.world.centerY + 200, `how_button`, this.howClick);
    this.how_button.events.onInputDown.add(this.howClick, this);

    this.start_button = new Button(this.game, this.game.world.centerX - 150, this.game.world.centerY + 200, `start_button`, this.startClick);
    this.start_button.events.onInputDown.add(this.startClick, this);

    this.game.add.existing(this.start_button);
    this.game.add.existing(this.how_button);
  }

  howClick() {
    this.game.state.start(`Instruct`);
  }

  startClick() {
    this.game.state.start(`Play`);
  }
}

module.exports = Intro;
