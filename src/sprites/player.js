// src/sprites/wizard.js

import Phaser from 'phaser';

export class Player extends Phaser.Sprite {
    constructor(game, x, y) {
        super(game, x, y, 'player');

        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.collideWorldBounds = true;
        this.body.gravity.y = 500;

    }

    move(cursors) {
        if (cursors.up.isDown) {
            this.body.acceleration.y = -900;
        } else if (cursors.down.isDown) {
            this.body.acceleration.y = 300;
        } else {
            this.body.acceleration.y = 0;
        }
        if (cursors.left.isDown) {
            this.body.acceleration.x = -300;
        } else if (cursors.right.isDown) {
            this.body.acceleration.x = 300;
        } else {
            this.body.acceleration.x = 0;
        }
    }
}
