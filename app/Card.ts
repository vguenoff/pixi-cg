import { Container, Graphics } from 'pixi.js';

export class Card {
    protected view;

    constructor(
        public value: string,
        public x: number = 0,
        public y: number = 0,
        public flipped: boolean = false
    ) {
        this.view = new Container();
        this.view.value = this.value;
        this.view.x = this.x;
        this.view.y = this.y;

        const graphics = new Graphics();
        graphics.lineStyle(10, 0xffcc00, 0.3);
        graphics.beginFill(0xfffcf2, 1);
        graphics.drawRoundedRect(0, 0, 100, 150, 10);
        graphics.endFill();

        this.view.addChild(graphics);

        if (this.flipped) {
            const text = new PIXI.Text(this.value);
            text.x = graphics.width / 2.2;
            text.y = graphics.height / 2.2;
            text.anchor.set(0.5);
            this.view.addChild(text);
        }

        return this.view;
    }
}
