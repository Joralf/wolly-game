// src/states/play.js

import Phaser from 'phaser';
import { Player } from '../sprites/player';
import { Cloud } from '../sprites/cloud';

export class Play extends Phaser.State {
    create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.player = new Player(this.game, 20, this.game.height);
        //adding random clouds, feel free to refactor :)
        this.cloud = new Cloud(this.game, 0, 0);
        this.cloud1 = new Cloud(this.game, 500, 200);
        this.cloud.scale.setTo(0.5, 0.5);
        this.cloud1.scale.setTo(0.4, 0.4);
        this.game.add.existing(this.player);
        this.game.add.existing(this.cloud);
        this.game.add.existing(this.cloud1);

        this.cursors = this.game.input.keyboard.createCursorKeys();
    }

    update() {
        this.player.move(this.cursors);
    }
}
