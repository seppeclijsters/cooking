const Button = require(`../objects/Button.js`);
const Play = require(`./play.js`);
const Instruct = require(`./Instruct.js`);
const winnerPlayer1 = require(`./winner.js`);
const winnerPlayer2 = require(`./winner2.js`);

require(`../../johnny_five`);
const five = require(`johnny-five`);
let distance;

// let counter = 0;
//let buttonTomatoUp;

class Intro extends Phaser.State {
  preload() {
    this.load.image(`logo`, `./assets/logo.png`);
    this.load.image(`how_button`, `./assets/hoe_button.png`);
    this.load.image(`start_button`, `./assets/start_button.png`);
    this.load.image(`life`, `./assets/chefLife.png`);
    this.game.load.image(`smoke`, `assets/smoke.png`);
    this.game.load.image(`kitchenCloset`, `assets/kitchencloset.png`);
    this.game.load.image(`tiles`, `assets/tiles.png`);
    this.game.load.image(`tile1`, `assets/tile1.png`);
    this.game.load.image(`tile2`, `assets/tile2.png`);
    this.game.load.image(`tile3`, `assets/tile3.png`);
    this.game.load.image(`tile4`, `assets/tile4.png`);
    this.game.load.image(`tools`, `assets/tools.png`);
    this.game.load.image(`pot`, `assets/cooking_pot.png`);
    this.game.load.image(`backPot`, `assets/backPot.png`);
    this.game.load.image(`frontPot`, `assets/frontPot.png`);
    this.game.load.image(`cheese`, `assets/cheese.png`);
    this.game.load.image(`mushroom`, `assets/mushroom.png`);
    this.game.load.image(`carrot`, `assets/carrot.png`);
    this.game.load.image(`egg`, `assets/egg.png`);
    this.game.load.image(`fish`, `assets/fish.png`);
    this.game.load.image(`meat`, `assets/meat.png`);
    this.game.load.image(`potato`, `assets/potato.png`);
    this.game.load.image(`tomato`, `assets/tomato.png`);
    this.game.load.image(`cookingPot`, `assets/cookingPot.png`);
    this.game.load.image(`cookingPotFront`, `assets/cookingPotFront.png`);
    this.game.load.audio(`done`, `assets/ring.mp3`);
    this.game.load.audio(`voice`, `assets/voice.mp3`);
    this.game.load.audio(`bg`, `assets/bg.mp3`);
    this.game.load.audio(`applause`, `assets/applause.wav`);


    this.game.load.image(`kitchenTile1`, `assets/tilePlay1.png`);
    this.game.load.image(`kitchenTile2`, `assets/tilePlay2.png`);
    this.game.load.image(`kitchenTile3`, `assets/tilePlay3.png`);
    this.game.load.image(`kitchenTile4`, `assets/tilePlay4.png`);
    this.game.load.image(`kitchenCloset2`, `assets/kitchencloset2.png`);
    // this.game.load.image(`kitchenTile5`, `assets/tilePlay1.png`);

    this.game.load.image(`cook`, `assets/cook.png`);
    this.game.load.image(`head`, `assets/head.png`);
    this.game.load.image(`body`, `assets/body.png`);
    this.game.load.image(`chalkboard`, `assets/chalkboard.png`);
    this.game.load.image(`chalkboard2`, `assets/chalkboard2.png`);

    this.game.state.add(`Play`, Play, false);
    this.game.state.add(`Instruct`, Instruct, false);
    this.game.state.add(`winner`, winnerPlayer1, false);
    this.game.state.add(`winner2`, winnerPlayer2, false);
  }
  create() {
    this.voice = this.game.add.audio(`voice`);
    this.middleX = this.game.world.centerX;
    this.middleY = this.game.world.centerY;
    this.game.stage.backgroundColor = `#e2a489`;
    // this.game.stage.backgroundColor = `#ddb440`; #ab332f
    this.game.add.tileSprite(140, this.middleY, this.game.width, this.game.height, `tile3`);
    this.game.add.tileSprite(60, 0, 80, this.game.height, `tile1`);
    this.game.add.tileSprite(60, this.middleY - 20, this.game.width, 50, `tile1`);
    this.add.sprite(60, this.middleY + 20, `kitchenCloset`);
    this.game.add.tileSprite(0, 0, 60, this.game.height, `tile3`);
    this.game.add.tileSprite(0, this.middleY + 250, this.world.width, this.world.height, `tile2`);
    this.tools = this.add.sprite(this.game.width - 200, 150, `tools`);
    this.tools.anchor.set(.5);
    //this.background();
    this.logo();
    this.buttons();
    this.array();
  }

