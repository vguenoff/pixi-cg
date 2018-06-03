import * as PIXI from 'pixi.js';

import Card from './Card';
import Deck from './Deck';

const d = new Deck();

const table = {
    width: 800,
    height: 600,
    deck: d.cards,
    deckCoordinates: {
        x: 400,
        y: 100,
    },
};

const game = new PIXI.Application(table.width, table.height, {
    backgroundColor: 0x1099bb,
});

document.body.appendChild(game.view);

const c = new Card(
    game,
    'A♦',
    table.deckCoordinates.x,
    table.deckCoordinates.y
);

game.stage.addChild(c.render());
c.flip(150, 150);
