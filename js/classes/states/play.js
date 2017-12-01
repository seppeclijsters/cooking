const Pot = require(`../objects/Pots.js`);
let ingredient;
// let item;
let score = 0;

class Play extends Phaser.State {
  init() {

  }
  preload() {
  }
  create() {
    this.background();
    this.cookingPots();
    this.createIngredients();
    this.startGeneratingIngredients();
    this.createScore();
    this.cursors = this.input.keyboard.createCursorKeys();
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

  createIngredients() {
    this.ingredients = this.add.group();
    this.ingredients.enableBody = true;
    this.ingredients.createMultiple(20, `carrot`, `meat`, `fish`, `patato`, `tomato`, `egg`);
    this.ingredients.setAll(`body.immovable`, true);
    this.ingredients.setAll(`checkWorldBounds`, true);
    this.ingredients.setAll(`outOfBoundsKill`, true);
  }

  startGeneratingIngredients() {
    this.ingredientsGenerator = this.time.events.loop(4000, this.pickIngredient, this);
    this.ingredientsGenerator.timer.start();
  }

  pickIngredient() {
    const items = [`egg`, `meat`, `fish`, `tomato`, `patato`, `carrot`];
    const item = items[Math.floor(Math.random() * items.length)];
    console.log(`hello ${item}`);
    ingredient = this.add.sprite(300, 300, item);
    ingredient.enableBody = true;
    this.game.physics.arcade.enableBody(ingredient);
    console.log(ingredient.key);
    // ingredient = this.ingredients.getFirstDead();
    // ingredient.reset(this.rnd.integerInRange(0, this.game.width - 38), this.game.height);
    // ingredient.body.velocity.y = - 100;
  }

  createScore() {
    this.scoreField = this.add.text(20, 20, `score 0`, {font: `20px BigJohn`, fill: `black`});
    // this.scoreField.text = `-${this.metres} m`;
  }

  update() {
    // console.log(ingredient);
    // if (this.cursors.down.isDown && ingredient.key === `egg`) {
    //   // ingredient.body.velocity.y =  500;
    //   // console.log(this.score);
    //   score += 100;
    //   this.scoreField.text = `score${score}`;
    // }
    // if (this.cursors.down.isDown && ingredient.key === `tomato`) {
    //   ingredient.body.velocity.y =  500;
    // }
    // if (this.cursors.down.isDown && ingredient.key === `meat`) {
    //   ingredient.body.velocity.y =  500;
    // }
    // if (this.cursors.down.isDown && ingredient.key === `carrot`) {
    //   ingredient.body.velocity.y =  500;
    // }
    // if (this.cursors.down.isDown && ingredient.key === `fish`) {
    //   ingredient.body.velocity.y =  500;
    // }
  }
}

module.exports = Play;
