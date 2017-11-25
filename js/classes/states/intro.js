const Button = require('../objects/Button.js');

class Intro extends Phaser.State {
  preload(){
    this.game.load.image('logo', './assets/logo.png');
    //this.load.image('button','./assets/button.svg')
  }
  create(){
    this.game.stage.backgroundColor = "#FFFFFF";
    this.logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY - 80, 'logo');
    this. game.add.tween(this.logo).from( { y: -200 }, 1500, Phaser.Easing.Bounce.Out, true);
	  this.logo.anchor.set(0.5);
  //  this.start_button();
  }
  start_button(){
    this.start_button = new Button(this.game, this.game.world.centerX / 2, this.game.world.centerY / 2, 'button');
    this.game.add.existing(this.start_button);
  }
}

module.exports = Intro;
