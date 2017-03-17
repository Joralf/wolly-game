// src/states/play.js

import Phaser from 'phaser';
import { Player } from '../sprites/player';;

export class Play extends Phaser.State {
    create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.player = new Player(this.game, 350, 300);
        this.game.add.existing(this.player);

        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.game.input.keyboard.addKeyCapture([ Phaser.KeyCode.SPACEBAR ]);
    }

    update() {
        this.player.move(this.cursors);
    }
}
