// src/states/play.js

import Phaser from 'phaser';
import { Player } from '../sprites/player';
import { Cloud } from '../sprites/cloud';
import { Floor } from '../sprites/floor';

const CLOUD_MIN_HEIGHT = 200;
const CLOUD_MAX_HEIGHT = 400;
const CLOUD_MIN_SPEED = 50;
const CLOUD_MAX_SPEED = 150;
const CLOUD_CHANGESTATE_MIN = 30;
const CLOUD_CHANGESTATE_MAX = 90;
const DIFFICULTY_RANGE = 0.25;
const DIFFICULTY_TICK = 250;
let DIFFICULTY = 0;
let SPAWNRATE = 120;

export class Play extends Phaser.State {
    create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // add background
        this.background = this.game.add.tileSprite(0, 0, 800, 600, 'background');

        // add invisible floor so player walks a bit above the edge of the window
        this.floor = new Floor(this.game, 0, 550);
        this.game.add.existing(this.floor);

        // add player
        this.player = new Player(this.game, 20, 450);
        this.game.add.existing(this.player);

        this.clouds = [];
        this.count = 0;


        // assign cursor keys for controls
        this.cursors = this.game.input.keyboard.createCursorKeys();

        // angle of the clouds
        this.angle = 0;

        //GAME BALANCE
        DIFFICULTY = 0;
        SPAWNRATE = 120;

        this.scoreText = this.game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#fff' });


    }

    update() {
        // update the counter, score and angle of clouds
        this.count++;
        this.scoreText.text = 'Score: ' + Math.round(this.count / 10);

        this.angle += .1;

        console.log('CONSTANS ', SPAWNRATE)
        if (SPAWNRATE <= 25) SPAWNRATE = 25;

        // add a cloud with startY, velocityX, changeOnTickValue
        if (this.count % SPAWNRATE === 0) {
          const startY = Math.floor((Math.random() * (CLOUD_MAX_HEIGHT - CLOUD_MIN_HEIGHT)) + CLOUD_MIN_HEIGHT);
          const velocityX = Math.floor((Math.random() * (CLOUD_MAX_SPEED - CLOUD_MIN_SPEED)) + CLOUD_MIN_SPEED) + DIFFICULTY;
          const changeOnTickValue = Math.floor((Math.random() * (CLOUD_CHANGESTATE_MAX - CLOUD_CHANGESTATE_MIN)) + CLOUD_CHANGESTATE_MIN);

          this.clouds.push(new Cloud(this.game, 600, 50, startY, velocityX, changeOnTickValue));
          this.game.add.existing(this.clouds[this.clouds.length - 1]);
        };

        // collision of player with invisible floor
        this.game.physics.arcade.collide(this.player, this.floor);

        // for each cloud currently on the screen
        this.clouds.forEach((cloud, index) => {
          // check collision of player with cloud, only return true when it's raining
          this.game.physics.arcade.collide(this.player, cloud.emitter,
            () => {
              this.game.state.start('gameover');
            }
          );

          // change the angle of the cloud
          cloud.y = cloud.startY + Math.sin(this.angle) * 50;

          // remove clouds if they're outside of the screen
          if (cloud.x < 0) {
            this.clouds[index].destroy();
            this.clouds = this.clouds.filter(item => item !== cloud);
          }

        });

        // move the player
        this.player.move(this.cursors);

        //  Scroll the background
        this.background.tilePosition.x -= 20;

        if (this.count % DIFFICULTY_TICK === 0) {
          DIFFICULTY = Math.floor((this.count / DIFFICULTY_TICK)) * DIFFICULTY_RANGE;
          SPAWNRATE = SPAWNRATE - Math.ceil(DIFFICULTY);
        }
    }
}
