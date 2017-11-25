class Button extends Phaser.Sprite {
  constructor(game, x, y, frame) {
    super(game, x, y, frame);
    this.anchor.setTo(0.5, 0.5);

  }
}

module.exports = Button;
