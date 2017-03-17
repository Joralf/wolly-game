// src/sprites/wizard.js
import Phaser from 'phaser';

const PLAYER_SPEED = 500;
const PLAYER_GRAVITY = 500;

export class Player extends Phaser.Sprite {
    constructor(game, x, y) {
        super(game, x, y, 'player');

        this.game.physics.enable(this, Phaser.Physics.ARCADE);

        this.body.collideWorldBounds = true;
        this.body.gravity.y = PLAYER_GRAVITY;

        this.animations.add('walk');
        this.animations.add('stand', [0]);
        this.animations.play('walk', 4, true);

        this.anchor.setTo(.5, .5);
        this.jumping = false;
    }

    jump() {
      if (!this.jumping) {
        this.body.velocity.y = -250;
        this.jumping = true;
      }
    }

    move(cursors) {
        if (cursors.left.isDown) {
          this.body.velocity.x = -PLAYER_SPEED;
          this.scale.x = -1;
        } else if (cursors.right.isDown) {
          this.body.velocity.x = PLAYER_SPEED;
          this.scale.x = 1;
        } else {
          this.body.velocity.x = 0;
        }
    }

    update() {
      if (this.jumping === true && this.y === 488) {
        this.jumping = false;
      }
    }
}
