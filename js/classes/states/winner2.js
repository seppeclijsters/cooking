const Pot = require(`../objects/Pots.js`);
const Button = require(`../objects/Button.js`);
console.log(Pot);

class winner2 extends Phaser.State {
  create() {
    this.background();
    this.cookingPots();
    this.restartClick();
    this.leds();
    this.addscore();
    this.deleteScore();
    this.cheer();
  }
  cheer() {
    this.cheer = this.game.add.audio(`applause`);
    this.cheer.play();
  }
  background() {
    this.game.stage.backgroundColor = `f5cf30`;
    this.body = this.add.sprite(this.game.world.centerX + 200, this.game.world.centerY + 150, `body`);
    this.body.anchor.setTo(.5);
    this.head = this.add.sprite(this.game.world.centerX + 200, this.game.world.centerY + 40, `head`);
    this.head.anchor.setTo(.5, 1);
    this.game.add.tileSprite(140, this.game.world.height - 160, this.game.width, 200, `kitchenTile4`);
    this.kitchenCloset = this.add.sprite(50, this.game.world.height - 160, `kitchenCloset2`);
    this.game.add.tileSprite(0, 0, 50, this.game.height, `kitchenTile3`);
    this.game.add.tileSprite(50, 0, 70, this.game.world.centerY + 240, `kitchenTile2`);
    this.game.add.tileSprite(50, this.game.world.centerY + 240, this.game.width, 60, `kitchenTile2`);
    this.chalkboard2 = this.add.sprite(this.game.world.centerX - 590, this.game.world.centerY - 200, `chalkboard2`);

    this.tweenA = this.game.add.tween(this.head).to({angle: - 20}, 2000, `Quart.easeOut`);
    this.tweenB = this.game.add.tween(this.head).to({angle: 20}, 2000, `Quart.easeOut`);
    this.tweenC = this.game.add.tween(this.head).to({angle: - 20}, 2000, `Quart.easeOut`);
    this.tweenD = this.game.add.tween(this.head).to({angle: 20}, 2000, `Quart.easeOut`);

    this.tweenA.chain(this.tweenB);
    this.tweenB.chain(this.tweenC);
    this.tweenC.chain(this.tweenD);
    this.tweenA.start();
  }
  cookingPots() {
    this.potsTeam1 = this.game.add.group();
    this.pot1 = new Pot(this.game, this.game.world.centerX + 200, this.game.world.centerY + 200);
    this.pot1.scale.setTo(1.1);
    this.potsTeam1.add(this.pot1);
  }
  restartClick() {
    this.restartButton = new Button(this.game, this.game.world.centerX - 360, this.game.world.centerY, `start_button`, this.startClick);
    this.restartButton.scale.setTo(0.6);
    console.log(this.restartButton);
    this.game.add.existing(this.restartButton);
  }

  leds() {
    this.game.global.led2.color(`#00FF00`);
    this.game.global.led2.blink(125);
    this.game.global.led.stop();
  }
  addscore() {
    this.scoreText2 = this.game.add.text(this.game.world.centerX + 200, this.game.world.centerY + 200, `SCORE: ${this.game.global.score2}`, {font: `27px BigJohn`, fill: `white`});
    this.scoreText2.anchor.set(0.5);
    this.game.add.existing(this.scoreText2);
  }

  deleteScore() {
    this.game.global.score = 0;
    this.game.global.score2 = 0;
    this.game.global.counter = 0;
    this.game.global.count = - 1;
  }
}

module.exports = winner2;
