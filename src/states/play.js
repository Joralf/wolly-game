// src/states/play.js

import Phaser from 'phaser';
import { Player } from '../sprites/player';
import { Cloud } from '../sprites/cloud';
import { Floor } from '../sprites/floor';

export class Play extends Phaser.State {
    create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.background = this.game.add.tileSprite(0, 0, 800, 600, 'background');

        this.player = new Player(this.game, 20, 500);
        //adding random clouds, feel free to refactor :)
        this.cloud = new Cloud(this.game, 600, 50);

        this.game.add.existing(this.player);
        this.game.add.existing(this.cloud);

        this.floor = new Floor(this.game, 0, 550);
        this.game.add.existing(this.floor);

        this.cursors = this.game.input.keyboard.createCursorKeys();

    }

    update() {
        // collision of player with invisible floor
        this.game.physics.arcade.collide(this.player, this.floor);

        this.game.physics.arcade.collide(this.player, this.cloud,
          () => {

            this.game.state.start('gameover');
          },
          (player, cloud) => {
            if (cloud.isRaining) {
              return true;
            }
          return false;
        });

        this.player.move(this.cursors);
         //  Scroll the background
        this.background.tilePosition.x -= 20;
    }
}
