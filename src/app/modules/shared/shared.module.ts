import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CanvasComponent} from '../../components/canvas/canvas.component';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';


@NgModule({
    declarations: [
        CanvasComponent,
    ],
    exports: [
        CanvasComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule
    ]
})
export class SharedModule {
}
