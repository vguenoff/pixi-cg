import { Container, Graphics, DisplayObject, Text } from 'pixi.js';

export default class Card extends DisplayObject {
    private view;

    constructor(
        public value: string,
        public x: number = 0,
        public y: number = 0,
        public width: number = 100,
        public height: number = 150,
        private flipped: boolean = false
    ) {
        super();
        this.view = new Container();
        this.view.value = this.value;
        this.view.x = this.x;
        this.view.y = this.y;
        this.view.scale.x = -1;

        const graphics = new Graphics();
        graphics.lineStyle(5, 0xffcc00, 1);
        graphics.beginFill(0xfffcf2, 1);
        graphics.drawRoundedRect(0, 0, this.width, this.height, 10);
        graphics.endFill();

        this.view.addChild(graphics);
    }

    setCardValue() {
        const fill =
            this.value.indexOf('♦') !== -1 || this.value.indexOf('♥') !== -1
                ? '#ff0000'
                : '#000';

        const cardValue = new Text(this.value, {
            fontSize: 40,
            fill,
        });

        cardValue.x = this.width / 2;
        cardValue.y = this.height / 2;
        cardValue.anchor.set(0.5);

        return cardValue;
    }

    flip(x: number, y: number) {
        const c = this.render();
        const ticker = new PIXI.ticker.Ticker();
        const tick = 0.03;
        const cardValue = this.setCardValue();

        if (c.scale.x < 0) {
            ticker.add(d => {
                c.scale.x += tick;
                c.x += tick * x;
                c.y += tick * y;

                if (c.scale.x > 0) {
                    c.addChild(cardValue);
                }

                if (c.scale.x > 1) {
                    ticker.stop();
                }
            });

            ticker.start();
        }

        return this.view;
    }

    render() {
        return this.view;
    }
}
