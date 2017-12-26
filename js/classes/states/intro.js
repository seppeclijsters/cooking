const Button = require(`../objects/Button.js`);
const Play = require(`./play.js`);
const Instruct = require(`./Instruct.js`);
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
  }
  create() {
    this.middleX = this.game.world.centerX;
    this.middleY = this.game.world.centerY;
    this.game.stage.backgroundColor = `#ddb440`;
    // this.game.stage.backgroundColor = `#ddb440`; #ab332f
    //this.background();
    this.logo();
    this.buttons();
    this.array();
  }

  array() {
    this.bmd = null;
    // points arrays - one for x and one for y
    this.points = {
      x: [this.middleX - 200, this.middleX, this.middleX + 200],
      y: [this.middleY, this.middleY - 500, this.middleY]
    };

    this.points2 = {
      x: [this.middleX - 160, this.middleX, this.middleX + 200],
      y: [this.middleY + 100, this.middleY - 500, this.middleY]
    };

    this.points3 = {
      x: [this.middleX - 160, this.middleX, this.middleX + 200],
      y: [this.middleY, this.middleY - 500, this.middleY]
    };

    this.points4 = {
      x: [this.middleX - 160, this.middleX, this.middleX + 200],
      y: [this.middleY, this.middleY - 300, this.middleY]
    };
    // this.stage.backgroundColor = `#eee`;
    this.increment = .01;
    this.i = 0;
    this.i2 = 0;
    this.i3 = 0;
    this.i4 = 0;


    this.bmd = this.add.bitmapData(this.game.width, this.game.height);
    this.bmd.addToWorld();
    for (let j = 0;j < 1;j += this.increment) {
      const posx = this.math.bezierInterpolation(this.points.x, j);
      const posy = this.math.bezierInterpolation(this.points.y, j);
      this.bmd.rect(posx, posy, 3, 3, `rgba(245, 0, 0, 0)`);
    }
  }
  logo() {
    this.pot = this.game.add.sprite(this.middleX, this.middleX - 25, `cookingPot`);
    this.pot.scale.setTo(1.25);
    this.pot.anchor.set(0.5);

    this.logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY - 200, `logo`);
    this.game.add.tween(this.logo).from({y: - 200}, 1500, Phaser.Easing.Bounce.Out, true);
    this.logo.anchor.set(0.5);
    this.tomato = this.game.add.sprite(300, 400, `tomato`);
    this.tomato.anchor.set(0.5);
    //this.tomato.scale.setTo(2);
    // this.game.add.tween(this.tomato).to({x: [ 300, 600, 0, 0 ], y: [ 400, 600, 400, 0 ]}, 4000, `Sine.easeInOut`, true, - 1, false);
    this.game.add.tween(this.tomato).to({angle: 360}, 2400, Phaser.Easing.Cubic.In, true, - 1, 0);

    this.carrot = this.game.add.sprite(300, 400, `carrot`);
    this.carrot.anchor.set(0.5);
    //this.carrot.scale.setTo(2);
    this.game.add.tween(this.carrot).to({angle: 360}, 2400, Phaser.Easing.Cubic.In, true, - 1, 0);

    this.fish = this.game.add.sprite(300, 400, `fish`);
    this.fish.anchor.set(0.5);
    //this.fish.scale.setTo(2);
    this.game.add.tween(this.fish).to({angle: 360}, 2400, Phaser.Easing.Cubic.In, true, 1300, - 1, 0);

    this.potato = this.game.add.sprite(300, 400, `potato`);
    this.potato.anchor.set(0.5);
    this.game.add.tween(this.potato).to({angle: 360}, 2400, Phaser.Easing.Cubic.In, true, - 1, 0);

    // this.potFront = this.game.add.sprite(this.middleX, this.middleX - 25, `cookingPotFront`);
    // this.potFront.scale.setTo(0.74);
    // this.potFront.anchor.set(0.5);
  }

  buttons() {
    this.how_button = new Button(this.game, this.game.world.centerX + 150, this.game.world.centerY + 300, `how_button`, this.howClick);
    this.how_button.events.onInputDown.add(this.howClick, this);

    this.start_button = new Button(this.game, this.game.world.centerX - 150, this.game.world.centerY + 300, `start_button`, this.startClick);
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
    const posx = this.math.bezierInterpolation(this.points.x, this.i);
    const posy = this.math.bezierInterpolation(this.points.y, this.i);
    this.tomato.x = posx;
    this.tomato.y = posy;

    if (counter > 50) {
      this.i2 += this.increment;
      //console.log(`this.I = ${this.i2}`);
      const posx2 = this.math.bezierInterpolation(this.points2.x, this.i2);
      const posy2 = this.math.bezierInterpolation(this.points2.y, this.i2);
      this.carrot.x = posx2;
      this.carrot.y = posy2;
    }

    if (counter > 20) {
      this.i3 += this.increment;
      const posx3 = this.math.bezierInterpolation(this.points3.x, this.i3);
      const posy3 = this.math.bezierInterpolation(this.points3.y, this.i3);
      this.fish.x = posx3;
      this.fish.y = posy3;
    }

    if (counter > 70) {
      this.i4 += this.increment;
      const posx4 = this.math.bezierInterpolation(this.points4.x, this.i4);
      const posy4 = this.math.bezierInterpolation(this.points4.y, this.i4);
      this.potato.x = posx4;
      this.potato.y = posy4;
    }

    this.i += this.increment;
    if (posy > 480) {
      this.i = 0;
      this.i += this.increment;
    }
  }
}

module.exports = Intro;
