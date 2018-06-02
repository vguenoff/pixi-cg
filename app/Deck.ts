import { Container } from 'pixi.js';

import { Card } from './Card';

import { loop, shuffleArray } from './utils';

export default class Deck {
    protected nums: any[] = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
    protected suits: string[] = ['♦', '♣', '♥', '♠'];
    protected view;

    constructor(public x: number = 350, public y: number = 100) {
        this.view = new Container();
        this.view.x = this.x;
        this.view.y = this.y;

        loop(this.nums.length, i => {
            loop(this.suits.length, j => {
                const card = new Card(`${this.nums[i]}${this.suits[j]}`);

                this.view.addChild(card.render());
            });
        });
    }

    shuffle() {
        shuffleArray(this.view.children);
    }

    deal() {
        this.view.children.pop();
    }

    render() {
        return this.view;
    }
}
