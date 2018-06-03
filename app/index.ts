import * as PIXI from 'pixi.js';

import Card from './Card';
import Deck from './Deck';

class Game {
    private game;
    private deck: string[];
    private renderedDeckContainer;
    private deckContainer;
    private dealtCardsContainer;

    constructor(
        private width: number = 800,
        private height: number = 600,
        private deckCoordinates = {
            x: 450,
            y: 150,
        }
    ) {
        this.game = new PIXI.Application(this.width, this.height, {
            backgroundColor: 0x1099bb,
        });
        document.body.appendChild(this.game.view);

        this.addTitle();
        this.deck = new Deck().cards;
        this.drawButton();

        this.renderedDeckContainer = new PIXI.Container();
        this.deckContainer = new PIXI.Container();

        this.game.stage.addChild(
            this.renderedDeckContainer,
            this.deckContainer
        );
    }

    addTitle() {
        const style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 36,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: ['#ffffff', '#00ff99'], // gradient
            stroke: '#4a1850',
            strokeThickness: 5,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
            wordWrap: true,
            wordWrapWidth: 440,
        });

        const richText = new PIXI.Text('Black Jack', style);
        richText.x = 300;
        richText.y = 30;

        this.game.stage.addChild(richText);
    }

    createDeck() {
        this.deck.forEach((value, i) => {
            const card = new Card(
                value,
                this.deckCoordinates.x,
                this.deckCoordinates.y
            );

            const r = card.render();
            this.renderedDeckContainer.addChild(r);
            this.deckContainer.addChild(card);
        });
    }

    drawButton() {
        this.dealtCardsContainer = new PIXI.Container();

        const button = new PIXI.Text('DRAW', {
            fontSize: 18,
        });
        this.game.stage.addChild(button);

        button.x = 630;
        button.y = 75;
        button.interactive = true;
        button.buttonMode = true;

        button.on('pointerdown', () => {
            if (this.dealtCardsContainer.children.length === 4) {
                this.dealtCardsContainer.children = [];
            } else {
                this.renderedDeckContainer.children.pop();
                const card = this.deckContainer.children.pop();

                this.dealtCardsContainer.addChild(
                    card.flip(
                        this.dealtCardsContainer.children.length * 40 - 110,
                        130
                    )
                );

                this.game.stage.addChild(this.dealtCardsContainer);
            }
        });
    }
}

const game = new Game();
game.createDeck();
