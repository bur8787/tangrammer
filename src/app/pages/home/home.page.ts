import {Component, OnInit, ViewChild} from '@angular/core';
import {JudgeResult} from '../../types/judge-result';
import {CanvasComponent} from '../../components/canvas/canvas.component';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    @ViewChild('expectedCanvas', {static: false}) expectedCanvas: CanvasComponent;
    @ViewChild('actualCanvas', {static: false}) actualCanvas: CanvasComponent;
    result: JudgeResult = new JudgeResult(null, null);

    constructor() {
    }

    ngOnInit(): void {
    }

    getAnswerShapeConfig(): string {
        return '{"attrs":{"width":250,"height":250},"className":"Stage","children":[{"attrs":{},"className":"Layer","children":[{"attrs":{"x":150,"y":75,"fill":"#7477c9","draggable":true,"shadowColor":"black","shadowBlur":2,"shadowOpacity":0.5,"name":"t4"},"className":"Shape"},{"attrs":{"x":75,"y":52,"fill":"#00b2a9","draggable":true,"shadowColor":"black","shadowBlur":2,"shadowOpacity":0.5,"name":"t2"},"className":"Shape"},{"attrs":{"x":42,"y":79,"fill":"#008DD2","draggable":true,"shadowColor":"black","shadowBlur":2,"shadowOpacity":0.5,"name":"t1"},"className":"Shape"},{"attrs":{"x":168,"y":149,"fill":"#F08366","draggable":true,"shadowColor":"black","shadowBlur":2,"shadowOpacity":0.5,"name":"t5"},"className":"Shape"},{"attrs":{"x":61,"y":182,"fill":"#F7A947","draggable":true,"shadowColor":"black","shadowBlur":2,"shadowOpacity":0.5,"name":"s1"},"className":"Shape"},{"attrs":{"x":126,"y":147,"fill":"#F18142","draggable":true,"shadowColor":"black","shadowBlur":2,"shadowOpacity":0.5,"name":"t3"},"className":"Shape"}]},{"attrs":{},"className":"Layer","children":[{"attrs":{"resizeEnabled":false,"anchorSize":30,"anchorCornerRadius":15,"anchorStrokeWidth":2,"anchorStroke":"#7787A1","rotateAnchorOffset":40,"borderStroke":"#7787A1","borderDash":[3,3],"borderStrokeWidth":2,"rotationSnaps":[0,15,30,45,60,75,90,105,120,135,150,165,180,195,210,225,240,255,270,285,300,315,330,345]},"className":"Transformer"},{"attrs":{"x":190,"y":87,"fill":"#7787A1","draggable":true,"shadowColor":"black","shadowBlur":2,"shadowOpacity":0.5,"name":"s2"},"className":"Shape"}]}]}\n';
    }

    judge() {
        const e = this.expectedCanvas.toJSON();
        const a = this.actualCanvas.toJSON();
        this.result = new JudgeResult(e, a);
    }
}
