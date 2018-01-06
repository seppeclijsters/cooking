const Pot = require(`../objects/Pots.js`);

require(`../../johnny_five`);
//const five = require(`johnny-five`);
//let buttonTomatoUp = false;
// let buttonMeatUp = false;
// let buttonFishUp = false;
// let buttonPotatoUp = false;
// let buttonEggUp = false;
// let buttonCarrotUp = false;
let potOvercooking = false;
let potOvercooking2 = false;
// let randomTime = 15000;
// let randomTime2 = 15000;
// let smoke = true;
//let buttonTomatoUp2 = false;


const PlayerLives = 3;

let gameOvervariable = false;
let upKey;
let downKey;
let leftKey;
let rightKey;
// let items;
let item;
let item2;
// let score = 0;
// let score2 = 0;
let stirr = 0;
// let counter = 0;
let ingredientTimer = 5000;
let difficulty1 = false;
// let count = - 1;
let repeatCounter = 3;

class Play extends Phaser.State {
  preload() {
    // this.emitter = this.game.add.emitter(this.game.world.centerX - 200, 500, 400);
    // this.emitter.on = false;
  }
  create() {
    this.background();
    this.cookingPots();
    this.createLivesPlayer1();
    this.createLivesPlayer2();
    this.createSound();
    this.startGeneratingIngredients();
    //this.startGeneratingSmoke();
    this.createButtons();
    this.pickIngredient();
    this.pickIngredient2();
    this.createScore();
    this.startOvercookTimer();
  }

  killingcheese() {
    this.cheese.kill();
  }

  createSound() {
    this.done = this.game.add.audio(`done`);
  }

  startOvercookTimer() {
    this.overcookingGenerator = this.time.events.loop(15000, this.overcooking, this);
    this.overcookingGenerator2 = this.time.events.loop(15000, this.overcooking2, this);
  }

  createLivesPlayer1() {
    this.lives = this.add.group();
    const firstLifeIconX = 125 - (PlayerLives * 30);
    for (let i = 0;i < PlayerLives;i ++) {
      const life = this.lives.create(firstLifeIconX + (40 * i), 70, `life`);
      life.scale.setTo(0.1, 0.1);
      life.anchor.setTo(0.5, 0.5);
    }
  }

  createLivesPlayer2() {
    this.lives2 = this.add.group();
    const firstLifeIconX2 = this.game.width - 335 - (PlayerLives * 30);
    for (let i = 0;i < PlayerLives;i ++) {
      const life2 = this.lives2.create(firstLifeIconX2 + (40 * i), 70, `life`);
      life2.scale.setTo(0.1, 0.1);
      life2.anchor.setTo(0.5, 0.5);
    }
  }

  overcooking() {
    //console.log(`overcooking`);
    potOvercooking = true;
    // console.log(this.game.global.led);
    this.game.global.led.blink(250);

    if (potOvercooking === true) {
      this.smokeEmitter();
    }
  }

  // startGeneratingSmoke() {
  //   this.smokeEmitter();
  // }
  //
  // startGeneratingSmoke2() {
  //   this.smokeEmitter2();
  // }

  overcooking2() {
    //console.log(`overcooking`);
    potOvercooking2 = true;
    // console.log(this.game.global.led);
    this.game.global.led2.blink(250);

    if (potOvercooking2 === true) {
      this.smokeEmitter2();
    }
    // this.smokeEmitter2();
    // console.log(`overcooking2`);
  }

  checkingsmoke() {
    // console.log(`checked smoke`);
    if (this.emitter.on === true) {
      this.emitter.on = false;
      this.game.global.led.stop().off();
      this.game.global.led.color(`#FF0000`);
      const life = this.lives.getFirstAlive();
      if (life !== null) {
        life.kill();
        //console.log(`life lost 1`);
      } else {
        // console.log(`life lost 1`);
        //this.game.state.start(`winner2`);
        // console.log(`game Over`);
      }
    }
  }

  checkingsmoke2() {
    // console.log(`cheking smoke2`);
    if (this.emitter2.on === true) {
      this.emitter2.on = false;
      this.game.global.led2.stop().off();
      this.game.global.led2.color(`#FF0000`);
      const life2 = this.lives2.getFirstAlive();
      if (life2 !== null) {
        // console.log(this.lives2.children[2].alive);
        life2.kill();
      } else {
        //console.log(`life lost 2`);
        //this.game.state.start(`winner`);
        // console.log(`game Over`);
      }
    }

    // if (this.emitter2.on === true) {
    //   console.log(`emitter wordt uitgezet`);
    //   this.emitter2.on = false;
    //
    //   const life = this.lives.getFirstAlive();
    //   if (life !== null) {
    //     life.kill();
    //     // console.log(`life lost`);
    //   } else {
    //     // console.log(`game Over`);
    //   }
    // } else {
    //   console.log(`emitter al uit`);
    //   score += 100;
    // }
  }

  // startOvercookTimer() {
  //
  //
  // }

