// src/sprites/floor.js

import Phaser from 'phaser';

export class Floor extends Phaser.Sprite {
    constructor(game, x, y) {
        super(game, x, y);
        this.game.physics.arcade.enable(this, Phaser.Physics.ARCADE);
        this.body.immovable = true;
        this.height = 1;
        this.scale.x = game.width;
    }
}
