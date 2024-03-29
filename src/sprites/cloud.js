import Phaser from 'phaser';

export class Cloud extends Phaser.Sprite {
  constructor(game, x, y, velocity, changeOnTickValue, rainHeight) {
    super(game, x, y, 'cloudsprite');
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.immovable = true;
    this.y = y;
    this.startY = y;
    this.x = 800

    this.changeOnTickValue = changeOnTickValue;

    this.animations.add('dry', [0]);
    this.animations.add('rain', [1]);


    this.body.velocity.x = -velocity;
    this.count = 0;
    this.animations.play('dry', 10, true);

    // add emitter for rain
    this.emitter = this.game.add.emitter(40, 60, 400);
    this.emitter.width = this.width;
    //this.emitter.angle = 30; // uncomment to set an angle for the rain.

    this.emitter.makeParticles('rain');

    this.emitter.minParticleScale = 0.5;
    this.emitter.maxParticleScale = 0.5;

    this.emitter.setYSpeed(400, 400);
    this.emitter.setXSpeed(0, 0);

    this.emitter.minRotation = 0;
    this.emitter.maxRotation = 10;
    this.emitter.start(false, rainHeight, 5, 0);
    this.emitter.on = false;

    this.addChild(this.emitter);
  }

  changeState() {
    const animationType = this.animations.currentAnim.name;
    switch (animationType) {
      case "dry":
        this.animations.play('rain', 10, true);
        this.isRaining = true;
        this.emitter.on = true;
        break;
      case "rain":
        this.animations.play('dry', 10, true);
        this.isRaining = false;
        this.emitter.on = false;
        break
      default:
    }
  }



  update() {
    this.count++;
    if (this.count % this.changeOnTickValue === 0) {
      this.changeState();
    };
  }
}
