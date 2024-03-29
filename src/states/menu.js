// src/states/menu.js

import Phaser from 'phaser';
import { Logo } from '../sprites/logo';

//  The Google WebFont Loader will look for this object, so create it before loading the script.

export class Menu extends Phaser.State {
    create() {
        this.background = this.game.add.tileSprite(0, 0, 800, 600, 'background');

        this.logo = new Logo(this.game, 0, 520);
        this.game.add.existing(this.logo);

        let textStyleTitle = {
            font: 'Arial',
            fontSize: '60px',
            alight: 'center',
            stroke: '#000000',
            strokeThickness: 1,
            fill: 'white'
        };

        let textStyle = {
            font: 'Arial',
            fontSize: '40px',
            alight: 'center',
            stroke: '#000000',
            strokeThickness: 1,
            fill: 'white'
        };


        let title = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 75, 'WOLLY', textStyleTitle);
        title.anchor.set(0.5);


        let instructions = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 20, '- spacebar to start, arrow keys to move -', textStyle);
        instructions.anchor.set(0.5);

        const menuMusic = this.game.add.audio('menu');
        menuMusic.loop = true;
        menuMusic.play();

        let spacebar = this.game.input.keyboard.addKey([ Phaser.Keyboard.SPACEBAR ]);
        spacebar.onDown.addOnce( () => {
          menuMusic.stop();
          this.game.state.start('play')
        });
    }

}
