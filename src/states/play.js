// src/states/play.js

import Phaser from 'phaser';
import { Player } from '../sprites/player';;

export class Play extends Phaser.State {
    create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.player = new Player(this.game, 20, this.game.height);
        this.game.add.existing(this.player);

        this.cursors = this.game.input.keyboard.createCursorKeys();
    }

    update() {
        this.player.move(this.cursors);
    }
}
