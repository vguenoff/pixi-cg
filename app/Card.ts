import { Container, Graphics } from 'pixi.js';

export class Card {
    protected view;

    constructor(public value: string, public flipped: boolean = false) {
        this.view = new Container();

        const graphics = new Graphics();
        graphics.lineStyle(10, 0xffcc00, 0.3);
        graphics.beginFill(0xfffcf2, 1);
        graphics.drawRoundedRect(0, 0, 100, 150, 10);
        graphics.endFill();

        const text = new PIXI.Text(this.value);
        text.x = graphics.width / 2.2;
        text.y = graphics.height / 2.2;
        text.anchor.set(0.5);

        this.view.addChild(graphics, text);
    }

    // flip(): boolean {
    //     return !this.flip;
    // }

    render() {
        return this.view;
    }
}
