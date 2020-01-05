import {Component, OnInit, ViewChild} from '@angular/core';
import {JudgeResult} from '../../types/judge-result';
import {CanvasComponent} from '../../components/canvas/canvas.component';
import {PopoverController} from '@ionic/angular';
import {CorrectAnswerModalComponent} from '../../components/correct-answer-modal/correct-answer-modal.component';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    @ViewChild('actualCanvas', {static: false}) actualCanvas: CanvasComponent;
    @ViewChild('expectedCanvas', {static: false}) expectedCanvas: CanvasComponent;
    result: JudgeResult = new JudgeResult(null, null);
    isProduction: boolean;
    cleared: boolean;

    constructor(
        public popoverController: PopoverController
    ) {
        this.isProduction = environment.production;
    }

    ngOnInit(): void {
    }

    getAnswerShapeConfig(): string {
        return '{"attrs":{"width":390,"height":390,"scaleX":1.56,"scaleY":1.56},"className":"Stage","children":[{"attrs":{},"className":"Layer","children":[{"attrs":{"x":75,"y":75,"fill":"#FF6363","draggable":true,"name":"t1"},"className":"Shape"},{"attrs":{"x":75,"y":150,"fill":"#796866","draggable":true,"name":"s1"},"className":"Shape"},{"attrs":{"x":100,"y":125,"fill":"#FAAC0E","draggable":true,"name":"t3"},"className":"Shape"},{"attrs":{"x":125,"y":100,"fill":"#E0C240","draggable":true,"name":"s2"},"className":"Shape"},{"attrs":{"x":150,"y":75,"fill":"#59697A","draggable":true,"name":"t4"},"className":"Shape"},{"attrs":{"x":125,"y":125,"fill":"#7298C8","draggable":true,"name":"t5"},"className":"Shape"},{"attrs":{"resizeEnabled":false,"anchorSize":30,"anchorCornerRadius":15,"anchorStrokeWidth":2,"anchorStroke":"#04A7AB","rotateAnchorOffset":40,"borderStroke":"#04A7AB","borderDash":[3,3],"borderStrokeWidth":2,"rotationSnaps":[0,15,30,45,60,75,90,105,120,135,150,165,180,195,210,225,240,255,270,285,300,315,330,345]},"className":"Transformer"},{"attrs":{"x":73.07692307692307,"y":37.179487179487175,"fill":"#04A7AB","draggable":true,"name":"t2"},"className":"Shape"}]},{"attrs":{},"className":"Layer","children":[]}]}';
    }

    async judge() {
        if (this.cleared) {
            return;
        }

        const e = this.expectedCanvas.toJSON();
        const a = this.actualCanvas.toJSON();
        this.result = new JudgeResult(e, a);

        if (this.result.isOK()) {
            this.cleared = true;
            const popover = await this.popoverController.create({
                component: CorrectAnswerModalComponent,
                translucent: true
            });
            return await popover.present();
        }
    }
}