  array() {
    this.bmd = null;
    // points arrays - one for x and one for y
    this.points = {
      x: [this.middleX - 150, this.middleX, this.middleX + 150],
      y: [this.middleY + 50, this.middleY - 500, this.middleY]
    };

    this.points2 = {
      x: [this.middleX - 150, this.middleX, this.middleX + 150],
      y: [this.middleY + 150, this.middleY - 400, this.middleY]
    };

    this.points3 = {
      x: [this.middleX - 150, this.middleX, this.middleX + 100],
      y: [this.middleY + 150, this.middleY - 400, this.middleY]
    };

    this.points4 = {
      x: [this.middleX - 150, this.middleX, this.middleX + 50],
      y: [this.middleY + 180, this.middleY - 300, this.middleY]
    };

    this.points5 = {
      x: [this.middleX - 150, this.middleX, this.middleX + 150],
      y: [this.middleY + 180, this.middleY - 500, this.middleY]
    };

    this.points6 = {
      x: [this.middleX - 150, this.middleX, this.middleX + 65],
      y: [this.middleY + 180, this.middleY - 200, this.middleY]
    };
    // this.stage.backgroundColor = `#eee`;
    this.increment = .012;
    this.i = 0;
    this.i2 = 0;
    this.i3 = 0;
    this.i4 = 0;
    this.i5 = 0;
    this.i6 = 0;


    this.bmd = this.add.bitmapData(this.game.width, this.game.height);
    this.bmd.addToWorld();
    for (let j = 0;j < 1;j += this.increment) {
      const posx = this.math.bezierInterpolation(this.points.x, j);
      const posy = this.math.bezierInterpolation(this.points.y, j);
      this.bmd.rect(posx, posy, 3, 3, `rgba(245, 0, 0, 0)`);
    }
  }
  logo() {
    this.pot = this.game.add.sprite(this.middleX, this.middleY + 200, `backPot`);
    // this.pot.scale.setTo(1.25);
    this.pot.anchor.set(0.5);

    // this.logo = this.game.add.sprite(this.middleX, this.game.world.centerY - 200, `logo`);
    // this.game.add.tween(this.logo).from({y: - 200}, 1500, Phaser.Easing.Bounce.Out, true);
    // this.logo.anchor.set(0.5);
    this.tomato = this.game.add.sprite(this.middleX - 150, this.middleY + 150, `tomato`);
    this.tomato.anchor.set(0.5);
    // this.game.add.tween(this.tomato).to({x: [ 300, 600, 0, 0 ], y: [ 400, 600, 400, 0 ]}, 4000, `Sine.easeInOut`, true, - 1, false);
    this.game.add.tween(this.tomato).to({angle: 360}, 2400, Phaser.Easing.Cubic.In, true, - 1, 0);

    this.carrot = this.game.add.sprite(this.middleX - 150, this.middleY + 150, `carrot`);
    this.carrot.anchor.set(0.5);
    this.game.add.tween(this.carrot).to({angle: 360}, 2400, Phaser.Easing.Cubic.In, true, - 1, 0);

    this.fish = this.game.add.sprite(this.middleX - 150, this.middleY + 150, `fish`);
    this.fish.anchor.set(0.5);
    this.game.add.tween(this.fish).to({angle: 360}, 2900, Phaser.Easing.Cubic.In, true, - 1, 0);

    this.potato = this.game.add.sprite(this.middleX - 150, this.middleY + 180, `cheese`);
    this.potato.anchor.set(0.5);
    this.game.add.tween(this.potato).to({angle: 360}, 2400, Phaser.Easing.Linear.In, true, 500, - 1, 0);

    this.egg = this.game.add.sprite(this.middleX - 150, this.middleY + 180, `egg`);
    this.egg.anchor.set(0.5);
    this.game.add.tween(this.egg).to({angle: 360}, 2400, Phaser.Easing.Linear.In, true, 500, - 1, 0);

    this.meat = this.game.add.sprite(this.middleX - 150, this.middleY + 180, `mushroom`);
    this.meat.anchor.set(0.5);
    this.game.add.tween(this.meat).to({angle: - 250}, 2400, Phaser.Easing.Linear.In, true, 2000, - 1, 0);

    this.pot2 = this.game.add.sprite(this.middleX, this.middleY + 200, `frontPot`);
    this.pot2.anchor.set(0.5);
  }

