import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import 'Konva';
import {ShapeCreatorService} from '../../services/shape-creator.service';
import {ShapePosition, ShapePositions} from '../../types/judge-result';

declare const Konva: any;

@Component({
    selector: 'app-canvas',
    templateUrl: './canvas.component.html',
    styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements AfterViewInit, OnInit {
    stage: any;
    layer: any;
    dragLayer: any;
    stageWidth = 250;
    stageHeight = 250;
    elementId: string;
    inputJson: string;
    @Input() initialShapeConfigJSON: string;

    constructor(
        private shapeCreator: ShapeCreatorService
    ) {
    }

    ngOnInit() {
        this.elementId = this.generateElementId();
    }

    ngAfterViewInit(): void {
        this.initialStage();
        if (this.initialShapeConfigJSON) {
            this.drawFromJson(this.initialShapeConfigJSON);
        } else {
            this.addDefaultShapes();
        }
    }

    generateElementId(): string {
        return Math.floor(Math.random() * Math.floor(100000)).toString();
    }

    initialStage() {
        this.stage = new Konva.Stage({
            container: this.elementId,
            width: this.stageWidth,
            height: this.stageHeight
        });
        this.layer = new Konva.Layer();
        this.dragLayer = new Konva.Layer();
        this.stage.add(this.layer, this.dragLayer);
        this.layer.draw();

        this.stage.on('dragstart', (evt) => {
            this.transform(evt, this.dragLayer);

            const shape = evt.target;
            // moving to another layer will improve dragging performance
            shape.moveTo(this.dragLayer);
            // shape.setAttrs({
            //     shadowOffset: {
            //         x: 2,
            //         y: 2
            //     },
            // });
            this.stage.draw();
        });

        this.stage.on('dragend', (evt) => {
            this.transform(evt, this.layer);

            const shape = evt.target;
            shape.moveTo(this.layer);
            // shape.setAttrs({
            //     shadowOffset: {
            //         x: 0,
            //         y: 0
            //     },
            // });
            this.stage.draw();
        });

        this.stage.on('click tap', (e) => {
            if (e.target === this.stage) {
                this.stage.find('Transformer').destroy();
                this.layer.draw();
                this.dragLayer.draw();
                return;
            }
            const shape = e.target;
            shape.moveTo(this.dragLayer);
            shape.moveTo(this.layer);
            this.transform(e, this.layer);
        });

        // responsive
        window.addEventListener('resize', this.fitStageIntoParentContainer);
        setTimeout(this.fitStageIntoParentContainer, 1000);

        // style
        this.stage.getContainer().style.border = '1px dashed var(--ion-color-medium)';
    }

    transform(e, layer) {
        this.stage.find('Transformer').destroy();

        const tr = new Konva.Transformer({
            node: e.target,
            resizeEnabled: false,
            anchorSize: 30,
            anchorCornerRadius: 15,
            anchorStrokeWidth: 2,
            anchorStroke: e.target.attrs.fill,
            rotateAnchorOffset: 40,
            borderStroke: e.target.attrs.fill,
            borderDash: [3, 3],
            borderStrokeWidth: 2,
            rotationSnaps: [
                0, 15, 30, 45, 60, 75,
                90, 105, 120, 135, 150, 165,
                180, 195, 210, 225, 240, 255,
                270, 285, 300, 315, 330, 345
            ]
        });
        layer.add(tr);
        layer.draw();
    }

    addDefaultShapes() {
        this.shapeCreator.getDefaultShapeConfigs().forEach((sc) => {
                const s = this.generateDefaultShape(sc);
                this.layer.add(s);
            }
        );
        this.layer.batchDraw();
    }

    generateDefaultShape(sc: any): any {
        const s = new Konva.Shape({
            sceneFunc: (context, shape) => {
                const offsetX = sc.offset.x;
                const offsetY = sc.offset.y;
                context.beginPath();
                context.moveTo(offsetX, offsetY);
                sc.relativeLineTo.forEach((lt) => {
                    context.lineTo(offsetX + lt.x, offsetY + lt.y);
                });
                context.closePath();
                context.fillStrokeShape(shape);
            },
            x: sc.x,
            y: sc.y,
            fill: sc.color,
            draggable: true,
            // shadowColor: 'black',
            // shadowBlur: 2,
            // shadowOpacity: 0.5,
            name: sc.name,
        });
        s.getSelfRect = () => {
            return {
                x: 0,
                y: 0,
                width: sc.width,
                height: sc.height
            };
        };
        return s;
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

    logPosition() {
        Array.of('t1', 't2', 't3', 't4', 't5', 's1', 's2').forEach(name =>
            this.stage.find(`.${name}`).forEach(s => {
                console.log(s);
                console.log(s.attrs.name, s.x(), s.y(), s.rotation());
            })
        );
    }

    logRelativePosition() {
        const t1 = this.stage.find(`.t1`)[0];
        const t2 = this.stage.find(`.t2`)[0];
        const t3 = this.stage.find(`.t3`)[0];
        const t4 = this.stage.find(`.t4`)[0];
        const t5 = this.stage.find(`.t5`)[0];
        const s1 = this.stage.find(`.s1`)[0];
        const s2 = this.stage.find(`.s2`)[0];
        this.log(t1, t2);
        this.log(t2, t3);
        this.log(t3, t4);
        this.log(t4, t5);
        this.log(t5, s1);
        this.log(s1, s2);
    }

    log(a: any, b: any) {
        console.log(`${a.attrs.name} and ${b.attrs.name}: distance of x is ${a.x() - b.x()}, distance of y is ${a.y() - b.y()}`);
        this.toJSON();
    }

    toJSON(): ShapePositions {
        console.log(this.stage.toJSON());
        const t1c = this.stage.find('.t1')[0];
        const t1 = new ShapePosition(t1c.x(), t1c.y(), t1c.rotation());
        const t2c = this.stage.find('.t2')[0];
        const t2 = new ShapePosition(t2c.x(), t2c.y(), t2c.rotation());
        const t3c = this.stage.find('.t3')[0];
        const t3 = new ShapePosition(t3c.x(), t3c.y(), t3c.rotation());
        const t4c = this.stage.find('.t4')[0];
        const t4 = new ShapePosition(t4c.x(), t4c.y(), t4c.rotation());
        const t5c = this.stage.find('.t5')[0];
        const t5 = new ShapePosition(t5c.x(), t5c.y(), t5c.rotation());
        const s1c = this.stage.find('.s1')[0];
        const s1 = new ShapePosition(s1c.x(), s1c.y(), s1c.rotation());
        const s2c = this.stage.find('.s2')[0];
        const s2 = new ShapePosition(s2c.x(), s2c.y(), s2c.rotation());
        return new ShapePositions(t1, t2, t3, t4, t5, s1, s2);
    }

    drawFromJson(json: string) {
        this.resetCanvas();
        this.stage = Konva.Node.create(json, this.elementId);
        // this.stage.width(this.stageWidth);
        // this.stage.height(this.stageHeight);
        this.layer.draw();
        this.layer = this.stage.children[0];
        this.stage.draw();
        this.attachShapeConfig();
        this.layer.draw();
    }

    resetCanvas() {
        this.dragLayer.destroyChildren();
        this.dragLayer.draw();
        this.layer.destroyChildren();
        this.layer.draw();
        this.stage.destroy();
    }

    attachShapeConfig(): any {
        Array.of('t1', 't2', 't3', 't4', 't5', 's1', 's2').forEach(name =>
            this.stage.find(`.${name}`).forEach(s => {
                const sc = this.shapeCreator.getDefaultShapeConfigs().find((dsc) => dsc.name === name);
                console.log(sc);

                const ns = new Konva.Shape({
                    sceneFunc: (context, shape) => {
                        const offsetX = sc.offset.x;
                        const offsetY = sc.offset.y;
                        context.beginPath();
                        context.moveTo(offsetX, offsetY);
                        sc.relativeLineTo.forEach((lt) => {
                            context.lineTo(offsetX + lt.x, offsetY + lt.y);
                        });
                        context.closePath();
                        context.fillStrokeShape(shape);
                    },
                    x: s.x(),
                    y: s.y(),
                    fill: 'black',
                    draggable: false,
                    shadowColor: 'black',
                    shadowBlur: 2,
                    shadowOpacity: 0.5,
                    name: sc.name,
                });
                this.layer.add(ns);
                s.destroy();
            })
        );
    }
}
