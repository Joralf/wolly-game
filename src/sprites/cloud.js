import Phaser from 'phaser';

const CLOUD_SPEED = 500;
const CLOUD_GRAVITY = 0;


export class Cloud extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'cloud');
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.gravity.y = CLOUD_GRAVITY;
  }
}