  buttons() {
    this.how_button = new Button(this.game, this.game.world.centerX + 110, this.game.world.centerY + 250, `how_button`, this.howClick);
    this.how_button.events.onInputDown.add(this.howClick, this);

    this.start_button = new Button(this.game, this.game.world.centerX - 60, this.game.world.centerY + 250, `start_button`, this.startClick);
    this.start_button.events.onInputDown.add(this.startClick, this);

    this.game.add.existing(this.start_button);
    this.game.add.existing(this.how_button);

    const boards = new five.Boards([`A`, `B`]).on(`ready`, () => {
      console.log(boards);
      boards.each(board => {

        if (board.id === `A`) {

          const proximity = new five.Proximity({
            controller: `HCSR04`,
            pin: 12,
            board
          });

          const updateDistance = cm => {
            this.game.global.distance = cm;
            // console.log(`intro`, this.game.global.distance);
          };


          proximity.on(`data`, function() {
            updateDistance(this.cm);
            // console.log(`Proximity: `)
            // console.log(`  in 1 : `, this.cm);
            // console.log(`-----------------`);
          });

          proximity.on(`change`, function() {
            // updateDistance(this.cm);
            //console.log(distance);
            // console.log(`The obstruction has moved.`);
          });

          this.game.global.led = new five.Led.RGB({
            pins: {
              red: 9,
              green: 10,
              blue: 11,
            },
            board
          });
          //this.game.global.led.stop().off();
          this.game.global.led.color(`#FF0000`);
          this.game.global.led.on();
          // led.color(`#FF0000`);

          //this.game.global.led.blink(1500);

          this.buttonStart = new five.Button({
            pin: 13,
            board
          });


          this.buttonStart.on(`down`, () => {
            console.log(`gameStart intro`);

            //this.game.state.start(`Play`);
            // if (this.game.state.current === `Intro`) {
            //   console.log(`start state`);
            //   this.game.state.start(`Play`);
            // }
          });

          this.buttonStart.on(`up`, () => {
            this.voice.stop();
            console.log(`gameStart intro`);
            console.log(this.game.state.current);
            if (this.game.state.current === `winner`) {
              this.game.state.start(`Intro`);
              this.game.global.led.stop().off();
              this.game.global.led2.stop().off();

            }

            if (this.game.state.current === `winner2`) {
              this.game.state.start(`Intro`);
              this.game.global.led.stop().off();
              this.game.global.led2.stop().off();
            }

            if (this.game.state.current === `Intro`) {
              console.log(`start state`);
              this.game.state.start(`Play`);
            }
          });

          this.buttonTomato = new five.Button({
            pin: 2,
            board
          });

          this.buttonTomato.on(`down`, () => {
            this.game.global.buttonTomatoUp = true;
            console.log(`buttonTomato`);
          });

          this.buttonTomato.on(`up`, () => {
            this.game.global.buttonTomatoUp = false;
          });

          this.buttonMeat = new five.Button({
            pin: 3,
            board
          });

          this.buttonMeat.on(`down`, () => {
            this.game.global.buttonMeatUp = true;
            console.log(`buttonMeat`);
          });

          this.buttonMeat.on(`up`, () => {
            this.game.global.buttonMeatUp = false;
          });

          this.buttonEgg = new five.Button({
            pin: 4,
            board
          });

          this.buttonEgg.on(`down`, () => {
            this.game.global.buttonEggUp = true;
            console.log(`buttonEgg`);
          });

          this.buttonEgg.on(`up`, () => {
            this.game.global.buttonEggUp = false;
          });

          this.buttonFish = new five.Button({
            pin: 5,
            board
          });

          this.buttonFish.on(`down`, () => {
            this.game.global.buttonFishUp = true;
            console.log(`buttonFish`);
          });

          this.buttonFish.on(`up`, () => {
            this.game.global.buttonFishUp = false;
          });

          this.buttonCarrot = new five.Button({
            pin: 6,
            board
          });

          this.buttonCarrot.on(`down`, () => {
            this.game.global.buttonCarrotUp = true;
            console.log(`buttonCarrot`);
          });

          this.buttonCarrot.on(`up`, () => {
            this.game.global.buttonCarrotUp = false;
          });

          // this.buttonPotato = new five.Button(7);
          this.buttonPotato = new five.Button({
            pin: 7,
            board
          });

          this.buttonPotato.on(`down`, () => {
            this.game.global.buttonPotatoUp = true;
            console.log(`buttonPotato`);
          });

          this.buttonPotato.on(`up`, () => {
            this.game.global.buttonPotatoUp = false;
          });
        }

        if (board.id === `B`) {
          const proximity2 = new five.Proximity({
            controller: `HCSR04`,
            pin: 12,
            board
          });

          const updateDistance2 = cm => {
            this.game.global.distance2 = cm;
            //console.log(`intro`, this.game.global.distance);
          };

          proximity2.on(`data`, function() {
            updateDistance2(this.cm);
            // console.log(`Proximity: `);
            // console.log(`  cm proximity2 : `, this.cm);
            // console.log(`  in  : `, this.in);
            // console.log(`-----------------`);
          });

          proximity2.on(`change`, function() {
            // console.log(`The obstruction has moved.`);
          });

          this.game.global.led2 = new five.Led.RGB({
            pins: {
              red: 9,
              green: 10,
              blue: 11,
            },
            board
          });
          // this.game.global.led2.stop().off();
          this.game.global.led2.color(`#FF0000`);
          this.game.global.led2.on();
          // led2.color(`#FF0000`);

          // led2.blink(1500);

          this.buttonInstructions = new five.Button({
            pin: 13,
            board
          });


          this.buttonInstructions.on(`down`, () => {
            console.log(`buttonInstructions`);
            //this.game.state.start(`Play`);
            // if (this.game.state.current === `Intro`) {
            //   console.log(`start state`);
            //   this.game.state.start(`Play`);
            // }
          });

          this.buttonInstructions.on(`up`, () => {
            console.log(this.game.state.current);
            if (this.game.state.current === `Intro`) {
              console.log(`Instruct state`);
              this.voice.play();
              // this.game.state.start(`Instruct`);
            }
          });

          this.buttonTomato2 = new five.Button({
            pin: 2,
            board
          });

          this.buttonTomato2.on(`down`, () => {
            this.game.global.buttonTomatoUp2 = true;
            console.log(`buttonTomato2`);
          });

          this.buttonTomato2.on(`up`, () => {
            this.game.global.buttonTomatoUp2 = false;
          });

          this.buttonMeat2 = new five.Button({
            pin: 3,
            board
          });

          this.buttonMeat2.on(`down`, () => {
            this.game.global.buttonMeatUp2 = true;
            console.log(`buttonMeat2`);
          });

          this.buttonMeat2.on(`up`, () => {
            this.game.global.buttonMeatUp2 = false;
          });

          this.buttonEgg2 = new five.Button({
            pin: 4,
            board
          });

          this.buttonEgg2.on(`down`, () => {
            this.game.global.buttonEggUp2 = true;
            console.log(`buttonEgg2`);
          });

          this.buttonEgg2.on(`up`, () => {
            this.game.global.buttonEggUp2 = false;
          });

          this.buttonFish2 = new five.Button({
            pin: 5,
            board
          });

          this.buttonFish2.on(`down`, () => {
            this.game.global.buttonFishUp2 = true;
            console.log(`buttonFish2`);
          });

          this.buttonFish2.on(`up`, () => {
            this.game.global.buttonFishUp2 = false;
          });

          this.buttonCarrot2 = new five.Button({
            pin: 6,
            board
          });

          this.buttonCarrot2.on(`down`, () => {
            this.game.global.buttonCarrotUp2 = true;
            console.log(`buttonCarrot2`);
          });

          this.buttonCarrot2.on(`up`, () => {
            this.game.global.buttonCarrotUp2 = false;
          });

          this.buttonPotato2 = new five.Button({
            pin: 7,
            board
          });

          this.buttonPotato2.on(`down`, () => {
            this.game.global.buttonPotatoUp2 = true;
            console.log(`buttonPotato2`);
          });

          this.buttonPotato2.on(`up`, () => {
            this.game.global.buttonPotatoUp2 = false;
          });
        }
      });
    });
  }

