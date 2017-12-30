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
let randomTime = 15000;
let randomTime2 = 15000;

//let buttonTomatoUp2 = false;
console.log(potOvercooking);

const PlayerLives = 3;

let upKey;
let downKey;
let leftKey;
let rightKey;
// let items;
let item;
let item2;
let score = 0;
let score2 = 0;

this.emitter;

class Play extends Phaser.State {
  preload() {
  }
  create() {
    this.background();
    this.cookingPots();
    this.createLivesPlayer1();
    this.createLivesPlayer2();
    this.startGeneratingIngredients();
    //this.startGeneratingSmoke();
    this.createButtons();
    this.pickIngredient();
    this.pickIngredient2();
    this.createScore();
    this.startOvercookTimer();
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

  gecalibreerd() {
    console.log(`gecalibreerd`);
  }

  beweging() {
    console.log(`beweging`);
  }

  overcooking() {
    //console.log(`overcooking`);
    potOvercooking = true;
    // console.log(this.game.global.led);
    this.game.global.led.blink(500);

    if (potOvercooking === true) {
      this.startGeneratingSmoke();
    }
  }

  startGeneratingSmoke() {
    this.smokeEmitter();
  }

  overcooking2() {
    this.smokeEmitter2();
  }

  checkingsmoke() {
    // console.log(`checked smoke`);
    if (this.emitter.on === true) {
      this.emitter.on = false;
      const life = this.lives.getFirstAlive();
      if (life !== null) {
        life.kill();
        // console.log(`life lost`);
      } else {
        // console.log(`game Over`);
      }
    }
  }

  checkingsmoke2() {
    // console.log(`cheking smoke2`);

    if (this.emitter2.on === true) {
      console.log(`emitter wordt uitgezet`);
      this.emitter2.on = false;

      const life = this.lives.getFirstAlive();
      if (life !== null) {
        life.kill();
        // console.log(`life lost`);
      } else {
        // console.log(`game Over`);
      }
    } else {
      console.log(`emitter al uit`);
      score += 100;
    }
  }

  startOvercookTimer() {
    this.overcookingGenerator = this.time.events.loop(randomTime, this.overcooking, this);
    this.overcookingGenerator2 = this.time.events.loop(15000, this.overcooking2, this);

  }

  smokeEmitter() {

    if (!this.checkSmoke) {
      this.checkSmoke = this.time.events.loop(6000, this.checkingsmoke, this);
    } else {
      //this.checkSmoke.destroy();
      console.log(`check`);
    }

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
    // if (this.emitter.on === false) {
    //   this.emitter.on = true;
    // } else {
    //   this.emitter.on = false;
    //   const life = this.lives.getFirstAlive();
    //   if (life !== null) {
    //     life.kill();
    //     console.log(`life lost`);
    //   } else {
    //     console.log(`game Over`);
    //   }
    // }
    console.log(this.emitter);
  }

  smokeEmitter2() {

    console.log(`smokeEmitter`);
    if (this.emitter2) {
      if (this.emitter2.on === false) {
        this.emitter2.on = true;
      }
    }
    this.checkSmoke = this.time.events.add(5000, this.checkingsmoke2, this);
    this.checkSmoke.autoDestroy = true;
    console.log(this.checkSmoke);

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
    console.log(this.emitter);
    this.emitter.on = false;
  }

  stopOvercooking() {
    console.log(`stop overcooking`);
    potOvercooking = false;
    if (potOvercooking === false) {
      this.stopGeneratingSmoke();
    }
    console.log(potOvercooking);
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

  startOvercookTimer() {
    this.overcookingGenerator = this.time.events.loop(Math.floor(Math.random() * 12000) + 6000, this.overcooking, this);
  }

  pickIngredient() {
    //isalive functie lost dit op
    this.game.global.addscore = true;
    if (this.ingredient) {
      if (this.ingredient.position.y === this.game.world.centerY) {
        this.ingredient.kill();
        const life = this.lives.getFirstAlive();
      //  console.log(this.lives.getFirstAlive());
        if (life !== null) {
          life.kill();
          // console.log(`life lost`);
        } else {
          //this.game.state.start(`winner`);
          // console.log(`game Over`);
        }
        // console.log(`-1 leven`);
        // console.log(this.ingredient.alive);
      }
    }

  //  console.log(this.ingredient);

    this.items = [
      [`egg`, upKey],
      [`meat`, downKey],
      [`fish`, leftKey],
      [`tomato`, this.game.global.buttonTomatoUp],
      [`potato`, rightKey],
      [`carrot`, downKey]
    ];
    item = this.items[Math.floor(Math.random() * this.items.length)];
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
    this.game.global.addscore2 = true;
    //isalive functie lost dit op
    if (this.ingredient2) {
      if (this.ingredient2.alive === true) {
        this.ingredient2.kill();
        const life2 = this.lives2.getFirstAlive();

        if (life2 !== null) {
          life2.kill();
          //console.log(`life lost`);
        } else {
          //this.game.state.start(`winner2`);
          // console.log(`game Over`);
        }
        // console.log(`-1 leven`);
        // console.log(this.ingredient2.alive);
      }
    }

    this.items2 = [
      [`egg`, upKey ],
      [`meat`, downKey ],
      [`fish`, leftKey],
      [`tomato`, leftKey ],
      [`potato`, upKey ],
      [`carrot`, downKey ]
    ];
    item2 = this.items2[Math.floor(Math.random() * this.items2.length)];
    this.ingredient2 = this.add.sprite(this.game.world.centerX + 200, this.game.world.centerY, item2[0]);
    this.ingredient2.anchor.set(0.5);
    this.game.physics.arcade.enable(this.ingredient2);
  }
  update() {

    randomTime = this.game.rnd.integerInRange(15000, 30000);
    console.log(randomTime);

    // ================== PLAYER 1 ======================

    if (this.ingredient.position.y >= 633) {
      this.ingredient.destroy();
    }

    if (this.game.global.buttonTomatoUp && item[0] === `tomato`) {
      if (this.game.global.addscore) {
        score += 100;
        this.game.global.addscore = false;
      }
      if (this.ingredient.body) {
        this.ingredient.body.velocity.y = 200;
      }
      this.scoreField.text = `score${score}`;
    }

    if (this.game.global.buttonMeatUp && item[0] === `meat`) {
      if (this.game.global.addscore) {
        score += 100;
        this.game.global.addscore = false;
      }
      if (this.ingredient.body) {
        this.ingredient.body.velocity.y = 200;
      }
      this.scoreField.text = `score${score}`;
    }

    if (this.game.global.buttonEggUp && item[0] === `egg`) {
      if (this.game.global.addscore) {
        score += 100;
        this.game.global.addscore = false;
      }
      if (this.ingredient.body) {
        this.ingredient.body.velocity.y = 200;
      }
      this.scoreField.text = `score${score}`;
    }

    if (this.game.global.buttonFishUp && item[0] === `fish`) {
      if (this.game.global.addscore) {
        score += 100;
        this.game.global.addscore = false;
      }
      if (this.ingredient.body) {
        this.ingredient.body.velocity.y = 200;
      }
      this.scoreField.text = `score${score}`;
    }

    if (this.game.global.buttonCarrotUp && item[0] === `carrot`) {
      if (this.game.global.addscore) {
        score += 100;
        this.game.global.addscore = false;
      }
      if (this.ingredient.body) {
        this.ingredient.body.velocity.y = 200;
      }
      this.scoreField.text = `score${score}`;
    }

    if (this.game.global.buttonPotatoUp && item[0] === `potato`) {
      if (this.game.global.addscore) {
        score += 100;
        this.game.global.addscore = false;
      }
      if (this.ingredient.body) {
        this.ingredient.body.velocity.y = 200;
      }
      this.scoreField.text = `score${score}`;
    }

    // ================== PLAYER 2 ======================

    if (this.ingredient2.position.y >= 633) {
      this.ingredient2.destroy();
    }

    if (this.game.global.buttonTomatoUp2 && item2[0] === `tomato`) {
      console.log(`het werkt`);
      if (this.game.global.addscore2) {
        score += 100;
        this.game.global.addscore2 = false;
      }
      if (this.ingredient2.body) {
        this.ingredient2.body.velocity.y = 200;
      }
      this.scoreField2.text = `score${score}`;
    }

    if (this.game.global.buttonMeatUp2 && item2[0] === `meat`) {
      if (this.game.global.addscore2) {
        score += 100;
        this.game.global.addscore2 = false;
      }
      if (this.ingredient2.body) {
        this.ingredient2.body.velocity.y = 200;
      }
      this.scoreField2.text = `score${score}`;
    }

    if (this.game.global.buttonEggUp2 && item2[0] === `egg`) {
      if (this.game.global.addscore2) {
        score += 100;
        this.game.global.addscore2 = false;
      }
      if (this.ingredient2.body) {
        this.ingredient2.body.velocity.y = 200;
      }
      this.scoreField2.text = `score${score}`;
    }

    if (this.game.global.buttonFishUp2 && item2[0] === `fish`) {
      if (this.game.global.addscore2) {
        score += 100;
        this.game.global.addscore2 = false;
      }
      if (this.ingredient2.body) {
        this.ingredient2.body.velocity.y = 200;
      }
      this.scoreField2.text = `score${score}`;
    }

    if (this.game.global.buttonCarrotUp2 && item2[0] === `carrot`) {
      if (this.game.global.addscore2) {
        score += 100;
        this.game.global.addscore2 = false;
      }
      if (this.ingredient2.body) {
        this.ingredient2.body.velocity.y = 200;
      }
      this.scoreField2.text = `score${score}`;
    }

    if (this.game.global.buttonPotatoUp2 && item2[0] === `potato`) {
      if (this.game.global.addscore2) {
        score += 100;
        this.game.global.addscore2 = false;
      }
      if (this.ingredient2.body) {
        this.ingredient2.body.velocity.y = 200;
      }
      this.scoreField2.text = `score${score}`;
    }

    // this.game.world.bringToTop(this.pot1);
    // this.potsTeam1.bringToTop();
    // this.pot2.bringToTop();
  }

}

module.exports = Play;
