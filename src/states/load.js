// src/states/load.js

import Phaser from 'phaser';

export class Load extends Phaser.State {
    preload() {
       let textStyle = {font: '45px Arial', alight: 'center', stroke: 'blue', fill: 'blue'};

       this.game.add.text(80, 150, 'loading...', textStyle);

       this.game.load.spritesheet('player', '../assets/wolly.png', 80, 64, 4);
       this.game.load.image('background', '../assets/bg.png');
       this.game.load.spritesheet('rain', '../assets/drip_4_2x.png', 17, 17);
       this.game.load.spritesheet('wolly-front', '../assets/wolly-front.png', 192, 188);

       this.game.load.spritesheet('cloudsprite', '../assets/cloudspriteparticle.png', 80, 600, 2);
       this.game.load.spritesheet('fence', '../assets/fence.png', 34, 66);

       this.game.load.audio('menu', '../assets/menu.mp3');

    }

    create() {
        this.game.state.start('menu');
    }
}
