import { Container, Graphics, DisplayObject } from 'pixi.js';

export default class Card extends DisplayObject {
    protected view;

    constructor(
        public app,
        public value: string,
        public x: number = 0,
        public y: number = 0,
        public width: number = 100,
        public height: number = 150,
        protected flipped: boolean = false
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

    flip() {
        const c = this.render();
        c.pivot.x = -c.width / 2;

        // add the text
        const text = new PIXI.Text(this.value);
        text.x = this.width / 2.2;
        text.y = this.height / 2.2;
        text.anchor.set(0.5);

        if (c.scale.x < 0) {
            this.app.ticker.add(d => {
                c.scale.x += 0.01 * d;

                if (c.scale.x > 0) {
                    c.addChild(text);
                }

                if (c.scale.x > 1) {
                    this.app.ticker.stop();
                }
            });
        }
    }
}
