import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CanvasComponent} from '../../components/canvas/canvas.component';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {CorrectAnswerModalComponent} from '../../components/correct-answer-modal/correct-answer-modal.component';
import {LottieAnimationViewModule} from 'ng-lottie';


@NgModule({
    declarations: [
        CanvasComponent,
        CorrectAnswerModalComponent,
    ],
    exports: [
        CanvasComponent,
        CorrectAnswerModalComponent,
    ],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        LottieAnimationViewModule
    ],
    entryComponents: [
        CorrectAnswerModalComponent,
    ]
})
export class SharedModule {
}
