const Pot = require(`../objects/Pots.js`);
const Button = require(`../objects/Button.js`);
console.log(Pot);

class winner2 extends Phaser.State {
  create() {
    this.background();
    this.buttons();
    this.addText();
  }
  background() {
    this.game.stage.backgroundColor = `#FFFFFF`;
  }
  buttons() {
    this.restartButton = new Button(this.game, this.game.world.centerX + 110, this.game.world.centerY + 250, `start_button`, this.restartClick);
    this.restartButton.events.onInputDown.add(this.restartClick, this);
    this.restartButton.anchor.set(0.5);
    this.game.add.existing(this.restartButton);
  }
  restartClick() {
    this.game.state.start(`Intro`);
  }
  addText() {
    this.style = {font: `bold 200px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle`};
    this.text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, `Player two wins !!`, this.style);
    this.text.anchor.set(0.5);
    this.text.setTextBounds(0, 100, 800, 100);
    this.game.add.existing(this.text);
  }
}

module.exports = winner2;
