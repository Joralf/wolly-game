import Phaser from 'phaser';

export class Logo extends Phaser.Sprite {
    constructor(game, x, y) {
      super(game, x, y, 'wolly-front');

      this.x = 100;
      this.y = 100;
    }

}
