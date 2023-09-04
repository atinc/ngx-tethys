import { Directive, Input, ElementRef, OnDestroy, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { InputBoolean, UnsubscribeMixin } from 'ngx-tethys/core';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DEFAULT_WATERMARK_CONFIG, DEFAULT_CANVAS_CONFIG } from './config';
import { MutationObserverFactory } from '@angular/cdk/observers';

export interface ThyCanvasConfigType {
    degree?: number;
    color?: string;
    fontSize?: number | string;
    textLineHeight?: number;
    gutter?: number[];
}

/**
 * 水印指令
 * @name thyWatermark
 */
@Directive({
    selector: '[thyWatermark]',
    standalone: true
})
export class ThyWatermarkDirective extends UnsubscribeMixin implements OnInit, OnDestroy, OnChanges {
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
    @Input() thyCanvasConfig: ThyCanvasConfigType;

    private createWatermark$ = new Subject<string>();

    private observer: MutationObserver;

    private canvas: HTMLCanvasElement;

    private wmDiv: HTMLElement;

    constructor(private el: ElementRef) {
        super();
    }

    ngOnInit() {
        if (!this.thyDisabled) {
            this.createWatermark$.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(() => {
                this.observeAttributes()
                    .pipe(takeUntil(this.ngUnsubscribe$))
                    .subscribe(() => {});
            });
            this.createWatermark();
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        const { thyWatermark, thyDisabled } = changes;
        const thyWatermarkChange = () => {
            if (thyWatermark.firstChange) return;
            if (thyWatermark.currentValue) {
                this.refreshWatermark();
            }
        };
        const thyDisabledChange = () => {
            if (thyDisabled.firstChange) return;
            thyDisabled?.currentValue ? this.removeWatermark() : this.refreshWatermark();
        };
        thyWatermark && thyWatermarkChange();
        thyDisabled && thyDisabledChange();
    }

    private refreshWatermark() {
        this.removeWatermark();
        this.createWatermark();
    }

    private removeWatermark() {
        if (this.wmDiv) {
            this.wmDiv.remove();
            this.wmDiv = null;
        }
    }

    createCanvas() {
        let { gutter, fontSize, color, degree, textLineHeight } = {
            ...DEFAULT_CANVAS_CONFIG,
            ...(this.thyCanvasConfig || {})
        };

        const [xGutter, yGutter] = gutter;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const getFakeSize = () => {
            const fakeBox = document.createElement('div');
            const fakeBoxStyle = {
                position: 'absolute',
                top: 0,
                left: 0,
                display: 'inline-block',
                'font-size': `${parseFloat('' + fontSize)}px`,
                'word-wrap': 'break-word',
                'font-family': 'inherit',
                'white-space': 'pre-line'
            };
            const styleStr = Object.keys(fakeBoxStyle).reduce((pre, next) => ((pre += `${next}:${fakeBoxStyle[next]};`), pre), '');
            fakeBox.setAttribute('style', styleStr);

            fakeBox.innerHTML = this.content.replace(/(\\n)/gm, '</br>');
            document.querySelector('body').insertBefore(fakeBox, document.querySelector('body').firstChild);
            const { width, height } = fakeBox.getBoundingClientRect();
            fakeBox.remove();
            return { width, height };
        };
        const { width: fakeBoxWidth, height: fakeBoxHeight } = getFakeSize();

        const angle = (degree * Math.PI) / 180;
        const contentArr = this.content.split('\\n');
        const canvasHeight = Math.sin(angle) * fakeBoxWidth + fakeBoxHeight;

        let start = Math.ceil(Math.sin(angle) * fakeBoxWidth * Math.sin(angle));
        const canvasWidth = start + fakeBoxWidth;
        canvas.setAttribute('width', '' + (canvasWidth + xGutter));
        canvas.setAttribute('height', '' + (canvasHeight + yGutter));

        ctx.font = `${parseFloat('' + fontSize)}px microsoft yahei`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillStyle = color;
        ctx.rotate(0 - (degree * Math.PI) / 180);
        contentArr.map((k, i) => {
            ctx.fillText(k, -start + Math.ceil(canvasWidth / 2), Math.sin(angle) * canvasWidth + textLineHeight * i);
            start += Math.sin(angle) * textLineHeight;
        });
        this.canvas = canvas;
        return canvas;
    }

    private createWatermark(isRefresh = true) {
        const watermarkDiv = this.wmDiv || document.createElement('div');

        const background = !isRefresh ? this.canvas.toDataURL() : this.createCanvas().toDataURL();
        const watermarkStyle = {
            ...DEFAULT_WATERMARK_CONFIG,
            'background-image': `url(${background})`
        };

        const styleStr = Object.keys(watermarkStyle).reduce((pre, next) => ((pre += `${next}:${watermarkStyle[next]};`), pre), '');
        watermarkDiv.setAttribute('style', styleStr);

        if (!this.wmDiv) {
            const parentNode = this.el.nativeElement;
            watermarkDiv.classList.add(`_vm`);
            this.wmDiv = watermarkDiv;
            parentNode.insertBefore(watermarkDiv, parentNode.firstChild);
        }
        this.createWatermark$.next('');
    }

    private observeAttributes() {
        this.observer?.disconnect();
        return new Observable(observe => {
            const stream = new Subject<MutationRecord[]>();
            this.observer = new MutationObserverFactory().create(mutations => stream.next(mutations));
            if (this.observer) {
                this.observer.observe(this.wmDiv, {
                    attributes: true
                });
            }
            stream.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(() => {
                if (this.wmDiv) {
                    this?.observer?.disconnect();
                    this.createWatermark(false);
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
