import { Container } from 'pixi.js';

import { Card } from './Card';

import { loop, shuffleArray } from './utils';

export default class Deck {
    protected nums: any[] = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
    protected suits: string[] = ['♦', '♣', '♥', '♠'];
    protected view;
    protected dealt;
    protected dealtList = [];

    constructor(public x: number = 350, public y: number = 100) {
        this.view = new Container();
        this.view.x = this.x;
        this.view.y = this.y;

        loop(this.nums.length, i => {
            loop(this.suits.length, j => {
                const card = new Card(`${this.nums[i]}${this.suits[j]}`);

                this.view.addChild(card);
            });
        });
    }

    shuffle() {
        shuffleArray(this.view.children);
    }

    deal() {
        const card = this.view.children.pop();
        this.dealt = new Container();

        this.dealtList.push(new Card(card.value, (this.x += 70), 400, true));

        if (this.dealtList.length > 4) {
            this.dealtList = [];
            this.x = 0;
        }

        this.dealtList.forEach(d => this.dealt.addChild(d));

        return this.dealt;
    }

    render() {
        return this.view;
    }
}
