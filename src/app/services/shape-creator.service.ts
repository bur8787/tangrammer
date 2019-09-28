import {Injectable} from '@angular/core';
import {Position, ShapeConfig} from '../types/shapeConfig';

@Injectable({
    providedIn: 'root'
})
export class ShapeCreatorService {

    constructor() {
    }

    getDefaultShapeConfigs(): ShapeConfig[] {
        const t1 = new ShapeConfig(
            't1',
            75,
            75,
            50,
            100,
            new Position(0, 0),
            Array.of<Position>(new Position(50, 50), new Position(0, 100)),
            '#FF6363',
        );
        const t2 = new ShapeConfig(
            't2',
            75,
            75,
            100,
            50,
            new Position(0, 0),
            Array.of<Position>(new Position(100, 0), new Position(50, 50)),
            '#04A7AB'
        );
        const t3 = new ShapeConfig(
            't3',
            100,
            125,
            50,
            25,
            new Position(0, 25),
            Array.of<Position>(new Position(50, 0), new Position(25, -25)),
            '#FAAC0E'
        );
        const t4 = new ShapeConfig(
            't4',
            150,
            75,
            25,
            50,
            new Position(0, 25),
            Array.of<Position>(new Position(25, 25), new Position(25, -25)),
            '#59697A'
        );
        const t5 = new ShapeConfig(
            't5',
            125,
            125,
            50,
            50,
            new Position(0, 50),
            Array.of<Position>(new Position(50, 0), new Position(50, -50)),
            '#7298C8'
        );
        const s1 = new ShapeConfig(
            's1',
            75,
            150,
            75,
            25,
            new Position(0, 25),
            Array.of<Position>(new Position(50, 0), new Position(75, -25), new Position(25, -25)),
            '#796866'
        );
        const s2 = new ShapeConfig(
            's2',
            125,
            100,
            50,
            50,
            new Position(0, 25),
            Array.of<Position>(new Position(25, 25), new Position(50, 0), new Position(25, -25)),
            '#E0C240'
        );
        return Array.of(t1, t2, s1, t3, s2, t4, t5);
    }
}
