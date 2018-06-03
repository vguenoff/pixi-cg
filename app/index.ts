import * as PIXI from 'pixi.js';

import Card from './Card';
import Deck from './Deck';

class Game {
    private game;
    private deck: string[];

    constructor(
        private width: number = 800,
        private height: number = 600,
        private deckCoordinates = {
            x: 450,
            y: 100,
        }
    ) {
        this.game = new PIXI.Application(this.width, this.height, {
            backgroundColor: 0x1099bb,
        });
        document.body.appendChild(this.game.view);

        this.deck = new Deck().cards;
    }

    createDeck() {
        this.deck.forEach((value, i) => {
            const card = new Card(
                value,
                this.deckCoordinates.x,
                this.deckCoordinates.y
            );

            const cc = card.render();
            cc.interactive = true;
            cc.buttonMode = true;
            cc.on('pointerdown', () => card.flip(-100, 150));

            this.game.stage.addChild(cc);
        });
    }
}

const game = new Game();
game.createDeck();
