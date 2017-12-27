const Button = require(`../objects/Button.js`);
const Play = require(`./play.js`);
const Instruct = require(`./Instruct.js`);
const winnerPlayer1 = require(`./winner.js`);

let counter = 0;

class Intro extends Phaser.State {
  preload() {
    this.load.image(`logo`, `./assets/logo.png`);
    this.load.image(`how_button`, `./assets/hoe_button.png`);
    this.load.image(`start_button`, `./assets/start_button.png`);
    this.load.image(`life`, `./assets/life.png`);
    this.game.load.image(`smoke`, `assets/smoke.png`);
    this.game.load.image(`tiles`, `assets/tiles.png`);
    this.game.load.image(`pot`, `assets/cooking_pot.png`);
    this.game.load.image(`backPot`, `assets/backPot.png`);
    this.game.load.image(`frontPot`, `assets/frontPot.png`);
    this.game.load.image(`carrot`, `assets/carrot.png`);
    this.game.load.image(`egg`, `assets/egg.png`);
    this.game.load.image(`fish`, `assets/fish.png`);
    this.game.load.image(`meat`, `assets/meat.png`);
    this.game.load.image(`potato`, `assets/patato.png`);
    this.game.load.image(`tomato`, `assets/tomato.png`);
    this.game.load.image(`cookingPot`, `assets/cookingPot.png`);
    this.game.load.image(`cookingPotFront`, `assets/cookingPotFront.png`);

    this.game.state.add(`Play`, Play, false);
    this.game.state.add(`Instruct`, Instruct, false);
    this.game.state.add(`winner`, winnerPlayer1, false);
  }
  create() {
    this.middleX = this.game.world.centerX;
    this.middleY = this.game.world.centerY;
    this.game.stage.backgroundColor = `#ddb440`;
    // this.game.stage.backgroundColor = `#ddb440`; #ab332f
    this.game.add.tileSprite(0, 600, this.world.width, this.world.height, `tiles`);
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
    this.game.add.tween(this.fish).to({angle: 360}, 2400, Phaser.Easing.Cubic.In, true, - 1, 0);

    this.potato = this.game.add.sprite(this.middleX - 150, this.middleY + 180, `potato`);
    this.potato.anchor.set(0.5);
    this.game.add.tween(this.potato).to({angle: 360}, 2400, Phaser.Easing.Linear.In, true, 500, - 1, 0);

    this.egg = this.game.add.sprite(this.middleX - 150, this.middleY + 180, `egg`);
    this.egg.anchor.set(0.5);
    this.game.add.tween(this.egg).to({angle: 360}, 2400, Phaser.Easing.Linear.In, true, 500, - 1, 0);

    this.meat = this.game.add.sprite(this.middleX - 150, this.middleY + 180, `meat`);
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
  }

  howClick() {
    this.game.state.start(`Instruct`);
  }

  startClick() {
    this.game.state.start(`Play`);
  }

  update() {
    counter ++;
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

    if (counter > 50) {
      this.i2 += this.increment;
      //console.log(`this.I = ${this.i2}`);
      const posx2 = this.math.bezierInterpolation(this.points2.x, this.i2);
      posy2 = this.math.bezierInterpolation(this.points2.y, this.i2);
      this.carrot.x = posx2;
      this.carrot.y = posy2;
    }

    if (counter > 20) {
      this.i3 += this.increment;
      const posx3 = this.math.bezierInterpolation(this.points3.x, this.i3);
      posy3 = this.math.bezierInterpolation(this.points3.y, this.i3);
      this.fish.x = posx3;
      this.fish.y = posy3;
    }

    if (counter > 70) {
      this.i4 += this.increment + 0.005;
      const posx4 = this.math.bezierInterpolation(this.points4.x, this.i4);
      posy4 = this.math.bezierInterpolation(this.points4.y, this.i4);
      this.potato.x = posx4;
      this.potato.y = posy4;
    }

    if (counter > 100) {
      this.i5 += this.increment;
      const posx5 = this.math.bezierInterpolation(this.points5.x, this.i5);
      posy5 = this.math.bezierInterpolation(this.points5.y, this.i5);
      this.egg.x = posx5;
      this.egg.y = posy5;
    }

    if (counter > 140) {
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
