import { Platform } from '@angular/cdk/platform';
import { NgTemplateOutlet } from '@angular/common';
import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    inject,
    NgZone,
    numberAttribute,
    OnDestroy,
    OnInit,
    Renderer2,
    TemplateRef,
    ViewEncapsulation,
    input,
    output,
    viewChild,
    QueryList,
    computed,
    ContentChildren,
    effect
} from '@angular/core';
import { ThyDot } from 'ngx-tethys/dot';
import { ThyIcon } from 'ngx-tethys/icon';
import { coerceBooleanProperty, isNumber, TinyDate } from 'ngx-tethys/util';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { ThyCarouselItemDirective } from './carousel-item.directive';
import { ThyCarouselService } from './carousel.service';
import { ThyCarouselFadeEngine, ThyCarouselNoopEngine, ThyCarouselSlideEngine } from './engine';
import { ThyCarouselEffect, ThyCarouselPause, ThyCarouselSwitchData, ThyCarouselTrigger, ThyDistanceVector } from './typings';
import { IThyCarouselComponent, THY_CAROUSEL_COMPONENT } from './carousel.token';

/**
 * 走马灯组件
 * @name thy-carousel
 */
@Component({
    selector: 'thy-carousel',
    templateUrl: './carousel.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    preserveWhitespaces: false,
    host: {
        class: 'thy-carousel'
    },
    imports: [NgTemplateOutlet, ThyDot, ThyIcon],
    providers: [
        {
            provide: THY_CAROUSEL_COMPONENT,
            useExisting: ThyCarousel
        }
    ]
})
export class ThyCarousel implements IThyCarouselComponent, OnInit, AfterViewInit, AfterContentInit, OnDestroy {
    protected renderer = inject(Renderer2);
    private cdr = inject(ChangeDetectorRef);
    private ngZone = inject(NgZone);
    private readonly carouselService = inject(ThyCarouselService);
    private readonly platform = inject(Platform);

    /**
     * @private
     */
    @ContentChildren(ThyCarouselItemDirective) carouselItems!: QueryList<ThyCarouselItemDirective>;

    /**
     * @private
     */
    readonly carouselWrapper = viewChild<ElementRef<HTMLElement>>('carouselWrapper');

    /**
     * 是否自动切换
     */
    readonly thyAutoPlay = input(false, { transform: coerceBooleanProperty });

    /**
     * 自动切换时间间隔(毫秒)
     */
    readonly thyAutoPlayInterval = input(3000, { transform: numberAttribute });

    /**
     * 切换动画样式
     * @type slide | fade | noop
     */
    readonly thyEffect = input<ThyCarouselEffect>('slide');

    /**
     * 是否显示切换指示器
     */
    readonly thyIndicators = input(true, { transform: coerceBooleanProperty });

    /**
     * 指示器 Item 的渲染模板
     */
    readonly thyIndicatorRender = input<
        TemplateRef<{
            $implicit: boolean;
        }>
    >();

    /**
     * 是否显示左右切换
     */
    readonly thyControls = input(true, { transform: coerceBooleanProperty });

    /**
     * 上一个控制器渲染模板
     */
    readonly thyControlPrev = input<TemplateRef<any>>();

    /**
     * 下一个控制器渲染模板
     */
    readonly thyControlNext = input<TemplateRef<any>>();

    /**
     * 是否支持手势滑动
     */
    readonly thyTouchable = input(true, { transform: coerceBooleanProperty });

    /**
     * 指示点切换的触发条件
     * @type click | hover
     */
    readonly thyTrigger = input<ThyCarouselTrigger>('click');

    /**
     * 鼠标移动到指示器时是否暂停播放
     * @type false | hover
     */
    readonly thyPause = input<ThyCarouselPause>('hover');

    /**
     * 触发切换帧之前，返回 `{from: number, to: number}`
     */
    readonly thyBeforeChange = output<ThyCarouselSwitchData>();

    /**
     * 切换帧之后的回调，返回当前帧索引
     */
    readonly thyAfterChange = output<number>();

    private isDragging = false;

    private isTransitioning = false;

    private pointerVector: ThyDistanceVector = { x: 0, y: 0 };

    readonly engine = computed(() => {
        switch (this.thyEffect()) {
            case 'slide':
                return new ThyCarouselSlideEngine(this, this.cdr, this.renderer, this.platform);

            case 'fade':
                return new ThyCarouselFadeEngine(this, this.cdr, this.renderer, this.platform);

            default:
                return new ThyCarouselNoopEngine(this, this.cdr, this.renderer, this.platform);
        }
    });

    private _trigger$ = new Subject<number | null>();

    private _destroy$ = new Subject<void>();

    wrapperDomRect: DOMRect;

    activeIndex: number = 0;

    wrapperEl: HTMLElement;

    transitionTimer: any = null;

    playTime: number = 400;

    isPause: boolean = false;

    constructor() {
        effect(() => {
            if (this.thyEffect()) {
                this.markContentActive(0);
                this.setInitialValue();
            }
        });

        effect(() => {
            if (this.thyTouchable()) {
                this.renderer.setStyle(this.wrapperEl, 'cursor', this.thyTouchable() ? 'grab' : 'default');
            }
        });

        effect(() => {
            if (!this.thyAutoPlay() || !this.thyAutoPlayInterval()) {
                this.clearScheduledTransition();
            } else {
                this.scheduleNextTransition();
            }
        });
    }

