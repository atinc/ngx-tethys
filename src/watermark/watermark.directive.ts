import { Directive, Input, ElementRef, OnDestroy, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { InputBoolean, Constructor, MixinBase, mixinUnsubscribe, ThyUnsubscribe } from 'ngx-tethys/core';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DEFAULT_WATERMARK_CONFIG, DEFAULT_CANVAS_CONFIG } from './config';
import { MutationObserverFactory } from '@angular/cdk/observers';

const _MixinBase: Constructor<ThyUnsubscribe> & typeof MixinBase = mixinUnsubscribe(MixinBase);

type CanvasConfig = typeof DEFAULT_CANVAS_CONFIG;
type WatermarkConfig = typeof DEFAULT_WATERMARK_CONFIG;

@Directive({
    selector: '[thyWatermark]'
})
export class ThyWatermarkDirective extends _MixinBase implements OnInit, OnDestroy, OnChanges {
    @Input() @InputBoolean() thyWatermarkDisabled: boolean = false;
    @Input() thyWatermarkConfig: WatermarkConfig;
    @Input() thyWatermarkCanvasConfig: CanvasConfig;

    content: string;
    @Input()
    set thyWatermark(value: string) {
        this.content = value;
    }

    constructor(private el: ElementRef) {
        super();
    }

    observer: MutationObserver;

    ngOnInit() {
        if (!this.thyWatermarkDisabled) {
            this.canvasWM();
        }
    }
    ngOnChanges(changes: SimpleChanges): void {
        const { thyWatermark, thyWatermarkDisabled } = changes;
        if (thyWatermarkDisabled?.currentValue && !thyWatermarkDisabled?.firstChange) {
            this.clearCanvas();
            return;
        }
        if (thyWatermark.currentValue && !thyWatermark.firstChange) {
            this.canvasWM();
        }
    }

    private clearCanvas() {
        const __wm = this.el.nativeElement.querySelector('.__wm');
        if (__wm) {
            this.el.nativeElement.removeChild(__wm);
            this.observer?.disconnect();
        }
    }

    private canvasWM() {
        const { width, height, font, fillStyle, rotate, textLineHeight, topStart, leftStart } = {
            ...DEFAULT_CANVAS_CONFIG,
            ...this.thyWatermarkCanvasConfig
        };

        const content = this.content || '';
        const canvas = document.createElement('canvas');
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);

        const ctx = canvas.getContext('2d');
        ctx.font = font;
        ctx.fillStyle = fillStyle;
        ctx.rotate((Math.PI / 180) * rotate);

        const contentArr = content.split('&');
        contentArr.map((k, i) => {
            ctx.fillText(k, leftStart, topStart + textLineHeight * i, parseFloat(width));
        });

        const __wm = this.el.nativeElement.querySelector('.__wm');

        const watermarkDiv = __wm || document.createElement('div');

        const watermarkStyle = {
            ...DEFAULT_WATERMARK_CONFIG,
            ...this.thyWatermarkConfig,
            'background-image': `url(${canvas.toDataURL()})`
        };

        const styleStr = Object.keys(watermarkStyle).reduce((pre, next) => ((pre += `${next}:${watermarkStyle[next]};`), pre), '');

        watermarkDiv.setAttribute('style', styleStr);

        if (!__wm) {
            const parentNode = this.el.nativeElement;
            watermarkDiv.classList.add('__wm');
            parentNode.insertBefore(watermarkDiv, parentNode.firstChild);
        }

        this.observeAttributes();
    }

    private observeAttributes() {
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
                this.observer.disconnect();
                this.canvasWM();
            }
        });
    }
    ngOnDestroy(): void {
        this?.observer.disconnect();
        super.ngOnDestroy();
    }
}
