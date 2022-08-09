import { Directive, Input, ElementRef, OnDestroy, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { InputBoolean, Constructor, MixinBase, mixinUnsubscribe, ThyUnsubscribe } from 'ngx-tethys/core';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DEFAULT_WATERMARK_CONFIG, DEFAULT_CANVAS_CONFIG, spaceByDistributeType } from './config';
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
        const parentNode = this.el.nativeElement;
        const key = parentNode.id;

        const __wm = this.el.nativeElement.querySelector(`.${key}_vm`);
        if (__wm) {
            this.el.nativeElement.removeChild(__wm);
        }
    }

    private createCanvas() {
        let { distributeType, fontSize, color, degree, textLineHeight, textAlign, textBaseline } = {
            ...DEFAULT_CANVAS_CONFIG,
            ...DEFAULT_CANVAS_CONFIG.styles,
            ...(this.thyCanvasConfig || {}),
            ...(this.thyCanvasConfig?.styles || {})
        };

        const [xSpace, ySpace] = spaceByDistributeType.get(distributeType);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const getFakeSize = () => {
            let fakeBox = this.el.nativeElement.querySelector('.fake-wrap');
            if (!fakeBox) {
                fakeBox = document.createElement('div');
                fakeBox.classList.add('fake-wrap');
                this.el.nativeElement.insertBefore(fakeBox, this.el.nativeElement.firstChild);
            }
            fakeBox.setAttribute('style', `font-size: ${fontSize}px`);
            fakeBox.innerHTML = this.content.replace(/(\\n)/gm, '</br>');
            const { width, height } = fakeBox.getBoundingClientRect();
            fakeBox.setAttribute('style', `display: none`);
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

        ctx.font = `${fontSize}px microsoft yahei`;
        ctx.textAlign = textAlign as CanvasTextAlign;
        ctx.textBaseline = textBaseline as CanvasTextBaseline;
        ctx.fillStyle = color;
        ctx.rotate(0 - (degree * Math.PI) / 180);
        contentArr.map((k, i) => {
            ctx.fillText(
                k,
                -start + (textAlign === 'center' ? Math.ceil(canvasWidth / 2) : 0),
                Math.sin(angle) * canvasWidth + textLineHeight * i
            );
            start += Math.sin(angle) * textLineHeight;
        });
        this.canvas = canvas;
        return canvas;
    }

    private createWatermark(isRefresh = true) {
        const key = this.el.nativeElement.id;
        const __wm = this.el.nativeElement.querySelector(`.${key}_vm`);
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
            watermarkDiv.classList.add(`${key}_vm`);
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
