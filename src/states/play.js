// src/states/play.js

import Phaser from 'phaser';
import { Player } from '../sprites/player';
import { Cloud } from '../sprites/cloud';
import { Floor } from '../sprites/floor';

export class Play extends Phaser.State {
    create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // add background
        this.background = this.game.add.tileSprite(0, 0, 800, 600, 'background');

        // add invisible floor so player walks a bit above the edge of the window
        this.floor = new Floor(this.game, 0, 550);
        this.game.add.existing(this.floor);

        // add player
        this.player = new Player(this.game, 20, 500);
        this.game.add.existing(this.player);

        // add 1 cloud
        this.cloud = new Cloud(this.game, 600, 50);
        this.game.add.existing(this.cloud);

        // assign cursor keys for controls
        this.cursors = this.game.input.keyboard.createCursorKeys();

        // angle of the clouds
        this.angle = 0;
    }

    update() {
        // collision of player with invisible floor
        this.game.physics.arcade.collide(this.player, this.floor);

        // collision of player with cloud, only return true when it's raining
        this.game.physics.arcade.collide(this.player, this.cloud.emitter,
          () => {

            this.game.state.start('gameover');
          }
        );

        // move the player
        this.player.move(this.cursors);

        //  Scroll the background
        this.background.tilePosition.x -= 20;

        // move the cloud in a sinuswave
        this.cloud.y = 300 + Math.sin(this.angle) * 50;
        this.angle += .1;
    }
}
