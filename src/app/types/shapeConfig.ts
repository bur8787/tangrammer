export class ShapeConfig {
    name: string;
    x: number;
    y: number;
    width: number;
    height: number;
    offset: Position;
    relativeLineTo: Position[];
    color: string;

    constructor(
        name: string,
        x: number,
        y: number,
        width: number,
        height: number,
        offset: Position,
        relativeLineTo: Position[],
        color: string,
    ) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.offset = offset;
        this.relativeLineTo = relativeLineTo;
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
