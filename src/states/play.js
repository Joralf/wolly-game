// src/states/play.js

import Phaser from 'phaser';
import { Player } from '../sprites/player';
import { Cloud } from '../sprites/cloud';
import { Floor } from '../sprites/floor';
import { CloudRain } from '../sprites/cloud-rain';

export class Play extends Phaser.State {
    create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.background = this.game.add.tileSprite(0, 0, 800, 600, 'background');

        this.player = new Player(this.game, 20, 500);
        //adding random clouds, feel free to refactor :)
        this.cloud = new Cloud(this.game, 600, 50);
       // this.cloudRain = new CloudRain(this.game, 400, 200);

        this.game.add.existing(this.player);
        this.game.add.existing(this.cloud);
      //  this.game.add.existing(this.cloudRain);

        this.floor = new Floor(this.game, 0, 550);
        this.game.add.existing(this.floor);

        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.game.input.keyboard.addKeyCapture([ Phaser.KeyCode.SPACEBAR ]);

        //  The scrolling starfield background

        const emitter = this.game.add.emitter(this.game.world.centerX, 0, 400);

        emitter.width = this.cloud.width - 100;
        //emitter.angle = 30; // uncomment to set an angle for the rain.

        emitter.makeParticles('rain');

        emitter.minParticleScale = 0.1;
        emitter.maxParticleScale = 0.5;

        emitter.setYSpeed(300, 500);
        emitter.setXSpeed(-5, 5);

        emitter.minRotation = 0;
        emitter.maxRotation = 0;

        emitter.start(false, 1600, 5, 0);

        this.cloud.addChild(emitter);

        emitter.y = 100;
        emitter.x = 120;

        
    }

    update() {
        // collision of player with invisible floor
        this.game.physics.arcade.collide(this.player, this.floor);

        this.player.move(this.cursors);
         //  Scroll the background
        this.background.tilePosition.x -= 20;
    }
}