  howClick() {
    this.game.state.start(`Instruct`);
  }

  startClick() {
    this.i = 0;
    this.i2 = 0;
    this.i3 = 0;
    this.i4 = 0;
    this.i5 = 0;
    this.i6 = 0;
    this.increment = .012;
    this.game.state.start(`Play`);
  }

  update() {
    this.game.global.distance = distance;
    this.game.global.counterIngredients ++;
    //console.log(`counter = ${counter}`);
    let posy2;
    let posy3;
    let posy4;
    let posy5;
    let posy6;
    const posx = this.math.bezierInterpolation(this.points.x, this.i);
    const posy = this.math.bezierInterpolation(this.points.y, this.i);
    this.tomato.x = posx;
    this.tomato.y = posy;

    if (this.game.global.counterIngredients > 50) {
      this.i2 += this.increment;
      //console.log(`this.I = ${this.i2}`);
      const posx2 = this.math.bezierInterpolation(this.points2.x, this.i2);
      posy2 = this.math.bezierInterpolation(this.points2.y, this.i2);
      this.carrot.x = posx2;
      this.carrot.y = posy2;
    }

    if (this.game.global.counterIngredients > 20) {
      this.i3 += this.increment;
      const posx3 = this.math.bezierInterpolation(this.points3.x, this.i3);
      posy3 = this.math.bezierInterpolation(this.points3.y, this.i3);
      this.fish.x = posx3;
      this.fish.y = posy3;
    }

    if (this.game.global.counterIngredients > 70) {
      this.i4 += this.increment + 0.005;
      const posx4 = this.math.bezierInterpolation(this.points4.x, this.i4);
      posy4 = this.math.bezierInterpolation(this.points4.y, this.i4);
      this.potato.x = posx4;
      this.potato.y = posy4;
    }

    if (this.game.global.counterIngredients > 100) {
      this.i5 += this.increment;
      const posx5 = this.math.bezierInterpolation(this.points5.x, this.i5);
      posy5 = this.math.bezierInterpolation(this.points5.y, this.i5);
      this.egg.x = posx5;
      this.egg.y = posy5;
    }

    if (this.game.global.counterIngredients > 140) {
      this.i6 += this.increment + 0.005;
      const posx6 = this.math.bezierInterpolation(this.points6.x, this.i6);
      posy6 = this.math.bezierInterpolation(this.points6.y, this.i6);
      this.meat.x = posx6;
      this.meat.y = posy6;
    }
  //  console.log(this.i);

    this.i += this.increment;
    if (posy > 550) {
      // this.i = 0;
      // this.i += this.increment;
      this.i = 300;
    }

    if (posy2 > 620) {
      this.carrot.kill();
    }

    if (posy3 > 620) {
      this.fish.kill();
    }

    if (posy4 > 620) {
      this.potato.kill();
    }

    if (posy5 > 620) {
      this.egg.kill();
    }

    if (posy6 > 620) {
      this.meat.kill();
    }
  }
}

module.exports = Intro;
