// src/states/load.js

import Phaser from 'phaser';

export class Load extends Phaser.State {
    preload() {
       let textStyle = {font: '45px Arial', alight: 'center', stroke: 'blue', fill: 'blue'};

       this.game.add.text(80, 150, 'loading...', textStyle);
       this.game.load.spritesheet('wizard', '../assets/wizardsprite.png', 95, 123, 6);
       this.game.load.spritesheet('player', '../assets/wol_logo.jpg', 51, 51);         
       this.game.load.image('background', '../assets/gamebg.jpg');
       this.game.load.spritesheet('player', '../assets/player.jpg', 51, 51);
       this.game.load.spritesheet('cloud', '../assets/cloud-1.png', 283, 142);         
    }

    create() {
        this.game.state.start('menu');
    }
}
