// src/states/gameover.js

import Phaser from 'phaser';

export class GameOver extends Phaser.State{
    create() {
        this.background = this.game.add.tileSprite(0, 0, 800, 600, 'background');

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

        let title = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 75, 'GAME OVER', textStyleTitle);
        title.anchor.set(0.5);

        console.log(this.game.state.states['gameover'].score);

        let instructions = this.game.add.text(this.game.world.centerX, this.game.world.centerY, this.game.state.states['gameover'].score + ' - spacebar to restart -', textStyle);
        instructions.anchor.set(0.5);

        let spacebar = this.game.input.keyboard.addKey([ Phaser.Keyboard.SPACEBAR ]);
        spacebar.onDown.addOnce( () => this.game.state.start('play'));
    }
}
