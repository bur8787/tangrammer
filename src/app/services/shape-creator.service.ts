import {Injectable} from '@angular/core';
import {Position, ShapeConfig} from '../types/shapeConfig';

@Injectable({
    providedIn: 'root'
})
export class ShapeCreatorService {

    constructor() {
    }

    getShapeConfigs(): ShapeConfig[] {
        const t1 = new ShapeConfig(
            't1',
            new Position(0, 0),
            Array.of<Position>(new Position(50, 50), new Position(0, 100)),
            '#F7BE15'
        );
        const t2 = new ShapeConfig(
            't2',
            new Position(0, 0),
            Array.of<Position>(new Position(100, 0), new Position(50, 50)),
            '#01818A'
        );
        const t3 = new ShapeConfig(
            't3',
            new Position(25, 75),
            Array.of<Position>(new Position(50, 50), new Position(75, 75)),
            '#FF5959'
        );
        const t4 = new ShapeConfig(
            't4',
            new Position(75, 25),
            Array.of<Position>(new Position(100, 50), new Position(100, 0)),
            '#F88056'
        );
        const t5 = new ShapeConfig(
            't5',
            new Position(50, 100),
            Array.of<Position>(new Position(100, 100), new Position(100, 50)),
            '#9EB0B9'
        );
        const s1 = new ShapeConfig(
            's1',
            new Position(0, 100),
            Array.of<Position>(new Position(50, 100), new Position(75, 75), new Position(25, 75)),
            '#235784'
        );
        const s2 = new ShapeConfig(
            's2',
            new Position(50, 50),
            Array.of<Position>(new Position(75, 75), new Position(100, 50), new Position(75, 25)),
            '#364A69'
        );
        return Array.of(t1, t2, t3, t4, t5, s1, s2);
    }
}
