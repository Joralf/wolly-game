// src/states/play.js

import Phaser from 'phaser';
import { Player } from '../sprites/player';
import { Cloud } from '../sprites/cloud';
import { CloudRain } from '../sprites/cloud-rain';

export class Play extends Phaser.State {
    create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.background = this.game.add.tileSprite(0, 0, 800, 600, 'background');

        this.player = new Player(this.game, 20, this.game.height);
        //adding random clouds, feel free to refactor :)
        this.cloud = new Cloud(this.game, 600, 50);
        this.cloudRain = new CloudRain(this.game, 400, 200);

        this.game.add.existing(this.player);
        this.game.add.existing(this.cloud);
        this.game.add.existing(this.cloudRain);

        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.game.input.keyboard.addKeyCapture([ Phaser.KeyCode.SPACEBAR ]);

        //  The scrolling starfield background
    }

    update() {
        this.player.move(this.cursors);
         //  Scroll the background
        this.background.tilePosition.x -= 10;
    }
}
