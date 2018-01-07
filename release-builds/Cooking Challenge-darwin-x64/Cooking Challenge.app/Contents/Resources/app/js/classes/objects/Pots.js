class Pots extends Phaser.Sprite {
  constructor(game, x, y, frame, functie) {
    super(game, x, y, `pot`, functie);
    this.inputEnabled = true;
    this.anchor.setTo(0.5, 0.5);

  }
}

module.exports = Pots;
