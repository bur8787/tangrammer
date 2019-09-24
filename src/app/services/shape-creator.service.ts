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
            new Position(25, 50),
            Array.of<Position>(new Position(0, 0), new Position(50, 50), new Position(0, 100)),
            '#008DD2',
        );
        const t2 = new ShapeConfig(
            't2',
            75,
            75,
            100,
            50,
            new Position(0, 0),
            new Position(50, 25),
            Array.of<Position>(new Position(100, 0), new Position(50, 50)),
            '#00b2a9'
        );
        const t3 = new ShapeConfig(
            't3',
            100,
            125,
            50,
            25,
            new Position(0, 25),
            new Position(50, 62.5),
            Array.of<Position>(new Position(50, 0), new Position(25, -25)),
            '#F18142'
        );
        const t4 = new ShapeConfig(
            't4',
            150,
            75,
            25,
            50,
            new Position(0, 25),
            new Position(87.5, 25),
            Array.of<Position>(new Position(25, 25), new Position(25, -25)),
            '#7477c9'
        );
        const t5 = new ShapeConfig(
            't5',
            125,
            125,
            50,
            50,
            new Position(0, 50),
            new Position(87.5, 87.5),
            Array.of<Position>(new Position(50, 0), new Position(50, -50)),
            '#F08366'
        );
        const s1 = new ShapeConfig(
            's1',
            75,
            150,
            75,
            25,
            new Position(0, 25),
            new Position(37.5, 87.5),
            Array.of<Position>(new Position(50, 0), new Position(75, -25), new Position(25, -25)),
            '#F7A947'
        );
        const s2 = new ShapeConfig(
            's2',
            125,
            100,
            50,
            50,
            new Position(0, 25),
            new Position(75, 50),
            Array.of<Position>(new Position(25, 25), new Position(50, 0), new Position(25, -25)),
            '#7787A1'
        );
        return Array.of(t1, t2, s1, t3, s2, t4, t5);
    }
}
