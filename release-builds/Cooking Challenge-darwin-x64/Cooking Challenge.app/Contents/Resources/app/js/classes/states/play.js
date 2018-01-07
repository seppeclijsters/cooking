const Pot = require(`../objects/Pots.js`);

require(`../../johnny_five`);

let potOvercooking = false;
let potOvercooking2 = false;
const PlayerLives = 3;
let gameOvervariable = false;
let item;
let item2;
let ingredientTimer = 5000;
let repeatCounter = 3;

class Play extends Phaser.State {
  preload() {
  }
  create() {
    this.game.global.counterIngredients = 0;
    this.background();
    this.cookingPots();
    this.createLivesPlayer1();
    this.createLivesPlayer2();
    this.createSound();
    this.startGeneratingIngredients();
    this.startMusic();
    this.pickIngredient();
    this.pickIngredient2();
    this.createScore();
    this.startOvercookTimer();
  }
  createSound() {
    this.done = this.game.add.audio(`done`);
    this.bg = this.game.add.audio(`bg`);
  }

  startMusic() {
    this.bg.play();
  }

  startOvercookTimer() {
    this.overcookingGenerator = this.time.events.loop(15000, this.overcooking, this);
    this.overcookingGenerator2 = this.time.events.loop(15000, this.overcooking2, this);
  }

  createLivesPlayer1() {
    this.lives = this.add.group();
    const firstLifeIconX = 150 + (PlayerLives * 30);
    for (let i = 0;i < PlayerLives;i ++) {
      const life = this.lives.create(firstLifeIconX - (90 * i), 90, `life`);
      life.anchor.setTo(0.5, 0.5);
    }
  }

  createLivesPlayer2() {
    this.lives2 = this.add.group();
    const firstLifeIconX2 = this.game.width - 150 - (PlayerLives * 30);
    for (let i = 0;i < PlayerLives;i ++) {
      const life2 = this.lives2.create(firstLifeIconX2 + (90 * i), 90, `life`);
      life2.anchor.setTo(0.5, 0.5);
    }
  }

  overcooking() {
    potOvercooking = true;
    this.game.global.led.blink(250);

    if (potOvercooking === true) {
      this.smokeEmitter();
    }
  }

  overcooking2() {
    potOvercooking2 = true;
    this.game.global.led2.blink(250);

    if (potOvercooking2 === true) {
      this.smokeEmitter2();
    }
  }

  checkingsmoke() {
    if (this.emitter.on === true) {
      this.emitter.on = false;
      this.game.global.led.stop().off();
      this.game.global.led.color(`#FF0000`);
      const life = this.lives.getFirstAlive();
      if (life !== null) {
        life.kill();
      }
    }
  }

  checkingsmoke2() {
    if (this.emitter2.on === true) {
      this.emitter2.on = false;
      this.game.global.led2.stop().off();
      this.game.global.led2.color(`#FF0000`);
      const life2 = this.lives2.getFirstAlive();
      if (life2 !== null) {
        life2.kill();
      }
    }
  }

  smokeEmitter() {
    this.checkSmoke = this.time.events.repeat(6000, 1, this.checkingsmoke, this);

    if (!this.emitter) {
      this.emitter = this.game.add.emitter(this.game.world.centerX - 200, 500, 400);
      this.emitter.makeParticles(`smoke`);
      this.emitter.setScale(0.05, 1, 1);
      this.emitter.setRotation(0, 0);
      this.emitter.setAlpha(.02);
      this.emitter.width = 10;
      this.emitter.gravity = - 500;
      this.emitter.start(false, 2000, 10);
    }

    if (this.emitter.on === false) {
      this.emitter.on = true;
    }
  }

  smokeEmitter2() {
    this.checkSmoke2 = this.time.events.repeat(6000, 1, this.checkingsmoke2, this);

    if (!this.emitter2) {
      this.emitter2 = this.game.add.emitter(this.game.world.centerX + 200, 500, 400);
      this.emitter2.makeParticles(`smoke`);
      this.emitter2.setScale(0.05, 1, 1);
      this.emitter2.setRotation(0, 0);
      this.emitter2.setAlpha(.02);
      this.emitter2.width = 10;
      this.emitter2.gravity = - 500;
      this.emitter2.start(false, 2000, 10);
    }

    if (this.emitter2.on === false) {
      this.emitter2.on = true;
    }
  }

