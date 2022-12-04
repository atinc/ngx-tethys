import { ViewportRuler } from '@angular/cdk/scrolling';
import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    ElementRef,
    Input,
    NgZone,
    OnChanges,
    OnDestroy,
    OnInit,
    QueryList,
    Renderer2,
    SimpleChanges
} from '@angular/core';
import { InputBoolean, InputNumber, MixinBase, mixinUnsubscribe } from 'ngx-tethys/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil, throttleTime } from 'rxjs/operators';
import { ThyGridToken, THY_GRID_COMPONENT } from './grid.token';
import { ThyGridItemComponent } from './thy-grid-item.component';

export type ThyGridResponsiveMode = 'self' | 'screen';

export type ThyGridResponsiveDescription = string;

export const THY_GRID_DEFAULT_COLUMNS = 24;

export const THY_GRID_ITEM_DEFAULT_SPAN = 1;

export const screenBreakpointsMap = {
    xs: 0,
    s: 640,
    m: 1024,
    l: 1280,
    xl: 1536,
    xxl: 1920,
    '2xl': 1920
};

/**
 * 栅格组件
 */
@Component({
    selector: 'thy-grid',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: THY_GRID_COMPONENT,
            useExisting: ThyGridComponent
        }
    ],
    host: {
        class: 'thy-grid'
    }
})
export class ThyGridComponent extends mixinUnsubscribe(MixinBase) implements ThyGridToken, OnChanges, OnInit, AfterContentInit, OnDestroy {
    /**
     * @internal
     */
    @ContentChildren(ThyGridItemComponent) gridItems!: QueryList<ThyGridItemComponent>;

    /**
     * 栅格的列数
     * @default 24
     */
    @Input() thyCols: number | ThyGridResponsiveDescription = THY_GRID_DEFAULT_COLUMNS;

    /**
     * 栅格的水平间隔
     * @default 0
     */
    @Input() thyXGap: number | ThyGridResponsiveDescription = 0;

    /**
     * 栅格的垂直间隔
     * @default 0
     */
    @Input() thyYGap: number | ThyGridResponsiveDescription = 0;

    /**
     * 栅格的水平和垂直间隔
     * @default 0
     */
    @Input() thyGap: number | ThyGridResponsiveDescription = 0;

    /**
     * 响应式栅格列数<br/>
     * self：根据grid的自身宽度进行响应式布局。<br/>
     * screen：根据屏幕断点进行响应式布局。
     * @default self
     */
    @Input() thyResponsive: ThyGridResponsiveMode = 'self';

    /**
     * 是否响应式栅格项的宽度或偏移
     * @default false
     */
    @Input() @InputBoolean() thyItemResponsive: boolean;

    /**
     * 是否折叠栅格
     * @default false
     */
    @Input() @InputBoolean() thyCollapsed: boolean;

    /**
     * 折叠后展示的行数
     * @default 1
     */
    @Input() @InputNumber() thyCollapsedRows: number = 1;

    private cols: number;

    public xGap: number;

    private yGap: number;

    private numRegex = /^\d+$/;

    private responsiveContainerWidth: number;

    public gridItemPropValueChange$ = new Subject<void>();

    public overflow: boolean = false;

    get isResponsive() {
        return (
            this.thyItemResponsive ||
            !this.numRegex.test(this.thyCols?.toString().trim()) ||
            !this.numRegex.test(this.thyGap?.toString().trim()) ||
            !this.numRegex.test(this.thyXGap?.toString().trim()) ||
            !this.numRegex.test(this.thyYGap?.toString().trim())
        );
    }

    constructor(private elementRef: ElementRef, private renderer: Renderer2, private viewportRuler: ViewportRuler, private ngZone: NgZone) {
        super();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (
            (changes.thyCollapsed && !changes.thyCollapsed.firstChange) ||
            (changes.thyCollapsedRows && !changes.thyCollapsedRows.firstChange)
        ) {
            this.handleGridItems();
        }
    }

    ngOnInit(): void {
        this.setGridStyle();

        if (this.isResponsive) {
            this.listenResizeEvent();
        }
    }

    ngAfterContentInit(): void {
        this.handleGridItems();

        this.gridItems.changes.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(() => {
            Promise.resolve().then(() => {
                this.handleGridItems();
            });
        });
    }

    private setGridStyle() {
        this.cols = this.calculateActualValue(this.thyCols || THY_GRID_DEFAULT_COLUMNS, THY_GRID_DEFAULT_COLUMNS);
        if (!this.thyXGap && !this.thyYGap) {
            this.xGap = this.calculateActualValue(this.thyGap || 0);
            this.yGap = this.xGap;
        } else {
            this.xGap = this.calculateActualValue(this.thyXGap || this.thyGap || 0);
            this.yGap = this.calculateActualValue(this.thyYGap || this.thyGap || 0);
        }

        const gridElement = this.elementRef.nativeElement;
        this.renderer.setStyle(gridElement, 'display', 'grid');
        this.renderer.setStyle(gridElement, 'grid-template-columns', `repeat(${this.cols}, minmax(0, 1fr))`);
        this.renderer.setStyle(gridElement, 'gap', `${this.yGap}px ${this.xGap}px`);
    }

