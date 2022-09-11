import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    QueryList,
    Renderer2,
    ViewChild,
    TemplateRef,
    ViewEncapsulation,
    AfterContentInit,
    OnChanges,
    SimpleChanges
} from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { InputBoolean, InputNumber } from '../core';
import { CarouselService } from './carousel.service';
import { ThyCarouselItemDirective } from './carousel-item.directive';
import { ThyCarouselEngine, DistanceVector, FromTo, thyEffectType, CarouselMethod } from './typings';
import { ThyCarouselSlideEngine, ThyCarouselNoopEngine, ThyCarouselFadeEngine } from './engine';
@Component({
    selector: 'thy-carousel',
    templateUrl: './carousel.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    preserveWhitespaces: false,
    host: {
        class: 'thy-carousel'
    }
})
export class ThyCarouselComponent implements OnInit, AfterViewInit, AfterContentInit, OnChanges {
    @ContentChildren(ThyCarouselItemDirective) carouselItems!: QueryList<ThyCarouselItemDirective>;

    @ViewChild('carouselWrapper', { static: true }) carouselWrapper: ElementRef<HTMLElement>;

    @Input() @InputBoolean() thyAutoPlay: boolean = false;

    @Input() @InputNumber() thyAutoPlaySpeed: number = 3000;

    @Input() thyEffect: thyEffectType = 'slide';

    @Input('thyShowDot') @InputBoolean() showDot = true;

    @Input() thyDotTemplate?: TemplateRef<{ $implicit: boolean }>;

    @Input('thyShowArrow') @InputBoolean() showArrow = true;

    @Input() thyArrowTemplate?: TemplateRef<CarouselMethod>;

    @Input() @InputBoolean() thyTouchable = true;

    @Output() readonly thyBeforeChange = new EventEmitter<FromTo>();

    @Output() readonly thyAfterChange = new EventEmitter<number>();

    private isDragging = false;

    private isTransitioning = false;

    private pointerVector: DistanceVector = { x: 0, y: 0 };

    private engine: ThyCarouselEngine;

    context: CarouselMethod;

    wrapperDomRect: DOMRect;

    activeIndex = 0;

    wrapperEl: HTMLElement;

    transitionTimer: any = null;

    playTime: number = 400;

    constructor(
        private carouselService: CarouselService,
        protected renderer: Renderer2,
        private cdr: ChangeDetectorRef,
        private readonly platform: Platform
    ) {}

    private moveTo(index: number): void {
        this.setInitialValue();
        if (this.carouselItems && this.carouselItems.length && !this.isTransitioning) {
            const len = this.carouselItems.length;
            const from = this.activeIndex;
            const to = (index + len) % len;
            this.thyBeforeChange.emit({ from, to });
            this.isTransitioning = true;
            this.engine?.switch(index, this.activeIndex).subscribe(
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

    private switchEngine(): void {
        switch (this.thyEffect) {
            case 'slide':
                this.engine = new ThyCarouselSlideEngine(this, this.cdr, this.renderer, this.platform);
                break;
            case 'fade':
                this.engine = new ThyCarouselFadeEngine(this, this.cdr, this.renderer, this.platform);
                break;
            default:
                this.engine = new ThyCarouselNoopEngine(this, this.cdr, this.renderer, this.platform);
        }
    }

    private markContentActive(index: number) {
        this.carouselItems.forEach((carouselContent: ThyCarouselItemDirective, i: number) => {
            carouselContent.isActive = index === i;
        });
        this.cdr.markForCheck();
    }

    private setInitialValue(): void {
        if (this.engine) {
            this.engine.initializeCarouselContents(this.carouselItems);
        }
    }

    private initContext(): void {
        this.context = {
            pre: () => {
                this.pre();
            },
            next: () => {
                this.next();
            }
        };
    }

    private scheduleNextTransition(): void {
        this.clearScheduledTransition();
        if (this.thyAutoPlay) {
            this.transitionTimer = setTimeout(() => {
                this.moveTo(this.activeIndex + 1);
            }, this.thyAutoPlaySpeed);
        }
    }

    private clearScheduledTransition(): void {
        if (this.transitionTimer) {
            clearTimeout(this.transitionTimer);
            this.transitionTimer = null;
        }
    }

    onDrag(event: TouchEvent | MouseEvent): void {
        if (!this.isDragging && !this.isTransitioning && this.thyTouchable) {
            this.clearScheduledTransition();
            const mouseDownTime = new Date().getTime();
            let mouseUpTime: number;
            this.wrapperDomRect = this.wrapperEl.getBoundingClientRect();
            this.carouselService.registerDrag(event).subscribe(
                pointerVector => {
                    this.pointerVector = pointerVector;
                    this.isDragging = true;
                    this.engine?.dragging(this.pointerVector, this.wrapperDomRect);
                },
                () => {},
                () => {
                    if (this.isDragging) {
                        mouseUpTime = new Date().getTime();
                        const holdDownTime = mouseUpTime - mouseDownTime;
                        // Fast enough to switch to the next frame
                        // or
                        // If the pointerVector is more than one third switch to the next frame
                        if (
                            Math.abs(this.pointerVector.x) / holdDownTime >= 1 ||
                            Math.abs(this.pointerVector.x) > this.wrapperDomRect.width / 3
                        ) {
                            this.moveTo(this.pointerVector.x > 0 ? this.activeIndex - 1 : this.activeIndex + 1);
                        } else {
                            this.moveTo(this.activeIndex);
                        }
                    }
                    this.isDragging = false;
                }
            );
        }
    }

    dotHandleClick(index: number): void {
        this.moveTo(index);
    }

    next(): void {
        this.moveTo(this.activeIndex + 1);
    }

    pre(): void {
        this.moveTo(this.activeIndex - 1);
    }

    ngOnInit(): void {
        this.wrapperEl = this.carouselWrapper!.nativeElement;
        this.initContext();
        this.carouselService.registerResize().subscribe(() => {
            this.engine?.correctionOffset();
        });
    }
    ngOnChanges(changes: SimpleChanges) {
        if (!this.thyAutoPlay || !this.thyAutoPlaySpeed) {
            this.clearScheduledTransition();
        } else {
            this.scheduleNextTransition();
        }
        this.setInitialValue();
    }

    ngAfterViewInit(): void {
        this.switchEngine();
        this.markContentActive(0);
        this.setInitialValue();

        Promise.resolve().then(() => {
            this.setInitialValue();
        });
    }

    ngAfterContentInit() {}
}
