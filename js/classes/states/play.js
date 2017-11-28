const Pot = require(`../objects/Pots.js`);

let upKey;
let downKey;
let leftKey;
let rightKey;
// let items;
let item;
let item2;
let score = 0;
let score2 = 0;

class Play extends Phaser.State {
  preload() {
  }
  create() {
    this.background();
    this.cookingPots();
    this.startGeneratingIngredients();
    this.createButtons();
    this.pickIngredient();
    this.pickIngredient2();
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
    this.scoreField = this.add.text(20, 20, `score: 0`, {font: `20px BigJohn`, fill: `black`});
    this.scoreField2 = this.add.text(1000, 20, `score: 0`, {font: `20px BigJohn`, fill: `black`});

  }
  background() {
    this.game.stage.backgroundColor = `#FFFFFF`;
    this.game.add.tileSprite(0, 0, 1500, 600, `tiles`);
  }
  cookingPots() {
    this.potsTeam1 = this.game.add.group();
    this.pot1 = new Pot(this.game, this.game.world.centerX + 200, this.game.world.centerY + 200);
    this.pot2 = new Pot(this.game, this.game.world.centerX - 200, this.game.world.centerY + 200);
    this.potsTeam1.add(this.pot1);
    this.potsTeam1.add(this.pot2);
  }

  startGeneratingIngredients() {
    this.ingredientsGenerator = this.time.events.loop(3000, this.pickIngredient, this);
    this.ingredientsGenerator2 = this.time.events.loop(3000, this.pickIngredient2, this);
    this.ingredientsGenerator.timer.start();
    this.ingredientsGenerator2.timer.start();
  }
  pickIngredient() {
    //isalive functie lost dit op
    if (this.ingredient) {
      if (this.ingredient.alive === true) {
        this.ingredient.kill();
        console.log(`-1 leven`);
        console.log(this.ingredient.alive);
      }
    }

    this.items = [
      [`egg`, upKey],
      [`meat`, downKey],
      [`fish`, leftKey],
      [`tomato`, rightKey],
      [`potato`, rightKey],
      [`carrot`, downKey]
    ];
    item = this.items[Math.floor(Math.random() * this.items.length)];
    this.ingredient = this.add.sprite(this.game.world.centerX - 200 , this.game.world.centerY, item[0]);
    this.ingredient.anchor.set(0.5);
    console.log(item);
    //this.add.sprite(300, 300, item);
  }
  pickIngredient2() {
    //isalive functie lost dit op
    if (this.ingredient2) {
      if (this.ingredient2.alive === true) {
        this.ingredient2.kill();
        console.log(`-1 leven`);
        console.log(this.ingredient2.alive);
      }
    }

    this.items2 = [
      [`egg`, upKey ],
      [`meat`, downKey ],
      [`fish`, leftKey],
      [`tomato`, rightKey ],
      [`potato`, upKey ],
      [`carrot`, downKey ]
    ];
    item2 = this.items2[Math.floor(Math.random() * this.items2.length)];
    this.ingredient2 = this.add.sprite(this.game.world.centerX + 200 , this.game.world.centerY, item2[0]);
    this.ingredient2.anchor.set(0.5);
    console.log(item2);
    //this.add.sprite(300, 300, item);
  }
  update() {
    if (item[1].isDown) {
      this.ingredient.destroy();
      score += 100;
      this.scoreField.text = `score${score}`;
    }

    if (item2[1].isDown) {
      this.ingredient2.destroy();
      score2 += 100;
      this.scoreField2.text = `score${score2}`;
    }
  }
}

module.exports = Play;
