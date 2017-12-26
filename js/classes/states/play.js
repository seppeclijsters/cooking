const Pot = require(`../objects/Pots.js`);

require(`../../johnny_five`);
const five = require(`johnny-five`);

let buttonTomatoUp = false;
let buttonMeatUp = false;
let buttonFishUp = false;
let buttonPotatoUp = false;
let buttonEggUp = false;
let buttonCarrotUp = false;
let potOvercooking = false;
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
    this.initButtons();
    this.background();
    this.cookingPots();
    this.createLivesPlayer1();
    this.createLivesPlayer2();
    this.startGeneratingIngredients();
    this.startGeneratingSmoke();
    this.createLivesPlayer1();
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
    this.smokeEmitter();
  }

  checkingsmoke() {
    console.log(`cheking smoke`);

    if (this.emitter.on === true) {
      console.log(`emitter wordt uitgezet`);
      this.emitter.on = false;

      const life = this.lives.getFirstAlive();
      if (life !== null) {
        life.kill();
        console.log(`life lost`);
      } else {
        console.log(`game Over`);
      }
    } else {
      console.log(`emitter al uit`);
      score += 100;
    }
  }

  startOvercookTimer() {
    this.overcookingGenerator = this.time.events.loop(15000, this.overcooking, this);
  }

  smokeEmitter() {

    console.log(`smokeEmitter`);
    if (this.emitter) {
      if (this.emitter.on === false) {
        this.emitter.on = true;
      }
    }
    this.checkSmoke = this.time.events.add(5000, this.checkingsmoke, this);
    this.checkSmoke.autoDestroy = true;
    console.log(this.checkSmoke);

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
    console.log(`emitter uit`);

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


  initButtons() {
    this.board = new five.Board();

    this.board.on(`ready`, () => {
      this.buttonTomato = new five.Button(2);
      // this.buttonMeat = new five.Button(3);
      // this.buttonEgg = new five.Button(4);
      // this.buttonFish = new five.Button(5);
      // this.buttonCarrot = new five.Button(6);
      // this.buttonPotato = new five.Button(7);
      //
      const motion = new five.Motion(8);
      //
        // "calibrated" occurs once, at the beginning of a session,
      motion.on(`calibrated`, this.gecalibreerd);
      // "motionstart" events are fired when the "calibrated"
      // proximal area is disrupted, generally by some form of movement
      motion.on(`motionstart`, () => {
        console.log(`motionstart`, Date.now());
        this.stopOvercooking();
      });

      // "motionend" events are fired following a "motionstart" event
      // when no movement has occurred in X ms
      motion.on(`motionend`, () => {
        console.log(`motionend`, Date.now());
      });

      // motion.on(`data`, function(data) {
      //   console.log(data.detectedMotion);
      // });
      //
      this.buttonTomato.on(`down`, () => {
        buttonTomatoUp = true;
        console.log(`buttonTomato`);
      });

      this.buttonTomato.on(`up`, () => {
        buttonTomatoUp = false;
      });
      //
      // this.buttonMeat.on(`down`, () => {
      //   buttonMeatUp = true;
      //   console.log(`buttonMeat`);
      // });
      //
      // this.buttonMeat.on(`up`, () => {
      //   buttonMeatUp = false;
      // });
      //
      // this.buttonEgg.on(`down`, () => {
      //   buttonEggUp = true;
      //   // console.log(`buttonEgg`);
      // });
      //
      // this.buttonEgg.on(`up`, () => {
      //   buttonEggUp = false;
      // });
      //
      // this.buttonFish.on(`down`, () => {
      //   buttonFishUp = true;
      //   console.log(`buttonFish`);
      // });
      //
      // this.buttonFish.on(`up`, () => {
      //   buttonFishUp = false;
      // });
      //
      // this.buttonCarrot.on(`down`, () => {
      //   buttonCarrotUp = true;
      //   console.log(`buttonCarrot`);
      // });
      //
      // this.buttonCarrot.on(`up`, () => {
      //   buttonCarrotUp = false;
      // });
      //
      // this.buttonPotato.on(`down`, () => {
      //   buttonPotatoUp = true;
      //   console.log(`buttonPotato`);
      // });
      //
      // this.buttonPotato.on(`up`, () => {
      //   buttonPotatoUp = false;
      // });

      // Initialize the RGB LED
      // const led = new five.Led.RGB({
      //   pins: {
      //     red: 10,
      //     green: 9,
      //     blue: 11
      //   }
      // });
      //
      // led.on();
      // led.color(`#FF0000`);

      // led.blink(1000);
    });

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
    // this.game.add.tileSprite(0, 0, 1500, 600, `tiles`);
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
        const life = this.lives.getFirstAlive();
        if (life !== null) {
          life.kill();
          // console.log(`life lost`);
        } else {
          // console.log(`game Over`);
        }
        // console.log(`-1 leven`);
        // console.log(this.ingredient.alive);
      }
    }

    this.items = [
      [`egg`, upKey],
      [`meat`, downKey],
      [`fish`, leftKey],
      [`tomato`, buttonTomatoUp],
      [`potato`, rightKey],
      [`carrot`, downKey]
    ];
    item = this.items[Math.floor(Math.random() * this.items.length)];
    this.ingredient = this.add.sprite(this.game.world.centerX - 200, this.game.world.centerY, item[0]);
    this.ingredient.anchor.set(0.5);
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
    //isalive functie lost dit op
    if (this.ingredient2) {
      if (this.ingredient2.alive === true) {
        this.ingredient2.kill();
        const life2 = this.lives2.getFirstAlive();

        if (life2 !== null) {
          life2.kill();
          // console.log(`life lost`);
        } else {
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
    // console.log(item2);
    //this.add.sprite(300, 300, item);
  }
  update() {
    //this.emitter.customSort(this.scaleSort, this);

    if (buttonTomatoUp && item[0] === `tomato`) {
      this.ingredient.destroy();
      score += 100;
      this.scoreField.text = `score${score}`;
      buttonTomatoUp = false;
    }

    if (buttonMeatUp && item[0] === `meat`) {
      this.ingredient.destroy();
      score += 100;
      this.scoreField.text = `score${score}`;
      buttonMeatUp = false;
    }

    if (buttonEggUp && item[0] === `egg`) {
      this.ingredient.destroy();
      score += 100;
      this.scoreField.text = `score${score}`;
      buttonEggUp = false;
    }

    if (buttonFishUp && item[0] === `fish`) {
      this.ingredient.destroy();
      score += 100;
      this.scoreField.text = `score${score}`;
      buttonFishUp = false;
    }

    if (buttonCarrotUp && item[0] === `carrot`) {
      this.ingredient.destroy();
      score += 100;
      this.scoreField.text = `score${score}`;
      buttonCarrotUp = false;
    }

    if (buttonPotatoUp && item[0] === `potato`) {
      this.ingredient.destroy();
      score += 100;
      this.scoreField.text = `score${score}`;
      buttonPotatoUp = false;
    }
    // if (item[1] === true) {
    //   console.log(item[1]);
    //   this.ingredient.destroy();
    //   score += 100;
    //   this.scoreField.text = `score${score}`;
    // }

    if (item2[1].isDown) {
      //this.stopGeneratingSmoke();
      //this.emitter.on = false;
      this.ingredient2.destroy();
      score2 += 100;
      this.scoreField2.text = `score${score2}`;
    }
  }

}

module.exports = Play;