    private listenResizeEvent() {
        if (this.thyResponsive === 'screen') {
            this.viewportRuler
                .change(100)
                .pipe(takeUntil(this.ngUnsubscribe$))
                .subscribe(() => {
                    this.responsiveContainerWidth = this.viewportRuler.getViewportSize().width;
                    this.setGridStyle();
                    this.handleGridItems();
                });
        } else {
            this.ngZone.runOutsideAngular(() => {
                this.gridResizeObservable(this.elementRef.nativeElement)
                    .pipe(throttleTime(100), takeUntil(this.ngUnsubscribe$))
                    .subscribe(data => {
                        this.responsiveContainerWidth = data[0]?.contentRect?.width;
                        this.setGridStyle();
                        this.handleGridItems();
                    });
            });
        }
    }

    private handleGridItems() {
        let suffixSpan: number = 0;
        const hasSuffix: boolean = this.gridItems.last && this.gridItems.last.thySuffix;

        if (hasSuffix) {
            const suffix = this.gridItems.last;
            const rawSpan = getRawSpan(suffix.thySpan);
            const span = this.calculateActualValue(rawSpan, THY_GRID_ITEM_DEFAULT_SPAN);
            const offset = this.calculateActualValue(suffix.thyOffset || 0);
            suffixSpan = Math.min(span + offset, this.cols);

            suffix.span = suffixSpan;
            suffix.offset = offset;
            suffix.isShow = suffix.span === 0 ? false : true;
            suffix.suffixColStart = this.cols + 1 - suffixSpan;
        }

        let spanCounter = 0;
        let overflow = false;
        this.gridItems.forEach((gridItem: ThyGridItemComponent, index: number) => {
            if (hasSuffix && index === this.gridItems.length - 1) {
                return;
            }

            if (overflow) {
                gridItem.isShow = false;
            } else {
                const rawSpan = getRawSpan(gridItem.thySpan);
                const span = this.calculateActualValue(rawSpan, THY_GRID_ITEM_DEFAULT_SPAN);
                const offset = this.calculateActualValue(gridItem.thyOffset || 0);

                gridItem.span = Math.min(span + offset, this.cols);
                gridItem.offset = offset;
                if (gridItem.span === 0) {
                    gridItem.isShow = false;
                    return;
                }

                if (this.thyCollapsed) {
                    const remainder = spanCounter % this.cols;
                    if (remainder + gridItem.span > this.cols) {
                        spanCounter += this.cols - remainder;
                    }
                    if (spanCounter + gridItem.span + suffixSpan > this.thyCollapsedRows * this.cols) {
                        overflow = true;
                        gridItem.isShow = false;
                    } else {
                        spanCounter += gridItem.span;
                        gridItem.isShow = true;
                    }
                } else {
                    gridItem.isShow = true;
                }
            }
        });

        this.overflow = overflow;
        this.gridItemPropValueChange$.next();
    }

    private calculateActualValue(rawValue: number | ThyGridResponsiveDescription, defaultValue?: number): number {
        if (this.numRegex.test(rawValue.toString().trim())) {
            return Number(rawValue);
        } else {
            const responsiveValueMap = this.getResponsiveValueMap(rawValue as ThyGridResponsiveDescription);
            const breakpointKeys = Object.keys(responsiveValueMap);
            const breakpoint = this.calculateBreakPoint(breakpointKeys);

            if (breakpoint) {
                return responsiveValueMap[breakpoint];
            } else if (breakpointKeys.includes('0')) {
                return responsiveValueMap['0'];
            } else {
                return defaultValue || 0;
            }
        }
    }

    private getResponsiveValueMap(responsiveValue: string): { [key: string]: number } {
        return responsiveValue.split(' ').reduce((map: { [key: string]: number }, item: string) => {
            if (this.numRegex.test(item.toString())) {
                item = `0:${item}`;
            }
            const [key, value] = item.split(':');
            map[key] = Number(value);
            return map;
        }, {});
    }

    private calculateBreakPoint(breakpointKeys: string[]): string {
        if (this.thyResponsive === 'screen') {
            const width = this.responsiveContainerWidth || this.viewportRuler.getViewportSize().width;
            return breakpointKeys.find((key: string, index: number) => {
                return index < breakpointKeys.length - 1
                    ? width >= screenBreakpointsMap[key] && width < screenBreakpointsMap[breakpointKeys[index + 1]]
                    : width >= screenBreakpointsMap[key];
            });
        } else {
            const width = this.responsiveContainerWidth || this.elementRef.nativeElement.getBoundingClientRect().width;
            return breakpointKeys.find((key: string, index: number) => {
                return index < breakpointKeys.length - 1
                    ? width >= Number(key) && width < Number(breakpointKeys[index + 1])
                    : width >= Number(key);
            });
        }
    }

    private gridResizeObservable(element: HTMLElement): Observable<ResizeObserverEntry[]> {
        return new Observable(observer => {
            const resize = new ResizeObserver((entries: ResizeObserverEntry[]) => {
                observer.next(entries);
            });
            resize.observe(element);
            return () => {
                resize.disconnect();
            };
        });
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}

function getRawSpan(span: number | ThyGridResponsiveDescription | undefined | null): number | ThyGridResponsiveDescription {
    return span === undefined || span === null ? THY_GRID_ITEM_DEFAULT_SPAN : span;
}
