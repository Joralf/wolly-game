import Phaser from 'phaser';

const CLOUD_SPEED = 100;
const CLOUD_GRAVITY = 0;

export class CloudRain extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'cloud-rain');
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.immovable = true;

    this.body.gravity.y = CLOUD_GRAVITY;
    this.body.velocity.x = -CLOUD_SPEED;
  }
}
