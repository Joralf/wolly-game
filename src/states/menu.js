// src/states/menu.js

import Phaser from 'phaser';

//  The Google WebFont Loader will look for this object, so create it before loading the script.

export class Menu extends Phaser.State {

    preload() {
        const WebFontConfig = {
            //  'active' means all requested fonts have finished loading
            //  We set a 1 second delay before calling 'createText'.
            //  For some reason if we don't the browser cannot render the text the first time it's created.
            active: function() { this.game.time.events.add(Phaser.Timer.SECOND, createText, this); },

            //  The Google Fonts we want to load (specify as many as you like in the array)
            google: {
                families: ['Revalia']
            }

        };
        //  Load the Google WebFont Loader script
        this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

    }
    create() {
        this.background = this.game.add.tileSprite(0, 0, 800, 600, 'background');

        let textStyle = {
            font: 'Revalia',
            fontSize: '65px',
            alight: 'center',
            stroke: '#000000',
            strokeThickness: 1,
            fill: 'white'
        };

        //textStyle.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);

        let title = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 100, 'Wolly', textStyle);
        title.anchor.set(0.5);


        let instructions = this.game.add.text(this.game.world.centerX, this.game.world.centerY, '"s" key to start', textStyle);
        instructions.anchor.set(0.5);

        let controlMessage = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 150, 'use arrow keys to move', textStyle);

        controlMessage.anchor.set(0.5);

        const menuMusic = this.game.add.audio('menu');
        menuMusic.loop = true;
        menuMusic.play();

        let sKey = this.game.input.keyboard.addKey(Phaser.KeyCode.S);
        sKey.onDown.addOnce( () => {
          menuMusic.stop();
          this.game.state.start('play')
        });
    }

    update() {
        //  Scroll the background
        this.background.tilePosition.x -= 20;
    }
}
