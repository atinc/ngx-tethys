import { Directive, ElementRef, OnInit, inject, DestroyRef, effect, input, computed } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DEFAULT_WATERMARK_CONFIG, DEFAULT_CANVAS_CONFIG } from './config';
import { MutationObserverFactory } from '@angular/cdk/observers';
import { coerceBooleanProperty, ThyBooleanInput } from 'ngx-tethys/util';
import { ThyThemeStore } from 'ngx-tethys/core';

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
    selector: '[thyWatermark]'
})
export class ThyWatermarkDirective implements OnInit {
    private el = inject(ElementRef);

    /**
     * 是否禁用，默认为 false
     */
    readonly thyDisabled = input<boolean, ThyBooleanInput>(false, { transform: coerceBooleanProperty });

    /**
     * 水印内容
     */
    readonly thyWatermark = input<string>();

    /**
     * 水印样式配置
     */
    readonly thyCanvasConfig = input<ThyCanvasConfigType>();

    readonly content = computed(() => {
        // eslint-disable-next-line no-useless-escape
        const value = this.thyWatermark()?.replace(/^\"|\"$/g, '');
        return value || '';
    });

    private createWatermark$ = new Subject<string>();

    private observer: MutationObserver | null = null;

    private canvas!: HTMLCanvasElement;

    private wmDiv: HTMLElement | null = null;

    private readonly destroyRef = inject(DestroyRef);

    private thyThemeStore = inject(ThyThemeStore);

    constructor() {
        effect(() => {
            if (!this.thyDisabled() && this.thyThemeStore.theme()) {
                this.refreshWatermark();
            }
        });

        effect(() => {
            const thyWatermark = this.thyWatermark();
            if (thyWatermark) {
                this.refreshWatermark();
            }
        });

        effect(() => {
            const thyDisabled = this.thyDisabled();
            if (thyDisabled) {
                this.removeWatermark();
            } else {
                this.refreshWatermark();
            }
        });
    }

    ngOnInit() {
        if (!this.thyDisabled()) {
            this.createWatermark$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
                this.observeAttributes()
                    .pipe(takeUntilDestroyed(this.destroyRef))
                    .subscribe(() => {});
            });

            this.createWatermark();
        }
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
        const { gutter, fontSize, degree, textLineHeight } = {
            ...DEFAULT_CANVAS_CONFIG,
            ...(this.thyCanvasConfig() || {})
        };

        const color = this.thyThemeStore.normalizeColor({ ...DEFAULT_CANVAS_CONFIG, ...(this.thyCanvasConfig() || {}) }.color);

        const [xGutter, yGutter] = gutter;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;

        const getFakeSize = () => {
            const fakeBox = document.createElement('div');
            const fakeBoxStyle: Record<string, string | number> = {
                position: 'absolute',
                top: 0,
                left: 0,
                display: 'inline-block',
                'font-size': `${parseFloat(`${fontSize}`)}px`,
                'word-wrap': 'break-word',
                'font-family': 'inherit',
                'white-space': 'pre-line'
            };
            const styleStr = Object.keys(fakeBoxStyle).reduce((pre, next) => ((pre += `${next}:${fakeBoxStyle[next]};`), pre), '');
            fakeBox.setAttribute('style', styleStr);

            fakeBox.innerHTML = this.content().replace(/(\\n)/gm, '</br>');
            document.querySelector('body')!.insertBefore(fakeBox, document.querySelector('body')!.firstChild);
            const { width, height } = fakeBox.getBoundingClientRect();
            fakeBox.remove();
            return { width, height };
        };
        const { width: fakeBoxWidth, height: fakeBoxHeight } = getFakeSize();

        const angle = (degree * Math.PI) / 180;
        const contentArr = this.content().split('\\n');
        const canvasHeight = Math.sin(angle) * fakeBoxWidth + fakeBoxHeight;

        let start = Math.ceil(Math.sin(angle) * fakeBoxWidth * Math.sin(angle));
        const canvasWidth = start + fakeBoxWidth;
        canvas.setAttribute('width', `${canvasWidth + xGutter}`);
        canvas.setAttribute('height', `${canvasHeight + yGutter}`);

        ctx.font = `${parseFloat(`${fontSize}`)}px microsoft yahei`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillStyle = color!;
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
        const watermarkStyle: Record<string, string | number> = {
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
                this.observer.observe(this.wmDiv!, {
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
}
