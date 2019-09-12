export class ShapeConfig {
    name: string;
    position: Position;
    lineTo: Position[];
    color: string;

    constructor(name: string, position: Position, lineTo: Position[], color: string) {
        this.name = name;
        this.position = position;
        this.lineTo = lineTo;
        this.color = color;
    }
}

export class Position {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
