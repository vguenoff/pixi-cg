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
        graphics.lineStyle(10, 0xffcc00, 0.3);
        graphics.beginFill(0xfffcf2, 1);
        graphics.drawRoundedRect(0, 0, this.width, this.height, 10);
        graphics.endFill();

        this.view.addChild(graphics);
    }

    render() {
        return this.view;
    }

    flip(x: number, y: number) {
        const c = this.render();

        const text = new Text(this.value);
        const tick = 0.03;
        const ticker = new PIXI.ticker.Ticker();

        text.x = this.width / 2.2;
        text.y = this.height / 2.2;
        text.anchor.set(0.5);

        if (c.scale.x < 0) {
            ticker.add(d => {
                c.scale.x += tick;
                c.x += tick * x;
                c.y += tick * y;

                if (c.scale.x > 0) {
                    c.addChild(text);
                }

                if (c.scale.x > 1) {
                    ticker.stop();
                }
            });
            ticker.start();
        }
    }
}
