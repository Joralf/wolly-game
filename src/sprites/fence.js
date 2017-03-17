import Phaser from 'phaser';

export class Fence extends Phaser.Sprite {

    constructor(game, x, y) {
      super(game, x, y, 'fence');
      this.game.physics.enable(this, Phaser.Physics.ARCADE);
      this.body.immovable = true;
      this.x = 800;
      this.y = y;

      this.body.velocity.x = -300;

    }

}
