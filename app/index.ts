import * as PIXI from 'pixi.js';

import Card from './Card';
// import Deck from './Deck';

// import { loop } from './utils';

const app = new PIXI.Application(800, 600, { backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

const c = new Card(app, 'A♦', 100, 100);

app.stage.addChild(c.render());
c.flip();

// const deck = new Deck();
// const table = [];

// deck.shuffle();

// const d = deck.render();
// d.interactive = true;
// d.buttonMode = true;
// d.on('pointerdown', onClick);

// function onClick() {
//     const a = deck.deal();
//     app.stage.addChild(a);
// }

// app.stage.addChild(d);
