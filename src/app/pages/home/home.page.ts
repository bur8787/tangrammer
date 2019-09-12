import {Component, OnInit} from '@angular/core';
import 'Konva';
import {ShapeCreatorService} from '../../services/shape-creator.service';

declare const Konva: any;

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    stage: any;
    layer: any;
    dragLayer: any;
    stageWidth = 1000;
    stageHeight = 1000;

    constructor(
        private shapeCreator: ShapeCreatorService
    ) {
    }

    ngOnInit() {
        this.initialStage();
        this.addShapes();
    }

    initialStage() {
        this.stage = new Konva.Stage({
            container: 'container',
            width: this.stageWidth,
            height: this.stageHeight
        });
        this.layer = new Konva.Layer();
        this.dragLayer = new Konva.Layer();
        this.stage.add(this.layer, this.dragLayer);
        this.layer.draw();

        this.stage.on('dragstart', (evt) => {
            const shape = evt.target;
            // moving to another layer will improve dragging performance
            shape.moveTo(this.dragLayer);
            this.stage.draw();

            shape.setAttrs({
                shadowEnabled: true,
            });
        });

        this.stage.on('dragend', (evt) => {
            const shape = evt.target;
            shape.moveTo(this.layer);
            this.stage.draw();
            shape.to({
                shadowEnabled: false,
            });
        });

        this.stage.on('click tap', (e) => {
            if (e.target === this.stage) {
                this.stage.find('Transformer').destroy();
                this.layer.draw();
                return;
            }
            this.stage.find('Transformer').destroy();

            const tr = new Konva.Transformer({
                node: e.target,
                resizeEnabled: false,
                anchorSize: 10,
                anchorCornerRadius: 5,
                rotateAnchorOffset: 50,
                borderEnabled: true,
                rotationSnaps: [15, 30, 45, 60, 75, 90,
                    105, 120, 135, 150, 165, 180,
                    195, 210, 225, 240, 255, 270,
                    285, 300, 315, 330, 345]
            });
            this.layer.add(tr);
            this.layer.draw();
        });

        window.addEventListener('resize', this.fitStageIntoParentContainer);
        setTimeout(this.fitStageIntoParentContainer, 200);
    }

    addShapes() {
        this.shapeCreator.getShapeConfigs().forEach((sc) => {
                const s = new Konva.Shape({
                    sceneFunc: (context, shape) => {
                        context.beginPath();
                        context.moveTo(sc.position.x, sc.position.y);
                        sc.lineTo.forEach((lt) => {
                            context.lineTo(lt.x, lt.y);
                        });
                        context.closePath();
                        context.fillStrokeShape(shape);
                    },
                    fill: sc.color,
                    draggable: true,
                    shadowEnabled: false,
                    shadowColor: 'black',
                    shadowBlur: 2,
                    shadowOpacity: 0.5,
                    shadowOffset: {
                        x: 1,
                        y: 1
                    },
                });
                s.getSelfRect = () => {
                    return {
                        x: sc.position.x,
                        y: sc.position.y,
                        width: 1,
                        height: 1
                    };
                };
                this.layer.add(s);
            }
        );
        this.layer.batchDraw();
    }

    fitStageIntoParentContainer = () => {
        const container = document.querySelector('#container-wrapper') as HTMLElement;

        const containerWidth = container.offsetWidth;
        const scale = containerWidth / this.stageWidth;

        this.stage.width(this.stageWidth * scale);
        this.stage.height(this.stageHeight * scale);
        this.stage.scale({x: scale, y: scale});
        this.stage.draw();
    };

}