    private moveTo(index: number): void {
        const carouselItems = this.carouselItems;
        if (carouselItems && carouselItems.length && !this.isTransitioning) {
            this.setInitialValue();
            const len = carouselItems.length;
            const from = this.activeIndex;
            const to = (index + len) % len;
            this.thyBeforeChange.emit({ from, to });
            this.isTransitioning = true;
            this.engine()
                ?.switch(index, this.activeIndex)
                .subscribe(
                    () => {
                        this.activeIndex = to;
                        this.markContentActive(this.activeIndex);
                        this.scheduleNextTransition();
                        this.thyAfterChange.emit(this.activeIndex);
                    },
                    () => {},
                    () => {
                        this.isTransitioning = false;
                    }
                );
            this.cdr.markForCheck();
        }
    }

    private markContentActive(index: number) {
        this.activeIndex = index;
        this.cdr.markForCheck();
        this.carouselItems?.forEach((carouselContent: ThyCarouselItemDirective, i: number) => {
            carouselContent.isActive = index === i;
        });
    }

    private setInitialValue(): void {
        if (this.engine() && this.carouselItems) {
            this.engine()?.initializeCarouselContents(this.carouselItems);
        }
    }

    private scheduleNextTransition(): void {
        this.clearScheduledTransition();
        if (this.thyAutoPlay() && !this.isPause) {
            this.transitionTimer = setTimeout(() => {
                this.moveTo(this.activeIndex + 1);
            }, this.thyAutoPlayInterval());
        }
    }

    private clearScheduledTransition(): void {
        if (this.transitionTimer) {
            clearTimeout(this.transitionTimer);
            this.transitionTimer = null;
        }
    }

    onDrag(event: TouchEvent | MouseEvent): void {
        if (!this.isDragging && !this.isTransitioning && this.thyTouchable()) {
            const mouseDownTime = new TinyDate().getTime();
            let mouseUpTime: number;
            this.clearScheduledTransition();
            this.wrapperDomRect = this.wrapperEl.getBoundingClientRect();
            this.carouselService.registerDrag(event).subscribe(
                pointerVector => {
                    this.renderer.setStyle(this.wrapperEl, 'cursor', 'grabbing');
                    this.pointerVector = pointerVector;
                    this.isDragging = true;
                    this.engine()?.dragging(this.pointerVector, this.wrapperDomRect);
                },
                () => {},
                () => {
                    if (this.isDragging) {
                        mouseUpTime = new TinyDate().getTime();
                        const holdDownTime = mouseUpTime - mouseDownTime;
                        // Fast enough to switch to the next frame
                        // or
                        // If the pointerVector is more than one third switch to the next frame
                        if (
                            Math.abs(this.pointerVector.x) > this.wrapperDomRect.width / 3 ||
                            Math.abs(this.pointerVector.x) / holdDownTime >= 1
                        ) {
                            this.moveTo(this.pointerVector.x > 0 ? this.activeIndex - 1 : this.activeIndex + 1);
                        } else {
                            this.moveTo(this.activeIndex);
                        }
                    }
                    this.isDragging = false;
                    this.renderer.setStyle(this.wrapperEl, 'cursor', 'grab');
                }
            );
        }
    }

    indicatorHandleClick(index: number): void {
        if (this.thyTrigger() === 'click') {
            this.moveTo(index);
        }
    }

    indicatorHandleTrigger(index: number): void {
        if (this.thyPause() === 'hover') {
            this.isPause = true;
            this.clearScheduledTransition();
        }
        if (this.thyTrigger() === 'hover') {
            this._trigger$.next(index);
        }
    }

    indicatorHandleLeave() {
        if (this.thyPause() === 'hover') {
            this.isPause = false;
            this.scheduleNextTransition();
        }
    }

    next(): void {
        this.moveTo(this.activeIndex + 1);
    }

    pre(): void {
        this.moveTo(this.activeIndex - 1);
    }

    ngOnInit(): void {
        this.wrapperEl = this.carouselWrapper()!.nativeElement;
        this.ngZone.runOutsideAngular(() => {
            fromEvent(window, 'resize')
                .pipe(takeUntil(this._destroy$), debounceTime(100))
                .subscribe(() => {
                    this.engine()?.correctionOffset();
                });
        });
    }

    ngAfterViewInit(): void {
        this.carouselItems.changes.subscribe(() => {
            this.markContentActive(0);
            this.setInitialValue();
        });
        this.markContentActive(0);
        this.setInitialValue();
        if (!this.thyTouchable()) {
            this.renderer.setStyle(this.wrapperEl, 'cursor', 'default');
        }
    }

    ngAfterContentInit() {
        this._trigger$.pipe(takeUntil(this._destroy$), debounceTime(this.playTime)).subscribe(index => {
            if (isNumber(index)) {
                this.moveTo(index);
            }
        });
    }

    ngOnDestroy() {
        this.clearScheduledTransition();
        this._trigger$.next(null);
        this._trigger$.complete();
        this._destroy$.next();
        this._destroy$.complete();
    }
}
