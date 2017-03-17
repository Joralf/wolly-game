import Phaser from 'phaser';

const CLOUD_SPEED = 100;
const CLOUD_GRAVITY = 0;

export class Cloud extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'cloudsprite');
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.immovable = true;

    this.animations.add('dry', [0]);
    this.animations.add('rain', [1]);

    this.body.gravity.y = CLOUD_GRAVITY;
    this.body.velocity.x = -CLOUD_SPEED;
    this.count = 0;
    this.animations.play('dry', 10, true);

    // add emitter for rain
    this.emitter = this.game.add.emitter(40, 60, 400);
    this.emitter.width = this.width;
    //this.emitter.angle = 30; // uncomment to set an angle for the rain.

    this.emitter.makeParticles('rain');

    this.emitter.minParticleScale = 0.1;
    this.emitter.maxParticleScale = 0.5;

    this.emitter.setYSpeed(300, 500);
    this.emitter.setXSpeed(-5, 5);

    this.emitter.minRotation = 0;
    this.emitter.maxRotation = 0;
    this.emitter.start(false, 1600, 5, 0);
    this.emitter.on = false;

    this.addChild(this.emitter);

  }

  changeState() {
    const animationType = this.animations.currentAnim.name;
    switch (animationType) {
      case "dry":
        console.log("change state to rain");
        this.animations.play('rain', 10, true);
        this.isRaining = true;
        this.emitter.on = true;
        break;
      case "rain":
        console.log("change state to dry");
        this.animations.play('dry', 10, true);
        this.isRaining = false;
        this.emitter.on = false;
        break
      default:
    }
  }



  update() {
    this.count++;
    if (this.count % 60 === 0) {
      this.changeState();
    };

  }
}
