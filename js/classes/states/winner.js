const Pot = require(`../objects/Pots.js`);
const Button = require(`../objects/Button.js`);
console.log(Pot);

class winner extends Phaser.State {
  create() {
    this.background();
    this.cookingPots();
    this.addText();
    this.restartClick();
    this.leds();
    this.addScore();
    this.deleteScore();
  }
  background() {
    this.game.stage.backgroundColor = `#FFFFFF`;
    this.game.add.tileSprite(0, 0, this.game.width, this.game.height, `tiles`);
  }
  cookingPots() {
    this.potsTeam1 = this.game.add.group();
    this.pot1 = new Pot(this.game, this.game.world.centerX + 200, this.game.world.centerY + 200);
    this.pot2 = new Pot(this.game, this.game.world.centerX - 200, this.game.world.centerY + 200);
    this.potsTeam1.add(this.pot1);
    this.potsTeam1.add(this.pot2);
  }
  restartClick() {
    this.restartButton = new Button(this.game, this.game.world.centerX - 60, this.game.world.centerY + 250, `start_button`, this.startClick);
    console.log(this.restartButton);
    this.game.add.existing(this.restartButton);
  }
  addText() {
    this.text = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 200, `Speler 1 wint !!`, {font: `30px BigJohn`, fill: `black`});
    this.text.anchor.set(0.5);
    this.text.setTextBounds(0, 100, 800, 100);
    this.game.add.existing(this.text);
  }

  leds() {
    this.game.global.led.color(`#00FF00`);
    this.game.global.led.blink(125);
    this.game.global.led2.stop();
  }
  addScore() {
    this.scoreText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, `Met een score van : ${this.game.global.score}`, {font: `30px BigJohn`, fill: `black`});
    this.scoreText.anchor.set(0.5);
    this.game.add.existing(this.scoreText);
  }

  deleteScore() {
    this.game.global.score = 0;
    this.game.global.score2 = 0;
    this.game.global.counter = 0;
    this.game.global.count = - 1;
  }
}

module.exports = winner;
