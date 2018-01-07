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
    this.cheer();
  }
  cheer() {
    this.cheer = this.game.add.audio(`applause`);
    this.cheer.play();
  }
  background() {
    // this.game.add.tileSprite(0, 0, this.game.width, this.game.height, `tiles`);

    this.game.stage.backgroundColor = `f5cf30`;
    // this.cook = this.add.sprite(this.game.world.centerX - 200, this.game.world.centerY, `cook`);
    // this.cook.anchor.setTo(.5);
    this.body = this.add.sprite(this.game.world.centerX - 200, this.game.world.centerY + 150, `body`);
    this.body.anchor.setTo(.5);
    this.head = this.add.sprite(this.game.world.centerX - 200, this.game.world.centerY + 40, `head`);
    this.head.anchor.setTo(.5, 1);
    this.game.add.tileSprite(140, this.game.world.height - 160, this.game.width, 200, `kitchenTile4`);
    this.kitchenCloset = this.add.sprite(50, this.game.world.height - 160, `kitchenCloset2`);
    this.game.add.tileSprite(0, 0, 50, this.game.height, `kitchenTile3`);
    this.game.add.tileSprite(50, 0, 70, this.game.world.centerY + 240, `kitchenTile2`);
    this.game.add.tileSprite(50, this.game.world.centerY + 240, this.game.width, 60, `kitchenTile2`);

    this.tweenA = this.game.add.tween(this.head).to({angle: - 20}, 2000, `Quart.easeOut`);
    this.tweenB = this.game.add.tween(this.head).to({angle: 20}, 2000, `Quart.easeOut`);

    this.tweenA.chain(this.tweenB);
    this.tweenA.start();
    // this.headTween = this.game.add.tween(this.head);
    // this.headTween.to({angle: - 20}, 1000, Phaser.Easing.Bounce.Out);
    // this.headTween.onComplete.add(this.firstTween());
    // this.headTween.start();
    // this.game.add.tween(this.head).to({angle: - 20}, 2000, Phaser.Easing.Cubic.In, true, - 1, 0);
  }

  firstTween() {

    this.s = this.game.add.tween(this.head);
    this.s.to({angle: 20}, 1000, Phaser.Easing.Linear.None);
    this.s.start();

  }
  cookingPots() {
    this.potsTeam1 = this.game.add.group();
    this.pot1 = new Pot(this.game, this.game.world.centerX + 200, this.game.world.centerY + 200);
    this.pot2 = new Pot(this.game, this.game.world.centerX - 200, this.game.world.centerY + 200);
    this.pot1.scale.setTo(1.1);
    this.pot2.scale.setTo(1.1);
    this.potsTeam1.add(this.pot1);
    this.potsTeam1.add(this.pot2);
  }
  restartClick() {
    this.restartButton = new Button(this.game, this.game.world.centerX - 60, this.game.world.centerY + 250, `start_button`, this.startClick);
    console.log(this.restartButton);
    this.game.add.existing(this.restartButton);
  }
  addText() {
    // this.text = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 200, `Speler 1 wint !!`, {font: `30px BigJohn`, fill: `black`});
    // this.text.anchor.set(0.5);
    // this.text.setTextBounds(0, 100, 800, 100);
    // this.game.add.existing(this.text);
  }

  leds() {
    this.game.global.led.color(`#00FF00`);
    this.game.global.led.blink(125);
    this.game.global.led2.stop();
  }
  addScore() {
    // this.scoreText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, `Met een score van : ${this.game.global.score}`, {font: `30px BigJohn`, fill: `black`});
    // this.scoreText.anchor.set(0.5);
    // this.game.add.existing(this.scoreText);
  }

  deleteScore() {
    this.game.global.score = 0;
    this.game.global.score2 = 0;
    this.game.global.counter = 0;
    this.game.global.count = - 1;
  }
}

module.exports = winner;
