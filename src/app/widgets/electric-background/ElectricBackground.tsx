import * as React from 'react';

interface IProps {
    width: number;
    height: number;
}

interface IState {}

export class ElectricBackground extends React.Component<IProps, IState> {

    canvas;

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.width !== this.props.width || nextProps.height !== this.props.height) {
            this.canvas.width = nextProps.width;
            this.canvas.height = nextProps.height;
        }
    }

    componentDidMount() {
        // setup
        this.canvas = (document.getElementById("electricBackground") as HTMLCanvasElement);
        this.canvas.width = this.props.width;
        this.canvas.height = this.props.height;
        const context = this.canvas.getContext('2d');
        context.translate(0.5, 0.5);

        const center = {x: 0 , y: 0 };
        const size = 12;
        const colBg = 'rgba(240,240,240)';
        const colGrid = 'rgba(0,20,40,0.9)';
        const colSnake = 'rgba(0,255,255,0.1)';
        const colSnake2 = 'rgba(0,100,100,0.1)';
        const amountOfSnakes = 20;

        /* /////
        GRID
        ///// */

        const bgcanv = document.createElement("canvas");
        bgcanv.width = window.innerWidth;
        bgcanv.height = window.innerHeight;
        const bgcont = bgcanv.getContext('2d');
        bgcont.translate(0.5, 0.5);
        bgcont.fillStyle = colBg;
        bgcont.fillRect(0, 0, bgcanv.width, bgcanv.height);

        const nx = Math.ceil(bgcanv.height / size);
        const ny = Math.ceil(bgcanv.width / size);
        bgcont.strokeStyle = colGrid;

        function line(x1, y1, x2, y2) {
            bgcont.beginPath();
            bgcont.moveTo(x1, y1);
            bgcont.lineTo(x2, y2);
            bgcont.closePath();
            bgcont.stroke();
        }

        for (let q = 1; q <= ny; q++) {
            line(q * size, 0, q * size, bgcanv.height);
        }
        for (let i = 0; i <= nx; i++) {
            line(0, i * size, bgcanv.width, i * size);
        }
        for (let i = 0; i <= (nx + ny); i++) {
            line(0, (i * size) - bgcanv.width, bgcanv.width, i * size);
            line(0, (i * size), bgcanv.width, (i * size) - bgcanv.width);
        }

        /* /////
        SNAKE
        ///// */

        const dirs = [
            {name: 'up'        , x: 0, y: -1},
            {name: 'upright'   , x: 1, y: -1},
            {name: 'right'     , x: 1, y: 0},
            {name: 'downright' , x: 1, y: 1},
            {name: 'down'      , x: 0, y: 1},
            {name: 'downleft'  , x: -1, y: 1},
            {name: 'left'      , x: -1, y: 0},
            {name: 'upleft'    , x: -1, y: -1}
        ];

// init
        function snake() {
            this.points = [{
                y: Math.floor((Math.random() * nx) + 1) * size,
                x: Math.floor((Math.random() * ny) + 1) * size
            }];
            this.draw = snakeDraw;
            this.move = snakeMove;
            this.dir = (Math.floor((Math.random() * 8) + 1));
        }

        const width = this.props.width;
        const height = this.props.height;

// movement
        function snakeMove() {
            const rand = (Math.floor((Math.random() * 3) - 1));
            let dir = this.dir + rand;
            if (dir < 0) { dir = 7; }
            if (7 < dir) { dir = 0; }
            const lpoint = this.points[this.points.length - 1];
            if (lpoint.x < 10) { dir = 2; }
            if (lpoint.y < 10) { dir = 4; }
            if (width  - 10 < lpoint.x) { dir = 6; }
            if (height - 10 < lpoint.y) { dir = 0; }
            this.dir = dir;
            const npoint = {x: lpoint.x + (dirs[dir].x * size), y: lpoint.y + (dirs[dir].y * size)};
            this.points.push(npoint);
            if (10 < this.points.length) {
                this.points.shift();
            }
        }

// draw
        function snakeDraw() {
            const p = this.points;
            for (let m = 1 ; m < p.length; m++) {
                context.beginPath();
                context.moveTo(p[m - 1].x, p[m - 1].y);
                context.lineTo(p[m].x, p[m].y);
                context.closePath();
                context.lineWidth = 1;
                context.strokeStyle = colSnake;
                context.stroke();
                context.lineWidth = 10;
                context.strokeStyle = colSnake2;
                context.stroke();
            }
        }

// group of snakes
        function snakes(n) {
            this.snakeys = [];
            for (let p = 0; p < n; p++) {
                this.snakeys.push(new snake());
            }
            this.go = snakesGo;
        }

        function snakesGo() {
            this.snakeys.forEach((key) => {
                key.move();
                key.draw();
            });
        }

        /* /////
        FRAME
        ///// */

        const sn = new snakes(amountOfSnakes);
        context.drawImage(bgcanv, 0, 0);
        setInterval(() => {
            context.globalAlpha = 0.2;
            context.drawImage(bgcanv, 0, 0);
            context.globalAlpha = 1;
            sn.go();
        }, 1000 / 30);
    }

    render(): JSX.Element {
        return (
            <canvas id="electricBackground"/>
        );
    }
}
