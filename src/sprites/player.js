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
    }

    move(cursors) {
        if (cursors.left.isDown) {
          this.body.velocity.x = -PLAYER_SPEED;
        } else if (cursors.right.isDown) {
          this.body.velocity.x = PLAYER_SPEED;
        } else {
          this.body.velocity.x = 0;
        }
    }
}
