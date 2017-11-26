const Pot = require(`../objects/Pots.js`);

class Play extends Phaser.State {
  preload() {
  }
  create() {
    this.background();
    this.cookingPots();
    this.startGeneratingIngredients();
  }
  background() {
    this.game.stage.backgroundColor = `#FFFFFF`;
    this.game.add.tileSprite(0, 0, 1500, 600, `tiles`);
  }
  cookingPots() {
    this.potsTeam1 = this.game.add.group();
    this.pot1 = new Pot(this.game, this.game.world.centerX - 560, this.game.world.centerY + 200);
    this.pot2 = new Pot(this.game, this.game.world.centerX - 220, this.game.world.centerY + 200);
    this.pot3 = new Pot(this.game, this.game.world.centerX + 560, this.game.world.centerY + 200);
    this.pot4 = new Pot(this.game, this.game.world.centerX + 220, this.game.world.centerY + 200);
    this.potsTeam1.add(this.pot1);
    this.potsTeam1.add(this.pot2);
    this.potsTeam1.add(this.pot3);
    this.potsTeam1.add(this.pot4);
  }

  startGeneratingIngredients() {
    this.ingredientsGenerator = this.time.events.loop(3000, this.pickIngredient, this);
    this.ingredientsGenerator.timer.start();
  }

  pickIngredient() {
    const items = [`egg`, `meat`, `fish`, `tomato`, `patato`, `carrot`];
    const item = items[Math.floor(Math.random() * items.length)];
    console.log(`hello ${item}`);
    this.add.sprite(300, 300, item);
  }
}

module.exports = Play;
