import { Directive, Input, ElementRef, OnInit, SimpleChanges, OnChanges, inject, DestroyRef } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DEFAULT_WATERMARK_CONFIG, DEFAULT_CANVAS_CONFIG } from './config';
import { MutationObserverFactory } from '@angular/cdk/observers';
import { coerceBooleanProperty } from 'ngx-tethys/util';
import { ThyTheme, ThyThemeStore } from 'ngx-tethys/core';

/**
 * @public
 * 水印样式配置
 */
export interface ThyCanvasConfigType {
    /**
     * 偏移角度
     */
    degree?: number;
    /**
     * 字体颜色。如果传的是数组，第一个为默认主题的字体颜色，第二个为黑暗主题的字体颜色
     */
    color?: string | string[];
    /**
     * 字体大小
     */
    fontSize?: number | string;
    /**
     * 文本行高
     */
    textLineHeight?: number;
    /**
     * 横纵间距
     */
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
export class ThyWatermarkDirective implements OnInit, OnChanges {
    /**
     * 是否禁用，默认为 false
     */
    @Input({ transform: coerceBooleanProperty })
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
     * 水印样式配置
     */
    @Input() thyCanvasConfig: ThyCanvasConfigType;

    private createWatermark$ = new Subject<string>();

    private observer: MutationObserver;

    private themeObserver: MutationObserver;

    private canvas: HTMLCanvasElement;

    private wmDiv: HTMLElement;

    private readonly destroyRef = inject(DestroyRef);

    private thyThemeStore = inject(ThyThemeStore);

    constructor(private el: ElementRef) {}

    ngOnInit() {
        if (!this.thyDisabled) {
            this.createWatermark$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
                this.observeAttributes()
                    .pipe(takeUntilDestroyed(this.destroyRef))
                    .subscribe(() => {});
                this.observeTheme()
                    .pipe(takeUntilDestroyed(this.destroyRef))
                    .subscribe(() => {});
            });

            this.fetchTheme();
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
        color = this.thyThemeStore.normalizeColor(color);

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
            stream.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
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

    private observeTheme() {
        this.themeObserver?.disconnect();
        return new Observable(observe => {
            const stream = new Subject<MutationRecord[]>();
            this.themeObserver = new MutationObserverFactory().create(mutations => stream.next(mutations));
            if (this.themeObserver) {
                this.themeObserver.observe(document.documentElement, {
                    attributes: true,
                    attributeFilter: ['theme']
                });
            }
            stream.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(mutations => {
                for (const mutation of mutations) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'theme') {
                        this.fetchTheme();
                        this.refreshWatermark();
                    }
                }
            });
            observe.next(stream);
            return () => {
                this.themeObserver?.disconnect();
            };
        });
    }

    private fetchTheme() {
        const theme = (document.documentElement.getAttribute('theme') as ThyTheme) || ThyTheme.light;
        this.thyThemeStore.setTheme(theme);
    }
}
