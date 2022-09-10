import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    OnInit,
    Optional,
    Output,
    QueryList,
    Renderer2,
    ViewChild,
    TemplateRef,
    ViewEncapsulation,
    AfterContentInit
} from '@angular/core';
import { InputBoolean, InputNumber } from 'ngx-tethys/core';
import { CarouselService } from 'ngx-tethys/carousel/carousel.service';
import { ThyCarouselItemDirective } from 'ngx-tethys/carousel/carousel-item.directive';
import {
    CarouselBasic,
    DistanceVector,
    FromTo,
    THY_CUSTOM_ENGINE,
    ThyCarouselEngineRegistry,
    thyEffectType
} from 'ngx-tethys/carousel/typings';
import { ThyCarouselTransformEngine } from './engine/carousel-transform';
import { Platform } from '@angular/cdk/platform';
interface CarouselMethod {
    pre: () => void;
    next: () => void;
}
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
export class ThyCarouselComponent implements OnInit, AfterViewInit, AfterContentInit {
    @ContentChildren(ThyCarouselItemDirective, { descendants: false, emitDistinctChangesOnly: true })
    carouselItems!: QueryList<ThyCarouselItemDirective>;

    @ViewChild('carouselWrapper', { static: true }) carouselWrapper: ElementRef<HTMLElement>;

    @Input('thyAutoPlay') @InputBoolean() autoPlay: boolean = false;

    @Input('thyAutoPlaySpeed') @InputNumber() speed: number = 3000;

    @Input('thyEffect') effect: thyEffectType = 'slide';

    @Input('thyShowDot') @InputBoolean() showDot = true;

    @Input() thyDotTemplate?: TemplateRef<{ $implicit: boolean }>;

    @Input('thyShowArrow') @InputBoolean() showArrow = true;

    @Input() thyArrowTemplate?: TemplateRef<CarouselMethod>;

    @Input('thyTouchable') @InputBoolean() touchable = true;

    @Output() readonly thyBeforeMode = new EventEmitter<FromTo>();

    context: CarouselMethod;

    isDragging = false;

    isTransitioning = false;

    pointerVector: DistanceVector = { x: 0, y: 0 };

    activeIndex = 0;

    // currentOffset: { x: number; y: number } = { x: 0, y: 0 };

    wrapperEl: HTMLElement;

    wrapperDomRect: DOMRect;

    engine: CarouselBasic;

    playTime: number = 300;

    constructor(
        private carouselService: CarouselService,
        protected renderer: Renderer2,
        private cdr: ChangeDetectorRef,
        private readonly platform: Platform,
        @Optional() @Inject(THY_CUSTOM_ENGINE) private customEngine: ThyCarouselEngineRegistry
    ) {}

    onDrag(event: TouchEvent | MouseEvent) {
        if (!this.isDragging && !this.isTransitioning) {
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

    moveTo(index: number) {
        this.setInitialValue();
        if (this.carouselItems && this.carouselItems.length && !this.isTransitioning) {
            const len = this.carouselItems.length;
            const from = this.activeIndex;
            const to = (index + len) % len;
            this.thyBeforeMode.emit({ from, to });
            this.isTransitioning = true;
            this.engine?.switch(this.activeIndex, index).subscribe(
                () => {
                    this.activeIndex = to;
                    this.markContentActive(this.activeIndex);
                },
                () => {},
                () => {
                    this.isTransitioning = false;
                }
            );
            this.cdr.markForCheck();
        }
    }

    private switchEngine() {
        this.engine = new ThyCarouselTransformEngine(this, this.cdr, this.renderer, this.platform);
    }

    private markContentActive(index: number) {
        this.carouselItems.forEach((carouselContent: ThyCarouselItemDirective, i: number) => {
            carouselContent.isActive = index === i;
        });
        this.cdr.markForCheck();
    }

    setInitialValue() {
        if (this.engine) {
            this.engine.initializeCarouselContents(this.carouselItems);
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

    initContext() {
        this.context = {
            pre: () => {
                this.pre();
            },
            next: () => {
                this.next();
            }
        };
    }

    ngOnInit(): void {
        this.wrapperEl = this.carouselWrapper!.nativeElement;
        this.initContext();
    }

    ngAfterViewInit(): void {
        this.switchEngine();
        this.markContentActive(0);
        this.setInitialValue();
    }

    ngAfterContentInit() {
        this.setInitialValue();
    }
}
