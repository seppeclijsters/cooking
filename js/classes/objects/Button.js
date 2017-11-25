class Button extends Phaser.Sprite {
  constructor(game, x, y, frame, functie) {
    super(game, x, y, frame, functie);
    this.inputEnabled = true;
    this.anchor.setTo(0.5, 0.5);

  }
}

module.exports = Button;
