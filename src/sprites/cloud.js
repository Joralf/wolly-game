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

  }

  changeState() {
    const animationType = this.animations.currentAnim.name;
    console.log(animationType);
    switch (animationType) {
      case "dry":
        console.log("change state to rain");
        this.animations.play('rain', 10, true);
        this.isRaining = true;
        break;
      case "rain":
        console.log("change state to dry");
        this.animations.play('dry', 10, true);
        this.isRaining = false;
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
