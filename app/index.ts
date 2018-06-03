import * as PIXI from 'pixi.js';
import { Container, Graphics, DisplayObject, Text } from 'pixi.js';

import Card from './Card';
import Deck from './Deck';

class Game {
    private game;
    private deck: string[];
    private renderedDeckContainer;
    private deckContainer;
    private dealtCardsContainer;
    public drawButtonActive: boolean;

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
        this.deck = new Deck().cards;
        this.renderedDeckContainer = new PIXI.Container();
        this.deckContainer = new PIXI.Container();
        this.dealtCardsContainer = new PIXI.Container();
        this.drawButtonActive = false;

        this.game.stage.addChild(
            this.renderedDeckContainer,
            this.deckContainer
        );

        this.addTitle();

        document.body.appendChild(this.game.view);
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

        const gameTitle = new PIXI.Text('Black Jack', style);
        gameTitle.x = 300;
        gameTitle.y = 30;

        this.game.stage.addChild(gameTitle);
    }

    createDeck() {
        this.deck.forEach((value, i) => {
            const card = new Card(
                value,
                this.deckCoordinates.x,
                this.deckCoordinates.y
            );

            this.renderedDeckContainer.addChild(card.render());
            this.deckContainer.addChild(card);
        });

        this.drawButton();
    }

    deal = () => {
        if (this.dealtCardsContainer.children.length === 4) {
            this.dealtCardsContainer.children = [];
        }

        this.renderedDeckContainer.children.pop();
        const card = this.deckContainer.children.pop();

        this.dealtCardsContainer.addChild(
            card.flip(this.dealtCardsContainer.children.length * 40 - 110, 130)
        );

        this.game.stage.addChild(this.dealtCardsContainer);

        if (this.deckContainer.children.length === 0) {
            this.drawButtonActive = false;
            game.drawButton();
            this.playAgain();
        }
    };

    drawButton() {
        // sorry - no time for proper button class
        const btn = new Container();

        btn.x = 369;
        btn.y = 95;
        btn.interactive = true;
        btn.buttonMode = true;

        const graphics = new Graphics();
        graphics.lineStyle(1, 0xffcc00, 1);
        graphics.beginFill(0xffeb3b, 1);
        graphics.drawRoundedRect(0, 0, 65, 25, 1);
        graphics.endFill();

        btn.addChild(graphics);

        const fill = this.drawButtonActive ? '#000' : '#00ff99';
        const text = new PIXI.Text('DRAW', {
            fontSize: 18,
            fill,
        });
        text.x = 5;
        text.y = 4;
        btn.addChild(text);

        this.game.stage.addChild(btn);

        this.drawButtonActive && btn.on('pointerdown', this.deal);
    }

    playAgain() {
        const playAgainButton = new PIXI.Text('PLAY NEW GAME', {
            fontSize: 18,
        });

        playAgainButton.x = 322;
        playAgainButton.y = 215;
        playAgainButton.interactive = true;
        playAgainButton.buttonMode = true;

        playAgainButton.on('pointerdown', () => {
            this.drawButtonActive = true;
            this.deck = new Deck().cards;
            game.drawButton();
            game.createDeck();
            this.dealtCardsContainer.children = [];
            playAgainButton.visible = false;
        });

        this.game.stage.addChild(playAgainButton);
    }
}

const game = new Game();
game.createDeck();
game.deal();

setTimeout(() => {
    game.deal();
}, 1000);

setTimeout(() => {
    game.drawButtonActive = true;
    game.drawButton();
}, 2000);
