import { Directive, Input, ElementRef, OnDestroy, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { InputBoolean, Constructor, MixinBase, mixinUnsubscribe, ThyUnsubscribe } from 'ngx-tethys/core';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DEFAULT_WATERMARK_CONFIG, DEFAULT_CANVAS_CONFIG } from './config';
import { CanvasConfig } from './interfaces';
import { MutationObserverFactory } from '@angular/cdk/observers';

const _MixinBase: Constructor<ThyUnsubscribe> & typeof MixinBase = mixinUnsubscribe(MixinBase);

@Directive({
    selector: '[thyWatermark]'
})
export class ThyWatermarkDirective extends _MixinBase implements OnInit, OnDestroy, OnChanges {
    @Input() @InputBoolean() thyWatermarkDisabled: boolean = false;
    @Input() thyWatermarkCanvasConfig: CanvasConfig;

    content: string;
    @Input()
    set thyWatermark(value: any) {
        this.content = value || 'worktile&pingcode';
    }

    private createCanvas$ = new Subject<string>();

    private observer: MutationObserver;
    constructor(private el: ElementRef) {
        super();
    }

    ngOnInit() {
        if (!this.thyWatermarkDisabled) {
            this.createCanvas$.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(() => {
                this.observeAttributes()
                    .pipe(takeUntil(this.ngUnsubscribe$))
                    .subscribe(() => {});
            });
            this.createCanvas();
        }
    }
    ngOnChanges(changes: SimpleChanges): void {
        const { thyWatermark, thyWatermarkDisabled } = changes;
        if (thyWatermarkDisabled?.currentValue && !thyWatermarkDisabled?.firstChange) {
            this.clearCanvas();
            return;
        }
        if (thyWatermark?.currentValue && !thyWatermark?.firstChange) {
            this.createCanvas();
        }
    }

    private clearCanvas() {
        const __wm = this.el.nativeElement.querySelector('.__wm');
        if (__wm) {
            this.el.nativeElement.removeChild(__wm);
        }
    }

    private createCanvas() {
        const { width, height, font, fillStyle, rotate, textLineHeight } = {
            ...DEFAULT_CANVAS_CONFIG,
            ...this.thyWatermarkCanvasConfig
        };

        let virtualDiv = this.el.nativeElement.querySelector('.content-wrap');
        if (!virtualDiv) {
            virtualDiv = document.createElement('div');
            virtualDiv.classList.add('content-wrap');
        }

        virtualDiv.innerHTML = this.content?.replace(/(\\r\\n|\\n|\\r|\\n)/gm, '<br />');

        const parentNode = this.el.nativeElement;
        parentNode.insertBefore(virtualDiv, parentNode.firstChild);

        const virtualDivRect = virtualDiv.getBoundingClientRect();

        const widthValue = Math.abs(Math.round(virtualDivRect.width / Math.cos(rotate)));
        const longValue = widthValue - Math.abs(Math.tan(rotate) * virtualDivRect.width);
        const canvasWidth = parseFloat(width) + widthValue + 'px';
        const canvasHeight = parseFloat(height) + longValue + virtualDivRect.height + 'px';

        virtualDiv.setAttribute('style', 'visibility: hidden');

        const canvas = document.createElement('canvas');
        canvas.setAttribute('width', canvasWidth);
        canvas.setAttribute('height', canvasHeight);

        const ctx = canvas.getContext('2d');
        ctx.font = font;
        ctx.rotate((Math.PI / 180) * rotate);
        ctx.fillStyle = fillStyle;

        this.content
            .replace(/^\"|\"$/g, '')
            .split('\\n')
            .map((k, i) => {
                ctx.fillText(k, 0, longValue + parseFloat(height) + textLineHeight * i, parseFloat(canvasWidth));
            });

        this.createWatermarkDiv(canvas);

        this.createCanvas$.next('');
    }

    private createWatermarkDiv(canvas: HTMLCanvasElement) {
        const __wm = this.el.nativeElement.querySelector('.__wm');
        const watermarkDiv = __wm || document.createElement('div');

        const watermarkStyle = {
            ...DEFAULT_WATERMARK_CONFIG,
            'background-image': `url(${canvas.toDataURL()})`
        };

        const styleStr = Object.keys(watermarkStyle).reduce((pre, next) => ((pre += `${next}:${watermarkStyle[next]};`), pre), '');

        watermarkDiv.setAttribute('style', styleStr);

        if (!__wm) {
            const parentNode = this.el.nativeElement;
            watermarkDiv.classList.add('__wm');
            parentNode.insertBefore(watermarkDiv, parentNode.firstChild);
        }
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
                    this.createCanvas();
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
