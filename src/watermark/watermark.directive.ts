import { Directive, Input, ElementRef, OnDestroy, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { InputBoolean, Constructor, MixinBase, mixinUnsubscribe, ThyUnsubscribe } from 'ngx-tethys/core';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DEFAULT_WATERMARK_CONFIG, DEFAULT_CANVAS_CONFIG } from './config';
import { MutationObserverFactory } from '@angular/cdk/observers';

const _MixinBase: Constructor<ThyUnsubscribe> & typeof MixinBase = mixinUnsubscribe(MixinBase);

type TheCanvasConfigType = typeof DEFAULT_CANVAS_CONFIG;
@Directive({
    selector: '[thyWatermark]'
})
export class ThyWatermarkDirective extends _MixinBase implements OnInit, OnDestroy, OnChanges {
    /**
     * 是否禁用，默认为 false
     */
    @Input()
    @InputBoolean()
    thyDisabled: boolean = false;

    content: string;
    /**
     * 水印内容
     */
    @Input()
    set thyWatermark(value: string) {
        value = value?.replace(/^\"|\"$/g, '');
        this.content = !!value ? value : '';
    }

    /**
     * canvas样式配置
     */
    @Input() thyCanvasConfig: TheCanvasConfigType;

    private createCanvas$ = new Subject<string>();

    private observer: MutationObserver;

    canvas: HTMLCanvasElement;
    canvasContext: CanvasRenderingContext2D;

    constructor(private el: ElementRef) {
        super();
    }

    ngOnInit() {
        if (!this.thyDisabled) {
            this.createCanvas$.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(() => {
                this.observeAttributes()
                    .pipe(takeUntil(this.ngUnsubscribe$))
                    .subscribe(() => {});
            });
            this.createCanvas();
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        const { thyWatermark, thyDisabled } = changes;
        const thyWatermarkChange = () => {
            if (thyWatermark.firstChange) return;
            if (thyWatermark.currentValue) {
                this.refreshCanvas();
            }
        };
        const thyDisabledChange = () => {
            if (thyDisabled.firstChange) return;
            thyDisabled?.currentValue ? this.clearCanvas() : this.refreshCanvas();
        };
        thyWatermark && thyWatermarkChange();
        thyDisabled && thyDisabledChange();
    }

    private refreshCanvas() {
        this.clearCanvas();
        this.createCanvas();
    }

    private clearCanvas() {
        const parentNode = this.el.nativeElement;
        const key = parentNode.id;

        const __wm = this.el.nativeElement.querySelector(`.${key}_vm`);
        if (__wm) {
            this.el.nativeElement.removeChild(__wm);
        }
    }

    private createCanvas() {
        let { xSpace, ySpace, fontsize, color, rotate, textLineHeight, textAlign, textBaseline } = {
            ...DEFAULT_CANVAS_CONFIG,
            ...DEFAULT_CANVAS_CONFIG.styles,
            ...(this.thyCanvasConfig || {}),
            ...(this.thyCanvasConfig?.styles || {})
        };

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const contentArr = this.content.split('\\n');
        ctx.font = `${fontsize} microsoft yahei`;

        const canvasWidth = Math.max(...contentArr.map(k => ctx.measureText(k).width));
        const canvasHeight = Math.sin(rotate) * canvasWidth;

        canvas.setAttribute('width', '' + (canvasWidth + xSpace));
        canvas.setAttribute('height', '' + (canvasHeight + ySpace + textLineHeight * (contentArr.length - 1)));
        this.canvas = canvas;

        ctx.textAlign = textAlign as CanvasTextAlign;
        ctx.textBaseline = textBaseline as CanvasTextBaseline;
        ctx.fillStyle = color;
        ctx.rotate(0 - (rotate * Math.PI) / 180);
        contentArr.map((k, i) => {
            ctx.save();
            ctx.fillText(k, Math.abs(Math.tan(rotate) * canvasHeight), canvasHeight + textLineHeight * i);
            ctx.restore();
        });

        this.createWatermark();
    }
    private createWatermark() {
        const key = this.el.nativeElement.id;
        const __wm = this.el.nativeElement.querySelector(`.${key}_vm`);
        const watermarkDiv = __wm || document.createElement('div');

        const watermarkStyle = {
            ...DEFAULT_WATERMARK_CONFIG,
            'background-image': `url(${this.canvas.toDataURL()})`
        };

        const styleStr = Object.keys(watermarkStyle).reduce((pre, next) => ((pre += `${next}:${watermarkStyle[next]};`), pre), '');

        watermarkDiv.setAttribute('style', styleStr);

        if (!__wm) {
            const parentNode = this.el.nativeElement;
            watermarkDiv.classList.add(`${key}_vm`);
            parentNode.insertBefore(watermarkDiv, parentNode.firstChild);
        }
        this.createCanvas$.next('');
    }

    private observeAttributes() {
        this?.observer?.disconnect();
        return new Observable(observe => {
            const stream = new Subject<MutationRecord[]>();
            this.observer = new MutationObserverFactory().create(mutations => stream.next(mutations));
            const parentNode = this.el.nativeElement;
            const key = parentNode.id;
            if (this.observer) {
                const __wm = parentNode.querySelector(`.${key}_vm`);

                this.observer.observe(__wm, {
                    attributes: true
                });
            }
            stream.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(() => {
                const parentNode = this.el.nativeElement;
                const key = parentNode.id;
                const __wm = parentNode.querySelector(`.${key}_vm`);
                if (__wm) {
                    this?.observer?.disconnect();
                    this.createWatermark();
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
