import * as PIXI from 'pixi.js';

import Card from './Card';
import Deck from './Deck';

class Game {
    private game;
    private deck: string[];
    private dealtCardsContainer;

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
        this.dealtCardsContainer = new PIXI.Container();

        this.deck.forEach(value => {
            const card = new Card(
                value,
                this.deckCoordinates.x,
                this.deckCoordinates.y
            );

            card.render().interactive = true;
            card.render().buttonMode = true;
            card.render().on('pointerdown', () => {
                if (this.dealtCardsContainer.children.length === 4) {
                    this.dealtCardsContainer.children = [];
                } else {
                    this.dealtCardsContainer.addChild(
                        card.flip(
                            this.dealtCardsContainer.children.length * 40 - 110,
                            150
                        )
                    );
                }
            });

            this.game.stage.addChild(card.render());
        });

        this.game.stage.addChild(this.dealtCardsContainer);
    }
}

const game = new Game();
game.createDeck();
