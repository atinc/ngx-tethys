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
    ViewEncapsulation
} from '@angular/core';
import { InputBoolean, InputNumber } from 'ngx-tethys/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CarouselService } from 'ngx-tethys/carousel/carousel.service';
import { ThyCarouselItemDirective } from 'ngx-tethys/carousel/carousel-item.directive';
import { CarouselBasic, DistanceVector, FromTo, THY_CUSTOM_ENGINE, ThyCarouselEngineRegistry } from 'ngx-tethys/carousel/typings';
import { ThyCarouselTransformEngine } from './engine/carousel-transform';
import { Platform } from '@angular/cdk/platform';

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
export class ThyCarouselComponent implements OnInit, AfterViewInit {
    isDragging = false;
    isTransitioning = false;

    pointerVector: DistanceVector = { x: 0, y: 0 };

    activeIndex = 0;

    // currentOffset: { x: number; y: number } = { x: 0, y: 0 };

    wrapperEl: HTMLElement;

    wrapperDomRect: DOMRect;

    engine: CarouselBasic;

    @ContentChildren(ThyCarouselItemDirective, { descendants: false, emitDistinctChangesOnly: true })
    carouselItems!: QueryList<ThyCarouselItemDirective>;

    private carouselItemList: ThyCarouselItemDirective[];

    @ViewChild('carouselWrapper', { static: true }) carouselWrapper: ElementRef<HTMLElement>;

    @Input('thyAutoPlay') @InputBoolean() autoPlay: boolean = false;

    @Input('thyAutoPlaySpeed') @InputNumber() speed: number = 3000;

    @Input('thyPlayTime') @InputNumber() playTime: number = 300;

    @Output() readonly thyBeforeMode = new EventEmitter<FromTo>();

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
            // todo isDragging can't trigger
            console.log(`onDrag`, this.activeIndex);
            this.carouselService.registerDrag(event).subscribe(
                pointerVector => {
                    this.pointerVector = pointerVector;
                    this.isDragging = true;
                    this.engine?.dragging(this.pointerVector, this.wrapperDomRect);
                    // console.log(pointerVector, this.isDragging);
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
        console.log(index);
        if (this.carouselItems && this.carouselItems.length && !this.isTransitioning) {
            const len = this.carouselItems.length;
            const from = this.activeIndex;
            const to = (index + len) % len;
            this.thyBeforeMode.emit({ from, to });
            this.isTransitioning = true;
            // this.currentOffset.x = -index * this.wrapperDomRect.width;
            this.engine?.switch(this.activeIndex, index).subscribe(
                () => {
                    this.activeIndex = to;
                    this.markContentActive(this.activeIndex);
                },
                () => {},
                () => {
                    console.log(this.activeIndex);
                    this.isTransitioning = false;
                }
            );
        }
        this.cdr.markForCheck();
    }

    private contentChanges = (val: QueryList<ThyCarouselItemDirective>) => {
        this.carouselItemList = val.map((carouselContent: ThyCarouselItemDirective, index: number) => {
            carouselContent.activeIndex = index;
            carouselContent.classNames = '';
            return carouselContent;
        });
    };

    private switchEngine() {
        console.log(this.customEngine);
        this.engine = new ThyCarouselTransformEngine(this, this.cdr, this.renderer, this.platform);
        console.log(this.engine);
    }

    private markContentActive(index: number) {
        this.carouselItems.forEach((carouselContent: ThyCarouselItemDirective, i: number) => {
            carouselContent.isActive = index === i;
        });
        this.cdr.markForCheck();
    }

    // calcLoopedCarouselItem() {
    //     // todo 如果循环标识是 false 直接 return
    // }

    contentInit() {
        console.log(`1ffff11`);
        this.engine.initializeCarouselContents(this.carouselItems).subscribe(contents => {
            console.log(`接收一个list`, contents);
            console.log('初始化列表之后');
        });
    }

    ngOnInit(): void {
        this.wrapperEl = this.carouselWrapper!.nativeElement;
    }

    ngAfterViewInit(): void {
        // console.log(`fdsafdsa`)
        this.carouselItems.changes.subscribe(() => {
            console.log(`fdsafdsa`);
            // this.markContentActive(0);
            // this.contentInit();
        });
        this.switchEngine();
        this.markContentActive(0);
        console.log('初始化列表之前');
        this.contentInit();
    }
}
