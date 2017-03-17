// src/states/play.js

import Phaser from 'phaser';
import { Player } from '../sprites/player';
import { Cloud } from '../sprites/cloud';
import { Floor } from '../sprites/floor';
import { Fence } from '../sprites/fence';

const CLOUD_MIN_HEIGHT = 100;
const CLOUD_MAX_HEIGHT = 300;
const CLOUD_MIN_SPEED = 50;
const CLOUD_MAX_SPEED = 150;
const CLOUD_CHANGESTATE_MIN = 60;
const CLOUD_CHANGESTATE_MAX = 120;
const DIFFICULTY_RANGE = 0.25;
const DIFFICULTY_TICK = 250;
let DIFFICULTY;
let SPAWNRATE;

export class Play extends Phaser.State {
    create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // add background
        this.background = this.game.add.tileSprite(0, 0, 800, 600, 'background');

        // add invisible floor so player walks a bit above the edge of the window
        this.floor = new Floor(this.game, 0, 520);
        this.game.add.existing(this.floor);

        // add player
        this.player = new Player(this.game, 20, 480);
        this.game.add.existing(this.player);

        this.clouds = [];
        this.count = 0;

        this.fences = [];

        // assign cursor keys for controls
        this.cursors = this.game.input.keyboard.createCursorKeys();

        // angle of the clouds
        this.angle = 0;

        //GAME BALANCE
        DIFFICULTY = 20;
        SPAWNRATE = 180;

        // score text
        this.scoreText = this.game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#fff' });

        // assign spacebar to jump method of player
        this.spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.spacebar.onDown.add(this.player.jump, this.player);
    }

    update() {
        // update the counter, score and angle of clouds
        this.count++;
        this.scoreText.text = 'Score: ' + Math.round(this.count / 10);

        this.angle += .1;

        // add a cloud with startY, velocityX, changeOnTickValue
        if (this.count % SPAWNRATE === 0) {
          const startY = Math.floor((Math.random() * (CLOUD_MAX_HEIGHT - CLOUD_MIN_HEIGHT)) + CLOUD_MIN_HEIGHT);
          const velocityX = Math.floor((Math.random() * (CLOUD_MAX_SPEED - CLOUD_MIN_SPEED)) + CLOUD_MIN_SPEED);
          const changeOnTickValue = Math.floor((Math.random() * (CLOUD_CHANGESTATE_MAX - CLOUD_CHANGESTATE_MIN)) + CLOUD_CHANGESTATE_MIN);

          this.clouds.push(new Cloud(this.game, 600, 50, startY, velocityX, changeOnTickValue));
          this.game.add.existing(this.clouds[this.clouds.length - 1]);
        };

        //adding fences
        if (this.count % 420 === 0) {
          this.fences.push(new Fence(this.game, 0, 480));
          this.game.add.existing(this.fences[this.fences.length - 1]);
        };

        // collision of player with invisible floor
        this.game.physics.arcade.collide(this.player, this.floor);

        // for each cloud currently on the screen
        this.clouds.forEach((cloud, index) => {
          // check collision of player with cloud, only return true when it's raining
          this.game.physics.arcade.collide(this.player, cloud.emitter,
            () => {
              this.game.state.states['gameover'].score = this.scoreText.text;
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

        this.fences.forEach((fence, index) => {
          this.game.physics.arcade.collide(this.player, fence,
            () => {
              this.game.state.start('gameover');
            }
          );

          if (fence.x < 0) {
            this.fences[index].destroy();
            this.fences = this.fences.filter(item => item !== fence);
          }
        })

        // change the angle of the cloud
      //  this.fence.y = Math.sin(this.angle) * 50;

        // move the player
        this.player.move(this.cursors);

        //  Scroll the background
        this.background.tilePosition.x -= 5;

        if (this.count % DIFFICULTY_TICK === 0) {
          DIFFICULTY = Math.floor((this.count / DIFFICULTY_TICK)) * DIFFICULTY_RANGE;
          SPAWNRATE = SPAWNRATE - Math.ceil(DIFFICULTY);
        }
    }
}
