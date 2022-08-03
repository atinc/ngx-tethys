import {
    NgZone,
    Directive,
    Input,
    ElementRef,
    OnDestroy,
    OnInit,
    SimpleChanges,
    OnChanges,
    AfterViewInit,
    AfterContentInit
} from '@angular/core';
import { InputBoolean, Constructor, MixinBase, mixinUnsubscribe, ThyUnsubscribe } from 'ngx-tethys/core';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DEFAULT_WATERMARK_CONFIG, DEFAULT_CANVAS_CONFIG } from './config';
import { MutationObserverFactory } from '@angular/cdk/observers';
import { ViewportRuler } from '@angular/cdk/overlay';

const _MixinBase: Constructor<ThyUnsubscribe> & typeof MixinBase = mixinUnsubscribe(MixinBase);

@Directive({
    selector: '[thyWatermark]'
})
export class ThyWatermarkDirective extends _MixinBase implements OnInit, OnDestroy, OnChanges, AfterViewInit, AfterContentInit {
    /**
     * 是否禁用，默认为'false'
     */
    @Input()
    @InputBoolean()
    thyDisabled: boolean = false;

    content: string;
    /**
     * 水印内容，默认'worktile&pingcode'
     */
    @Input()
    set thyWatermark(value: string) {
        this.content = !!value?.replace(/^\"|\"$/g, '') ? value : 'worktile&pingcode';
    }

    /**
     * canvas配置
     */
    @Input() thyCanvasStyles: typeof DEFAULT_CANVAS_CONFIG;

    private createCanvas$ = new Subject<string>();

    private observer: MutationObserver;

    canvas: HTMLCanvasElement;
    canvasContext: CanvasRenderingContext2D;

    constructor(private el: ElementRef, private viewportRuler: ViewportRuler, private readonly ngZone: NgZone) {
        super();
        this.checkContainerWithinViewport();
    }

    ngOnInit() {}
    ngAfterViewInit(): void {
        if (!this.thyDisabled) {
            this.createCanvas$.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(() => {
                this.observeAttributes()
                    .pipe(takeUntil(this.ngUnsubscribe$))
                    .subscribe(() => {});
            });
            setTimeout(() => {
                this.initCanvas();
            }, 0);
        }
    }
    ngAfterContentInit() {}

    ngOnChanges(changes: SimpleChanges): void {
        const { thyWatermark, thyDisabled } = changes;
        if (thyDisabled?.currentValue && !thyDisabled?.firstChange) {
            this.clearCanvas();
            return;
        }
        if (thyWatermark?.currentValue && !thyWatermark?.firstChange) {
            this.refreshCanvas();
        }
    }

    private refreshCanvas() {
        this.clearCanvas();
        this.initCanvas();
    }

    private checkContainerWithinViewport() {
        this.viewportRuler
            .change(100)
            .pipe(takeUntil(this.ngUnsubscribe$))
            .subscribe(() => {
                this.ngZone.run(() => {
                    this.refreshCanvas();
                });
            });
    }

    private clearCanvas() {
        const __wm = this.el.nativeElement.querySelector('.__wm');
        if (__wm) {
            this.el.nativeElement.removeChild(__wm);
        }
    }

    private initCanvas() {
        this.createCanvas();
        this.drawCanvas();
        this.createWaterMark();
    }

    private createCanvas() {
        const canvas = document.createElement('canvas');
        const { width, height } = this.el.nativeElement.getBoundingClientRect();
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        this.canvas = canvas;
    }

    private drawCanvas() {
        let { x, y, xSpace, ySpace, fontsize, color, rotate, textLineHeight, textAlign, textBaseline } = {
            ...DEFAULT_CANVAS_CONFIG,
            ...this.thyCanvasStyles
        };

        const { width, height } = this.el.nativeElement.getBoundingClientRect();

        const setCanvas = () => {
            const canvasContext = this.canvas.getContext('2d');
            canvasContext.clearRect(0, 0, width, height);
            canvasContext.font = fontsize + ' microsoft yahei';
            canvasContext.fillStyle = color;
            canvasContext.textAlign = textAlign as CanvasTextAlign;
            canvasContext.textBaseline = textBaseline as CanvasTextBaseline;
            return canvasContext;
        };

        const draw = () => {
            const ctx = setCanvas();

            const contentArr = this.content.replace(/^\"|\"$/g, '').split('\\n');
            const maxLength = contentArr.reduce((a, b) => ((a = b?.length > a?.length ? b : a), a), '');

            let measureText = ctx.measureText(maxLength);
            const textWidth = measureText.width;
            ySpace = ySpace >= textLineHeight ? ySpace : textLineHeight;

            for (let xAxis = x; xAxis < width; xAxis += xSpace + textWidth) {
                for (let yAxis = y; yAxis < height; yAxis += ySpace * contentArr.length) {
                    ctx.save();
                    ctx.translate(xAxis, yAxis);
                    ctx.rotate(0 - (rotate * Math.PI) / 180);
                    contentArr.map((k, i) => {
                        ctx.fillText(k, 0, textLineHeight * (i + 1));
                    });
                    ctx.restore();
                }
            }
        };

        return draw();
    }

    private createWaterMark() {
        const setWatermarkStyle = () => {
            const watermarkStyle = DEFAULT_WATERMARK_CONFIG;
            const styleStr = Object.keys(watermarkStyle).reduce((pre, next) => ((pre += `${next}:${watermarkStyle[next]};`), pre), '');
            this.canvas.setAttribute('style', styleStr);
        };

        const insertCanvas = () => {
            const parentNode = this.el.nativeElement;
            if (!parentNode.querySelector('.__wm')) {
                this.canvas.classList.add('__wm');
                parentNode.append(this.canvas);
            }
        };
        setWatermarkStyle();
        insertCanvas();
        this.createCanvas$.next('');
    }

    private observeAttributes() {
        this?.observer?.disconnect();
        return new Observable(observe => {
            const stream = new Subject<MutationRecord[]>();
            this.observer = new MutationObserverFactory().create(mutations => stream.next(mutations));
            if (this.observer) {
                const __wm = this.el.nativeElement.querySelector('.__wm');
                this.observer.observe(__wm, {
                    attributes: true
                });
            }
            stream.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(() => {
                const __wm = this.el.nativeElement.querySelector('.__wm');
                if (__wm) {
                    this?.observer?.disconnect();
                    this.createWaterMark();
                }
            });
            observe.next(stream);
            return () => {
                this.observer?.disconnect();
            };
        });
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}
