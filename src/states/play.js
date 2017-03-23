// src/states/play.js

import Phaser from 'phaser';
import { Player } from '../sprites/player';
import { Cloud } from '../sprites/cloud';
import { Floor } from '../sprites/floor';
import { Fence } from '../sprites/fence';

// Cloud constants
const CLOUD_MIN_HEIGHT = 200;
const CLOUD_MAX_HEIGHT = 350;
const CLOUD_MIN_SPEED = 50;
const CLOUD_MAX_SPEED = 100;
const CLOUD_CHANGESTATE_MIN = 100;
const CLOUD_CHANGESTATE_MAX = 100;
const CLOUD_RAIN_LENGTH_MIN = 300
const CLOUD_RAIN_LENGTH_MAX = 500;

// Difficulty Settings
const DIFFICULTY_RANGE = 3;
const DIFFICULTY_TICK = 240;
let SPAWNRATE;
let DIFFICULTY;

export class Play extends Phaser.State {
    create() {
        SPAWNRATE = 240;

        // assign class variables
        this.clouds = []; // array of clouds
        this.angle = 0; // angle counter for cloud spawning
        this.fences = []; // array of fences
        this.count = 0; // tick counter

        // assign cursor and SPACEBAR for controls
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        // start physics system
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // add background
        this.background = this.game.add.tileSprite(0, 0, 800, 600, 'background');

        // score text
        this.scoreText = this.game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#fff' });

        // add invisible floor so player walks a bit above the edge of the window
        this.floor = new Floor(this.game, 0, 520);
        this.game.add.existing(this.floor);

        // add player
        this.player = new Player(this.game, 20, 480);
        this.game.add.existing(this.player);
        this.spacebar.onDown.add(this.player.jump, this.player);
    }

    update() {
        // update the counter, score and angle of clouds
        this.count++;
        this.scoreText.text = 'Score: ' + Math.round(this.count / 10);
        this.angle += .1;

        // collision of player with invisible floor
        this.game.physics.arcade.collide(this.player, this.floor);

        // move the player
        this.player.move(this.cursors);

        //  Scroll the background
        this.background.tilePosition.x -= 5;

        // add a cloud with startY, velocityX, changeOnTickValue when this.count is divisible by SPAWNRATE
        if (this.count % SPAWNRATE === 0) {
          const startY = Math.floor((Math.random() * (CLOUD_MAX_HEIGHT - CLOUD_MIN_HEIGHT)) + CLOUD_MIN_HEIGHT);
          const velocityX = Math.floor((Math.random() * (CLOUD_MAX_SPEED - CLOUD_MIN_SPEED)) + CLOUD_MIN_SPEED);
          const changeOnTickValue = Math.floor((Math.random() * (CLOUD_CHANGESTATE_MAX - CLOUD_CHANGESTATE_MIN)) + CLOUD_CHANGESTATE_MIN);
          const rainHeight = Math.floor((Math.random() * (CLOUD_RAIN_LENGTH_MAX - CLOUD_RAIN_LENGTH_MIN)) + CLOUD_RAIN_LENGTH_MIN);

          this.clouds.push(new Cloud(this.game, 600, startY, velocityX, changeOnTickValue, rainHeight));
          this.game.add.existing(this.clouds[this.clouds.length - 1]);
        };

        // checks for each cloud currently on the screen
        this.clouds.forEach((cloud, index) => {
          // check collision of player with cloud, only return true when it's raining
          this.game.physics.arcade.collide(this.player, cloud.emitter,
            () => {
              this.game.state.states['gameover'].score = this.scoreText.text;
              this.game.state.start('gameover');
            }
          );

          // change the angle of the cloud
          cloud.y = cloud.startY + Math.sin(this.angle) * 40;

          // remove clouds if they're outside of the screen
          if (cloud.x < 0) {
            this.clouds[index].destroy();
            this.clouds = this.clouds.filter(item => item !== cloud);
          }
        });

        // adding fence when this.count is divisible by 420
        if (this.count % 420 === 0) {
          this.fences.push(new Fence(this.game, 800, 485));
          this.game.add.existing(this.fences[this.fences.length - 1]);
        };

        // checks for each fence currently on the screen
        this.fences.forEach((fence, index) => {
          this.game.physics.arcade.collide(this.player, fence,
            () => {
              this.game.state.states['gameover'].score = this.scoreText.text;
              this.game.state.start('gameover');
            }
          );

          if (fence.x < 0) {
            this.fences[index].destroy();
            this.fences = this.fences.filter(item => item !== fence);
          }
        });

        // update difficulty
        if (this.count % DIFFICULTY_TICK === 0 && SPAWNRATE > 80) {
            DIFFICULTY = Math.floor((this.count / DIFFICULTY_TICK)) * DIFFICULTY_RANGE;
            console.log("difficulty", DIFFICULTY);
            SPAWNRATE = SPAWNRATE - Math.ceil(DIFFICULTY);
            console.log("spawnrate", SPAWNRATE);
        }
    }
}