  smokeEmitter() {

    //if (!this.checkSmoke) {
    this.checkSmoke = this.time.events.repeat(6000, 1, this.checkingsmoke, this);
    //} else {
      //this.checkSmoke.destroy();
      // console.log(`check`);
    //}

    if (!this.emitter) {
      this.emitter = this.game.add.emitter(this.game.world.centerX - 200, 500, 400);
      this.emitter.makeParticles(`smoke`);
      this.emitter.setScale(0.05, 1, 1);
      this.emitter.setRotation(0, 0);
      this.emitter.setAlpha(.2);
      this.emitter.width = 10;
      this.emitter.gravity = - 500;
      this.emitter.start(false, 2000, 10);
    }

    if (this.emitter.on === false) {
      this.emitter.on = true;
    }
  }

  smokeEmitter2() {

    //if (!this.checkSmoke2) {
    this.checkSmoke2 = this.time.events.repeat(6000, 1, this.checkingsmoke2, this);
    //} else {
      //this.checkSmoke.destroy();
      // console.log(`check`);
    //}

    if (!this.emitter2) {
      this.emitter2 = this.game.add.emitter(this.game.world.centerX + 200, 500, 400);
      this.emitter2.makeParticles(`smoke`);
      this.emitter2.setScale(0.05, 1, 1);
      this.emitter2.setRotation(0, 0);
      this.emitter2.setAlpha(.2);
      this.emitter2.width = 10;
      this.emitter2.gravity = - 500;
      this.emitter2.start(false, 2000, 10);
    }

    if (this.emitter2.on === false) {
      this.emitter2.on = true;
    }

    // console.log(`smokeEmitter`);
    // if (this.emitter2) {
    //   if (this.emitter2.on === false) {
    //     this.emitter2.on = true;
    //   }
    // }
    // this.checkSmoke = this.time.events.add(5000, this.checkingsmoke2, this);
    // this.checkSmoke.autoDestroy = true;
    // console.log(this.checkSmoke);
    //
    // if (!this.emitter2) {
    //   this.emitter2 = this.game.add.emitter(this.game.world.centerX + 200, 500, 400);
    //   this.emitter2.makeParticles(`smoke`);
    //   this.emitter2.setScale(0.05, 1, 1);
    //   this.emitter2.setRotation(0, 0);
    //   this.emitter2.setAlpha(.2);
    //   this.emitter2.width = 10;
    //   this.emitter2.gravity = - 500;
    //   this.emitter2.start(false, 2000, 10);
    // }

    // if (this.emitter.on === false) {
    //   console.log(`emitter aan`);
    //   this.emitter.on = true;
    // } else {
    //   this.emitter.on = false;
    // }
    // console.log(this.emitter);
  }

  scaleSort(a, b) {
    console.log(a, b);
  }

  stopGeneratingSmoke() {
    // console.log(this.emitter);
    this.emitter.on = false;
  }

  stopGeneratingSmoke2() {
    // console.log(this.emitter);
    this.emitter2.on = false;
  }

  stopOvercooking() {
    // console.log(`stop overcooking`);
    potOvercooking = false;
    if (potOvercooking === false) {
      this.stopGeneratingSmoke();
    }
    // console.log(potOvercooking);
  }

  createButtons() {
    this.cursors = this.input.keyboard.createCursorKeys();
    upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
    downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
  }
  createScore() {
    this.scoreField = this.add.text(80, 20, `score: 0`, {font: `20px BigJohn`, fill: `black`});
    this.scoreField2 = this.add.text(this.game.width - 80, 20, `score: 0`, {font: `20px BigJohn`, fill: `black`});
    this.scoreField.anchor.set(0.5);
    this.scoreField2.anchor.set(0.5);

  }
  background() {
    this.game.stage.backgroundColor = `#FFFFFF`;
    this.game.add.tileSprite(0, 0, this.game.width, this.game.height, `tiles`);
  }
  cookingPots() {
    this.potsTeam1 = this.game.add.group();
    this.pot1 = new Pot(this.game, this.game.world.centerX + 200, this.game.world.centerY + 200);
    this.pot2 = new Pot(this.game, this.game.world.centerX - 200, this.game.world.centerY + 200);
    this.potsTeam1.add(this.pot1);
    this.potsTeam1.add(this.pot2);
  }

  startGeneratingIngredients() {
    console.log(`startGeneratingIngredients`);
    this.ingredientsGenerator = this.time.events.repeat(ingredientTimer, repeatCounter, this.pickIngredient, this);
  //  his.time.events.repeat(1000, 10, this.createShieldTime, this);
    this.ingredientsGenerator2 = this.time.events.repeat(ingredientTimer, repeatCounter, this.pickIngredient2, this);
    this.ingredientsGenerator.timer.start();
    this.ingredientsGenerator2.timer.start();
  }

