import { Directive, Input, ElementRef, OnDestroy, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { InputBoolean, Constructor, MixinBase, mixinUnsubscribe, ThyUnsubscribe } from 'ngx-tethys/core';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DEFAULT_WATERMARK_CONFIG, DEFAULT_CANVAS_CONFIG, distributeTypeObj } from './config';
import { MutationObserverFactory } from '@angular/cdk/observers';

const _MixinBase: Constructor<ThyUnsubscribe> & typeof MixinBase = mixinUnsubscribe(MixinBase);

export interface ThyCanvasConfigType {
    degree: number;
    color: string;
    fontSize: number | string;
    textLineHeight: number;
    distributeType: string;
}
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
    @Input() thyCanvasConfig: ThyCanvasConfigType;

    private createWatermark$ = new Subject<string>();

    private observer: MutationObserver;

    canvas: HTMLCanvasElement;
    canvasContext: CanvasRenderingContext2D;

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
        const __wm = this.el.nativeElement.querySelector(`._vm`);
        if (__wm) {
            this.el.nativeElement.removeChild(__wm);
        }
    }

    createCanvas() {
        let { distributeType, fontSize, color, degree, textLineHeight } = {
            ...DEFAULT_CANVAS_CONFIG,
            ...(this.thyCanvasConfig || {})
        };

        const [xSpace, ySpace] = distributeTypeObj[distributeType];
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const getFakeSize = () => {
            const fakeBox = document.createElement('div');
            fakeBox.classList.add('fake-wrap');
            document.querySelector('body').insertBefore(fakeBox, document.querySelector('body').firstChild);
            fakeBox.setAttribute('style', `font-size: ${parseFloat('' + fontSize)}px`);
            fakeBox.innerHTML = this.content.replace(/(\\n)/gm, '</br>');
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
        canvas.setAttribute('width', '' + (canvasWidth + xSpace));
        canvas.setAttribute('height', '' + (canvasHeight + ySpace));

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
        const __wm = this.el.nativeElement.querySelector(`._vm`);
        const watermarkDiv = __wm || document.createElement('div');

        const background = !isRefresh ? this.canvas.toDataURL() : this.createCanvas().toDataURL();
        const watermarkStyle = {
            ...DEFAULT_WATERMARK_CONFIG,
            'background-image': `url(${background})`
        };

        const styleStr = Object.keys(watermarkStyle).reduce((pre, next) => ((pre += `${next}:${watermarkStyle[next]};`), pre), '');
        watermarkDiv.setAttribute('style', styleStr);

        if (!__wm) {
            const parentNode = this.el.nativeElement;
            watermarkDiv.classList.add(`_vm`);
            parentNode.insertBefore(watermarkDiv, parentNode.firstChild);
        }
        this.createWatermark$.next('');
    }

    private observeAttributes() {
        this.observer?.disconnect();
        return new Observable(observe => {
            const stream = new Subject<MutationRecord[]>();
            this.observer = new MutationObserverFactory().create(mutations => stream.next(mutations));
            const parentNode = this.el.nativeElement;
            if (this.observer) {
                const __wm = parentNode.querySelector(`._vm`);

                this.observer.observe(__wm, {
                    attributes: true
                });
            }
            stream.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(() => {
                const parentNode = this.el.nativeElement;
                const __wm = parentNode.querySelector(`._vm`);
                if (__wm) {
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
