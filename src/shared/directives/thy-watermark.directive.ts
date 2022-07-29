import { Directive, Input, ElementRef, OnDestroy, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { Constructor, MixinBase, mixinUnsubscribe, ThyUnsubscribe } from 'ngx-tethys/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const _MixinBase: Constructor<ThyUnsubscribe> & typeof MixinBase = mixinUnsubscribe(MixinBase);

const MAX_Z_INDEX = 2147483647;

interface canvasConfig {
    width?: string;
    height?: string;
    font?: string;
    fillStyle?: string;
    rotate?: number;
    textLineHeight?: number;
    topStart?: number;
    leftStart?: number;
}

const DEFAULT_WATERMARK_STYLE = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    'pointer-events': 'none',
    'background-repeat': 'repeat',
    'z-index': MAX_Z_INDEX,
    'background-image': ''
};

let DEFAULT_CANVAS_CONFIG = {
    width: '400px',
    height: '200px',
    font: '12px microsoft yahei',
    fillStyle: 'rgba(184, 184, 184, 0.8)',
    rotate: -15,
    textLineHeight: 20,
    topStart: 20,
    leftStart: 0
};

class MutationObserverFactory {
    create(callback: MutationCallback): MutationObserver | null {
        return typeof MutationObserver === 'undefined' ? null : new MutationObserver(callback);
    }
}

@Directive({
    selector: '[thyWatermark]'
})
export class ThyWatermarkDirective extends _MixinBase implements OnInit, OnDestroy, OnChanges {
    @Input() thyWatermarkEnable: boolean;
    @Input() thyMutationObserver: boolean = true;

    @Input()
    set thyWatermark(value: string) {
        this.content = value;
    }
    @Input()
    set thyWatermarkConfig(value: canvasConfig) {
        DEFAULT_CANVAS_CONFIG = { ...DEFAULT_CANVAS_CONFIG, ...value };
    }
    constructor(private el: ElementRef) {
        super();
    }

    content: string;
    observer: MutationObserver;
    ngOnInit() {}

    ngOnChanges(changes: SimpleChanges): void {
        if ('' + changes.thyWatermarkEnable?.currentValue === 'false') return;
        this.canvasWM();
    }

    private canvasWM({ width, height, font, fillStyle, rotate, textLineHeight, topStart, leftStart } = DEFAULT_CANVAS_CONFIG) {
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
            ...DEFAULT_WATERMARK_STYLE,
            'background-image': `url(${canvas.toDataURL()})`
        };

        const styleStr = Object.keys(watermarkStyle).reduce((pre, next) => ((pre += `${next}:${watermarkStyle[next]};`), pre), '');

        watermarkDiv.setAttribute('style', styleStr);
        watermarkDiv.classList.add('__wm');

        const parentNode = this.el.nativeElement;

        !__wm && parentNode.insertBefore(watermarkDiv, parentNode.firstChild);

        this.thyMutationObserver && this.setMutationObserver(parentNode);
    }
    setMutationObserver(container: HTMLElement) {
        const stream = new Subject<MutationRecord[]>();
        this.observer = new MutationObserverFactory().create(mutations => stream.next(mutations));
        if (this.observer) {
            this.observer.observe(container, {
                characterData: true,
                childList: true,
                subtree: true,
                attributes: true
            });
        }
        stream.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(() => {
            const __wm = this.el.nativeElement.querySelector('.__wm');
            if (__wm) {
                this.observer.disconnect();
                this.observer = null;
                this.canvasWM();
            }
        });
    }

    ngOnDestroy(): void {
        this.observer?.disconnect();
        this.observer = null;
    }
}
