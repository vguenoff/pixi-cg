import { Container } from 'pixi.js';

import { loop, shuffleArray } from './utils';

export default class Deck {
    public cards: string[] = [];
    private nums: any[] = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
    private suits: string[] = ['♦', '♣', '♥', '♠'];

    constructor() {
        loop(this.nums.length, i => {
            loop(this.suits.length, j => {
                this.cards.push(`${this.nums[i]}${this.suits[j]}`);
            });
        });

        shuffleArray(this.cards);
    }
}
