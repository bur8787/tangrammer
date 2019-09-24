export class JudgeResult {
    expect: ShapePositions;
    actual: ShapePositions;
    border = 15;

    constructor(e: ShapePositions, a: ShapePositions) {
        this.expect = e;
        this.actual = a;
    }

    isOK(): boolean {
        if (this.expect == null || this.actual == null) {
            return false;
        }

        if (!this.sameRotationT1()) {
            console.log('t1: rotation');
            return false;
        }
        if (!this.sameRotationT2()) {
            console.log('t2: rotation');
            return false;
        }
        if (!this.sameRotationT3()) {
            console.log('t3: rotation');
            return false;
        }
        if (!this.sameRotationT4()) {
            console.log('t4: rotation');
            return false;
        }
        if (!this.sameRotationT5()) {
            console.log('t5: rotation');
            return false;
        }
        if (!this.sameRotationS1()) {
            console.log('s1: rotation');
            return false;
        }
        if (!this.sameRotationS2()) {
            console.log('s2: rotation');
            return false;
        }

        if (this.distanceT1() > this.border) {
            console.log('t1');
            console.log(this.distanceT1());
            return false;
        }
        if (this.distanceT2() > this.border) {
            console.log('t2');
            console.log(this.distanceT2());
            return false;
        }
        if (this.distanceT3() > this.border) {
            console.log('t3');
            console.log(this.distanceT3());
            return false;
        }
        if (this.distanceT4() > this.border) {
            console.log('t4');
            console.log(this.distanceT4());
            return false;
        }
        if (this.distanceT5() > this.border) {
            console.log('t5');
            console.log(this.distanceT5());
            return false;
        }
        if (this.distanceS1() > this.border) {
            console.log('s1');
            console.log(this.distanceS1());
            return false;
        }
        if (this.distanceS2() > this.border) {
            console.log('s2');
            console.log(this.distanceS2());
            return false;
        }
        return true;
    }

    sameRotationT1(): boolean {
        return this.expect.t1.rotation === this.actual.t1.rotation;
    }

    sameRotationT2(): boolean {
        return this.expect.t2.rotation === this.actual.t2.rotation;
    }

    sameRotationT3(): boolean {
        return this.expect.t3.rotation === this.actual.t3.rotation;
    }

    sameRotationT4(): boolean {
        return this.expect.t4.rotation === this.actual.t4.rotation;
    }

    sameRotationT5(): boolean {
        return this.expect.t5.rotation === this.actual.t5.rotation;
    }

    sameRotationS1(): boolean {
        return this.expect.s1.rotation === this.actual.s1.rotation;
    }

    sameRotationS2(): boolean {
        return this.expect.s2.rotation === this.actual.s2.rotation;
    }

    distanceT1(): number {
        return Math.sqrt(
            (this.expect.t1.x - this.actual.t1.x) ** 2 + (this.expect.t1.y - this.actual.t1.y) ** 2
        );
    }

    distanceT2(): number {
        return Math.sqrt(
            (this.expect.t2.x - this.actual.t2.x) ** 2 + (this.expect.t2.y - this.actual.t2.y) ** 2
        );
    }

    distanceT3(): number {
        return Math.sqrt(
            (this.expect.t3.x - this.actual.t3.x) ** 2 + (this.expect.t3.y - this.actual.t3.y) ** 2
        );
    }

    distanceT4(): number {
        return Math.sqrt(
            (this.expect.t4.x - this.actual.t4.x) ** 2 + (this.expect.t4.y - this.actual.t4.y) ** 2
        );
    }

    distanceT5(): number {
        return Math.sqrt(
            (this.expect.t5.x - this.actual.t5.x) ** 2 + (this.expect.t5.y - this.actual.t5.y) ** 2
        );
    }

    distanceS1(): number {
        return Math.sqrt(
            (this.expect.s1.x - this.actual.s1.x) ** 2 + (this.expect.s1.y - this.actual.s1.y) ** 2
        );
    }

    distanceS2(): number {
        return Math.sqrt(
            (this.expect.s2.x - this.actual.s2.x) ** 2 + (this.expect.s2.y - this.actual.s2.y) ** 2
        );
    }
}

export class ShapePositions {
    t1: ShapePosition;
    t2: ShapePosition;
    t3: ShapePosition;
    t4: ShapePosition;
    t5: ShapePosition;
    s1: ShapePosition;
    s2: ShapePosition;

    constructor(
        t1: ShapePosition,
        t2: ShapePosition,
        t3: ShapePosition,
        t4: ShapePosition,
        t5: ShapePosition,
        s1: ShapePosition,
        s2: ShapePosition,
    ) {
        this.t1 = t1;
        this.t2 = t2;
        this.t3 = t3;
        this.t4 = t4;
        this.t5 = t5;
        this.s1 = s1;
        this.s2 = s2;
    }
}

export class ShapePosition {
    x: number;
    y: number;
    rotation: number;

    constructor(x: number, y: number, rotation: number) {
        this.x = x;
        this.y = y;
        this.rotation = rotation;
    }
}
