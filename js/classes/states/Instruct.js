const Button = require(`../objects/Button.js`);

class Instruct extends Phaser.State {
  preload() {
  }

  create() {
    this.game.stage.backgroundColor = `#ab332f`;
    this.addNextButton();
    this.addPreviousButton();
    this.addText();
  }
  addText() {
    const style = {font: `32px Arial`, fill: `#fff`, boundsAlignH: `center`, boundsAlignV: `middle`};
    this.text = this.game.add.text(this.game.world.centerX, 100, `HOE MOET JE SPELEN`, style);
    this.text.anchor.set(0.5);
  }
  addNextButton() {
    this.next = new Button(this.game, this.game.world.centerX + 150, this.game.world.centerY + 300, `how_button`, this.nextClick);
    this.game.add.existing(this.next);
  }
  addPreviousButton() {
    this.previous = new Button(this.game, this.game.world.centerX - 150, this.game.world.centerY + 300, `start_button`, this.previousClick);
    this.game.add.existing(this.previous);
  }
  nextClick() {
    console.log(`next`);
  }
  previousClick() {
    console.log(`previous`);
  }
}

module.exports = Instruct;
