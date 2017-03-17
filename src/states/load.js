// src/states/load.js

import Phaser from 'phaser';

export class Load extends Phaser.State {
    preload() {
       let textStyle = {font: '45px Arial', alight: 'center', stroke: 'blue', fill: 'blue'};

       this.game.add.text(80, 150, 'loading...', textStyle);


       this.game.load.spritesheet('player', '../assets/player.jpg', 51, 51);
       this.game.load.image('background', '../assets/bg.png');
       this.game.load.spritesheet('player', '../assets/player.jpg', 51, 51);
       this.game.load.spritesheet('cloudsprite', '../assets/cloudspriteparticle.png', 80, 600, 2);

    }

    create() {
        this.game.state.start('menu');
    }
}
