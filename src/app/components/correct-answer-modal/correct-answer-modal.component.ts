import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-correct-answer-modal',
    templateUrl: './correct-answer-modal.component.html',
    styleUrls: ['./correct-answer-modal.component.scss'],
})
export class CorrectAnswerModalComponent implements OnInit {
    public lottieConfig;
    private anim: any;

    constructor() {
        this.lottieConfig = {
            path: 'assets/pinjump.json',
            renderer: 'canvas',
            autoplay: true,
            loop: true
        };
    }

    ngOnInit() {
    }

    handleAnimation(anim: any) {
        this.anim = anim;
    }

}
