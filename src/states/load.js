// src/states/load.js

import Phaser from 'phaser';

export class Load extends Phaser.State {
    preload() {
       let textStyle = {font: '45px Arial', alight: 'center', stroke: 'blue', fill: 'blue'};

       this.game.add.text(80, 150, 'loading...', textStyle);


       this.game.load.spritesheet('player', '../assets/player.jpg', 51, 51);
       this.game.load.image('background', '../assets/bg.png');
       this.game.load.spritesheet('player', '../assets/player.jpg', 51, 51);
       this.game.load.spritesheet('cloud', '../assets/cloud.png', 283, 142);
       this.game.load.spritesheet('cloud-rain', '../assets/cloud-rain.png', 283, 500);
       this.game.load.spritesheet('rain', '../assets/drip_4_2x.png', 17, 17);


    }

    create() {
        this.game.state.start('menu');
    }
}
