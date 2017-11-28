const Pot = require(`../objects/Pots.js`);

let upKey;
let downKey;
let leftKey;
let rightKey;
// let items;
let item;
let score = 0;

class Play extends Phaser.State {
  preload() {
  }
  create() {
    this.background();
    this.cookingPots();
    this.startGeneratingIngredients();
    this.createButtons();
    this.pickIngredient();
    this.createScore();
  }
  createButtons() {
    this.cursors = this.input.keyboard.createCursorKeys();
    upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
    downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
  }
  createScore() {
    this.scoreField = this.add.text(20, 20, `score: 0`, {font: `20px BigJohn`, fill: `black`})
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
    //this.ingredientsGenerator = this.time.events.loop(2900, this.killIngredient, this);

    this.ingredientsGenerator.timer.start();
  }

  pickIngredient() {
    //isalive functie lost dit op
    if (this.ingredient) {
      if (this.ingredient.alive == true) {
        this.ingredient.kill();
        console.log(`-1 leven`);
        console.log(this.ingredient.alive);
      }
    }

    this.items = [
      [`egg`, upKey ],
      [`meat`, downKey ],
      [`fish`, leftKey],
      [`tomato`, rightKey ]
      // [`potato`, this.cursors.down.shiftKey ],
      // [`carrot`, this.cursors.spaceKey.isDown ]
    ];
    item = this.items[Math.floor(Math.random() * this.items.length)];
    this.ingredient = this.add.sprite(300, 300, item[0]);
    console.log(item);
    //this.add.sprite(300, 300, item);
  }
  update() {
    if (item[1].isDown) {
      this.ingredient.destroy();
      score += 100;
      this.scoreField.text = `score${score}`;
    }
  }
}

module.exports = Play;