  scaleSort(a, b) {
    console.log(a, b);
  }

  stopGeneratingSmoke() {
    if (this.emitter) {
      this.emitter.on = false;
    }
  }

  stopGeneratingSmoke2() {
    if (this.emitter2) {
      this.emitter2.on = false;
    }
  }

  stopOvercooking() {
    potOvercooking = false;
    if (potOvercooking === false) {
      this.stopGeneratingSmoke();
    }
  }

  createScore() {
    this.scoreField = this.add.text(80, 40, `score: 0`, {font: `20px BigJohn`, fill: `black`});
    this.scoreField2 = this.add.text(this.game.width - 80, 40, `score: 0`, {font: `20px BigJohn`, fill: `black`});
    this.scoreField.anchor.set(0.5);
    this.scoreField2.anchor.set(0.5);

  }
  background() {
    this.background = this.game.stage.backgroundColor = `f5cf30`;
    this.game.add.tileSprite(140, this.game.world.height - 160, this.game.width, 200, `kitchenTile4`);
    this.kitchenCloset = this.add.sprite(50, this.game.world.height - 160, `kitchenCloset2`);
    this.game.add.tileSprite(0, 0, 50, this.game.height, `kitchenTile3`);
    this.game.add.tileSprite(50, 0, 70, this.game.world.centerY + 240, `kitchenTile2`);
    this.game.add.tileSprite(50, this.game.world.centerY + 240, this.game.width, 60, `kitchenTile2`);
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

  startGeneratingIngredients() {
    this.ingredientsGenerator = this.time.events.repeat(ingredientTimer, repeatCounter, this.pickIngredient, this);
    this.ingredientsGenerator2 = this.time.events.repeat(ingredientTimer, repeatCounter, this.pickIngredient2, this);
    this.ingredientsGenerator.timer.start();
    this.ingredientsGenerator2.timer.start();
  }

  startloop() {
    this.ingredientsGeneratorLoop = this.time.events.loop(ingredientTimer, this.pickIngredient, this);
    this.ingredientsGenerator2Loop = this.time.events.loop(ingredientTimer, this.pickIngredient2, this);
    this.ingredientsGeneratorLoop.timer.start();
    this.ingredientsGenerator2Loop.timer.start();
  }

  pickIngredient() {
    this.game.global.count ++;
    this.game.global.led.color(`#ff0000`);
    this.game.global.addscore = true;
    if (this.ingredient) {
      if (this.ingredient.alive === true && this.ingredient.position.y === this.game.world.centerY) {
        this.ingredient.kill();
        const life = this.lives.getFirstAlive();

        if (life !== null) {
          life.kill();
        }
      }
    }

    this.items = [
      [`egg`, this.game.global.buttonEggUp],
      [`cheese`, this.game.global.buttonMeatUp],
      [`fish`, this.game.global.buttonFishUp],
      [`tomato`, this.game.global.buttonTomatoUp],
      [`mushroom`, this.game.global.buttonPotatoUp],
      [`carrot`, this.game.global.buttonCarrotUp]
    ];
    item = this.items[Math.floor(Math.random() * this.items.length)]; //Math.floor(Math.random() * this.items.length)
    this.ingredient = this.add.sprite(this.game.world.centerX - 200, this.game.world.centerY, item[0]);
    this.ingredient.anchor.set(0.5);
    this.game.physics.arcade.enable(this.ingredient);
  }

  pickIngredient2() {
    this.game.global.addscore2 = true;
    this.game.global.led2.color(`#ff0000`);
    if (this.ingredient2) {
      if (this.ingredient2.alive === true && this.ingredient2.position.y === this.game.world.centerY) {
        this.ingredient2.kill();
        const life2 = this.lives2.getFirstAlive();

        if (life2 !== null) {
          life2.kill();
        }
      }
    }

    this.items2 = [
      [`egg`, this.game.global.buttonEggUp2],
      [`cheese`, this.game.global.buttonMeatUp2],
      [`fish`, this.game.global.buttonFishUp2],
      [`tomato`, this.game.global.buttonTomatoUp2],
      [`mushroom`, this.game.global.buttonPotatoUp2],
      [`carrot`, this.game.global.buttonCarrotUp2]
    ];
    item2 = this.items2[Math.floor(Math.random() * this.items2.length)];
    this.ingredient2 = this.add.sprite(this.game.world.centerX + 200, this.game.world.centerY, item2[0]);
    this.ingredient2.anchor.set(0.5);
    this.game.physics.arcade.enable(this.ingredient2);
  }
  update() {

    if (!this.lives.children[2].alive) {
      this.gameOver();
      this.game.state.start(`winner2`);
    }

    if (!this.lives2.children[2].alive) {
      this.gameOver();
      this.game.state.start(`winner`);
    }

    this.game.global.counter ++;
    console.log(this.game.global.counter, this.game.global.count);
    if (this.game.global.count === 3) {
      if (this.game.global.counter === 900 + 60) {
        console.log(`uitgevoerd 1`);
        ingredientTimer = 4000;
        repeatCounter = 5;
        this.startGeneratingIngredients();
      }
    } else if (this.game.global.count === 8) {
      if (this.game.global.counter === 2160 + 60) {
        console.log(`uitgevoerd 2`);
        ingredientTimer = 3000;
        this.startGeneratingIngredients();
      }
    } else if (this.game.global.count === 13) {
      if (this.game.global.counter === 3120 + 60) {
        console.log(`uitgevoerd 3`);
        ingredientTimer = 2000;
        this.startGeneratingIngredients();
      }
    } else if (this.game.global.count === 18) {
      if (this.game.global.counter === 3780 + 60) {
        console.log(`uitgevoerd 4`);
        ingredientTimer = 1500;
        this.startloop();
      }
    }


    if (this.game.global.distance <= 10 && this.emitter) {
      if (!this.done.isPlaying) {
        this.done.play();
      }
      this.stopGeneratingSmoke();
      this.game.global.led.stop().off();
      this.game.global.led.color(`#FF0000`);
    }

    if (this.game.global.distance2 <= 10 && this.emitter) {
      if (!this.done.isPlaying) {
        this.done.play();
        //console.log(this.done.isPlaying);
      }
      this.stopGeneratingSmoke2();
      this.game.global.led2.stop().off();
      this.game.global.led2.color(`#FF0000`);
    }


    // ================== PLAYER 1 ======================

    if (this.ingredient.position.y >= 633) {
      this.ingredient.destroy();
    }

    if (this.game.global.buttonTomatoUp && item[0] === `tomato`) {
      if (this.game.global.addscore) {
        this.game.global.led.color(`#00ff00`);
        this.game.global.score += 100;
        this.game.global.addscore = false;
      }
      if (this.ingredient.body) {
        this.ingredient.body.velocity.y = 300;
      }
      this.scoreField.text = `score${this.game.global.score}`;
    }

    if (this.game.global.buttonMeatUp && item[0] === `cheese`) {
      if (this.game.global.addscore) {
        this.game.global.led.color(`#00ff00`);
        this.game.global.score += 100;
        this.game.global.addscore = false;
      }
      if (this.ingredient.body) {
        this.ingredient.body.velocity.y = 300;
      }
      this.scoreField.text = `score${this.game.global.score}`;
    }

    if (this.game.global.buttonEggUp && item[0] === `egg`) {
      if (this.game.global.addscore) {
        this.game.global.led.color(`#00ff00`);
        this.game.global.score += 100;
        this.game.global.addscore = false;
      }
      if (this.ingredient.body) {
        this.ingredient.body.velocity.y = 300;
      }
      this.scoreField.text = `score${this.game.global.score}`;
    }

    if (this.game.global.buttonFishUp && item[0] === `fish`) {
      if (this.game.global.addscore) {
        this.game.global.led.color(`#00ff00`);
        this.game.global.score += 100;
        this.game.global.addscore = false;
      }
      if (this.ingredient.body) {
        this.ingredient.body.velocity.y = 300;
      }
      this.scoreField.text = `score${this.game.global.score}`;
    }

    if (this.game.global.buttonCarrotUp && item[0] === `carrot`) {
      if (this.game.global.addscore) {
        this.game.global.led.color(`#00ff00`);
        this.game.global.score += 100;
        this.game.global.addscore = false;
      }
      if (this.ingredient.body) {
        this.ingredient.body.velocity.y = 300;
      }
      this.scoreField.text = `score${this.game.global.score}`;
    }

    if (this.game.global.buttonPotatoUp && item[0] === `mushroom`) {
      if (this.game.global.addscore) {
        this.game.global.led.color(`#00ff00`);
        this.game.global.score += 100;
        this.game.global.addscore = false;
      }
      if (this.ingredient.body) {
        this.ingredient.body.velocity.y = 300;
      }
      this.scoreField.text = `score${this.game.global.score}`;
    }

    // ================== PLAYER 2 ======================

    if (this.ingredient2.position.y >= 633) {
      this.ingredient2.destroy();
    }

    if (this.game.global.buttonTomatoUp2 && item2[0] === `tomato`) {
      console.log(`het werkt`);
      if (this.game.global.addscore2) {
        this.game.global.led2.color(`#00ff00`);
        this.game.global.score2 += 100;
        this.game.global.addscore2 = false;
        this.game.global.led2.color(`#00ff00`);
      }
      if (this.ingredient2.body) {
        this.ingredient2.body.velocity.y = 300;
      }
      this.scoreField2.text = `score${this.game.global.score2}`;
    }

    if (this.game.global.buttonMeatUp2 && item2[0] === `cheese`) {
      if (this.game.global.addscore2) {
        this.game.global.led2.color(`#00ff00`);
        this.game.global.score2 += 100;
        this.game.global.addscore2 = false;
      }
      if (this.ingredient2.body) {
        this.ingredient2.body.velocity.y = 300;
      }
      this.scoreField2.text = `score${this.game.global.score2}`;
    }

    if (this.game.global.buttonEggUp2 && item2[0] === `egg`) {
      if (this.game.global.addscore2) {
        this.game.global.led2.color(`#00ff00`);
        this.game.global.score2 += 100;
        this.game.global.addscore2 = false;
      }
      if (this.ingredient2.body) {
        this.ingredient2.body.velocity.y = 300;
      }
      this.scoreField2.text = `score${this.game.global.score2}`;
    }

    if (this.game.global.buttonFishUp2 && item2[0] === `fish`) {
      if (this.game.global.addscore2) {
        this.game.global.led2.color(`#00ff00`);
        this.game.global.score2 += 100;
        this.game.global.addscore2 = false;
      }
      if (this.ingredient2.body) {
        this.ingredient2.body.velocity.y = 300;
      }
      this.scoreField2.text = `score${this.game.global.score2}`;
    }

    if (this.game.global.buttonCarrotUp2 && item2[0] === `carrot`) {
      if (this.game.global.addscore2) {
        this.game.global.led2.color(`#00ff00`);
        this.game.global.score2 += 100;
        this.game.global.addscore2 = false;
      }
      if (this.ingredient2.body) {
        this.ingredient2.body.velocity.y = 300;
      }
      this.scoreField2.text = `score${this.game.global.score2}`;
    }

    if (this.game.global.buttonPotatoUp2 && item2[0] === `mushroom`) {
      if (this.game.global.addscore2) {
        this.game.global.led2.color(`#00ff00`);
        this.game.global.score2 += 100;
        this.game.global.addscore2 = false;
      }
      if (this.ingredient2.body) {
        this.ingredient2.body.velocity.y = 300;
      }
      this.scoreField2.text = `score${this.game.global.score2}`;
    }

    this.ingredient.sendToBack();
    this.ingredient2.sendToBack();
    this.pot2.bringToTop();
    this.pot1.bringToTop();


  }

  gameOver() {
    console.log(`game over`);
    this.bg.stop();
    this.ingredientsGenerator.timer.destroy();
    this.ingredientsGenerator2.timer.destroy();

    if (this.ingredientsGeneratorLoop) {
      this.ingredientsGeneratorLoop.timer.destroy();
      console.log(this.ingredientsGeneratorLoop.timer);
    }

    if (this.ingredientsGeneratorLoop2) {
      this.ingredientsGeneratorLoop2.timer.destroy();
      console.log(this.ingredientsGeneratorLoop2.timer);
    }

    ingredientTimer = 5000;
    repeatCounter = 3;
    gameOvervariable = true;
    this.game.state.start(`winner2`);
  }

}

module.exports = Play;