  startloop() {
    console.log(`heyeheyeheyeheeyeheyheyeheyeheyeheeyeheyheyeheyeheyeheeyeheyheyeheyeheyeheeyeheyheyeheyeheyeheeyeheyheyeheyeheyeheeyeheyheyeheyeheyeheeyeheyheyeheyeheyeheeyeheyheyeheyeheyeheeyeheyheyeheyeheyeheeyeheyheyeheyeheyeheeyeheyheyeheyeheyeheeyeheyheyeheyeheyeheeyehey`);
    this.ingredientsGeneratorLoop = this.time.events.loop(ingredientTimer, this.pickIngredient, this);
    this.ingredientsGenerator2Loop = this.time.events.loop(ingredientTimer, this.pickIngredient2, this);
    this.ingredientsGeneratorLoop.timer.start();
    this.ingredientsGenerator2Loop.timer.start();
  }

  pickIngredient() {
    //console.log(`pickIngredient 1`);
    this.game.global.count ++;
    this.game.global.led.color(`#ff0000`);
    this.game.global.addscore = true;
    // if (this.ingredient) {
    //   if (this.ingredient.position.y === this.game.world.centerY) {
    //     this.ingredient.kill();
    //     const life = this.lives.getFirstAlive();
    //   //  console.log(this.lives.getFirstAlive());
    //     if (life !== null) {
    //       life.kill();
    //       // console.log(`life lost`);
    //     } else {
    //       //this.game.state.start(`winner`);
    //       // console.log(`game Over`);
    //     }
    //     // console.log(`-1 leven`);
    //     // console.log(this.ingredient.alive);
    //   }
    if (this.ingredient) {
      if (this.ingredient.alive === true && this.ingredient.position.y === this.game.world.centerY) {
        this.ingredient.kill();
        const life = this.lives.getFirstAlive();

        if (life !== null) {
          life.kill();
          //console.log(this.lives.children[2].alive);
          //console.log(`life lost`);
        } else {
          // this.gameOver();
        }
        // console.log(`-1 leven`);
        // console.log(this.ingredient2.alive);
      }
    }

  //  console.log(this.ingredient);

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

    // console.log(item[1]);
    //this.add.sprite(300, 300, item);
  }

  // overcookingPot2() {
  //   if(this.smoke){
  //     this.smoke.kill();
  //     const life2 = this.lives2.getFirstAlive();
  //
  //     if (life2 !== null) {
  //       life2.kill();
  //       // console.log(`life lost`);
  //     } else {
  //       // console.log(`game Over`);
  //     }
  //   }
  // }

  pickIngredient2() {
    //console.log(`pickIngredient 2`);
    this.game.global.addscore2 = true;
    this.game.global.led2.color(`#ff0000`);
    // this.game.global.led.color(`#ff5400`);
    //isalive functie lost dit op
    if (this.ingredient2) {
      if (this.ingredient2.alive === true && this.ingredient2.position.y === this.game.world.centerY) {
        this.ingredient2.kill();
        const life2 = this.lives2.getFirstAlive();

        if (life2 !== null) {
          life2.kill();
          // console.log(this.lives2.children[2].alive);
          //console.log(`life lost`);
        } else {
          // this.gameOver();
          //this.game.state.start(`winner2`);
          // console.log(`game Over`);
        }
        // console.log(`-1 leven`);
        // console.log(this.ingredient2.alive);
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

    // if (this.ingredientsGeneratorLoop) {
    //   this.ingredientsGeneratorLoop.timer.destroy();
    //   console.log(this.ingredientsGeneratorLoop.timer);
    //   this.gameOver();
    //   // this.game.state.start(`winner2`);
    // }
    //
    // if (this.ingredientsGeneratorLoop2) {
    //   this.ingredientsGeneratorLoop2.timer.destroy();
    //   this.gameOver();
    //   // this.game.state.start(`winner2`);
    //   console.log(this.ingredientsGeneratorLoop2.timer);
    // }
    // if (gameOvervariable) {
    //   console.log(`tis gedaan met spelen`);
    // }

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


    // console.log(`DISTANCE 1`, this.game.global.distance);
    // console.log(`DISTANCE 2`, this.game.global.distance2);

    // if (this.game.global.distance <= 7) {
    //   // console.log(`geroerd`);
    //   // this.stopGeneratingSmoke();
    // }

    if (this.game.global.distance <= 10 && this.emitter) {
      if (!this.done.isPlaying) {
        this.done.play();
        //console.log(this.done.isPlaying);
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
        // this.game.global.led2.strobe(500);
        // this.game.global.led2.stop.off();
        //this.game.global.led2.color(`#ff0000`);
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

    // this.game.world.bringToTop(this.pot1);
    // // this.potsTeam1.bringToTop();
    // this.pot2.bringToTop();
  }

  gameOver() {
    console.log(`game over`);
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

    // this.ingredientsGeneratorLoop.timer.destroy();
    // this.ingredientsGenerator2Loop.timer.destroy();
    ingredientTimer = 5000;
    repeatCounter = 3;
    gameOvervariable = true;
    this.game.state.start(`winner2`);
  }

}

module.exports = Play;
