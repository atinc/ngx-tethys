import { ViewportRuler } from '@angular/cdk/scrolling';
import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    Directive,
    ElementRef,
    Input,
    NgZone,
    OnChanges,
    OnInit,
    QueryList,
    SimpleChanges,
    inject
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, Subject } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { ThyGridToken, THY_GRID_COMPONENT } from './grid.token';
import { ThyGridItemComponent } from './thy-grid-item.component';
import { useHostRenderer } from '@tethys/cdk/dom';
import { hasLaterChange } from 'ngx-tethys/util';

export type ThyGridResponsiveMode = 'none' | 'self' | 'screen';

export type ThyGridResponsiveDescription = string;

export const THY_GRID_DEFAULT_COLUMNS = 24;

export const THY_GRID_ITEM_DEFAULT_SPAN = 1;

export const screenBreakpointsMap = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200
};

/**
 * 栅格组件
 * @name thy-grid, [thyGrid]
 * @order 10
 */
@Directive({
    selector: '[thyGrid]',
    providers: [
        {
            provide: THY_GRID_COMPONENT,
            useExisting: ThyGrid
        }
    ],
    host: {
        class: 'thy-grid'
    },
    standalone: true
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class ThyGrid implements ThyGridToken, OnInit, OnChanges, AfterContentInit {
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
     */
    @Input() thyXGap: number | ThyGridResponsiveDescription = 0;

    /**
     * 栅格的垂直间隔
     */
    @Input() thyYGap: number | ThyGridResponsiveDescription = 0;

    /**
     * 栅格的水平和垂直间隔
     */
    @Input() thyGap: number | ThyGridResponsiveDescription = 0;

    /**
     * 响应式栅格列数<br/>
     * none: 不进行响应式布局。<br/>
     * self：根据grid的自身宽度进行响应式布局。<br/>
     * screen：根据屏幕断点进行响应式布局，目前预设了5种响应式尺寸：`xs: 0, sm: 576, md: 768, lg: 992, xl: 1200`。
     */
    @Input() thyResponsive: ThyGridResponsiveMode = 'none';

    private hostRenderer = useHostRenderer();

    private cols: number;

    public xGap: number;

    private yGap: number;

    private numRegex = /^\d+$/;

    private responsiveContainerWidth: number;

    public gridItemPropValueChange$ = new Subject<void>();

    private takeUntilDestroyed = takeUntilDestroyed();

    constructor(private elementRef: ElementRef, private viewportRuler: ViewportRuler, private ngZone: NgZone) {}

    ngOnInit(): void {
        this.setGridStyle();

        if (this.thyResponsive !== 'none') {
            this.listenResizeEvent();
        }
    }

    ngOnChanges(changes: SimpleChanges): void {}

    ngAfterContentInit(): void {
        this.handleGridItems();

        this.gridItems.changes.pipe(this.takeUntilDestroyed).subscribe(() => {
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
            this.xGap = this.calculateActualValue(this.thyXGap || this.thyGap);
            this.yGap = this.calculateActualValue(this.thyYGap || this.thyGap);
        }

        this.hostRenderer.setStyle('display', 'grid');
        this.hostRenderer.setStyle('grid-template-columns', `repeat(${this.cols}, minmax(0, 1fr))`);
        this.hostRenderer.setStyle('gap', `${this.yGap}px ${this.xGap}px`);
    }

    private listenResizeEvent() {
        if (this.thyResponsive === 'screen') {
            this.viewportRuler
                .change(100)
                .pipe(this.takeUntilDestroyed)
                .subscribe(() => {
                    this.responsiveContainerWidth = this.viewportRuler.getViewportSize().width;
                    this.setGridStyle();
                    this.handleGridItems();
                });
        } else {
            this.ngZone.runOutsideAngular(() => {
                this.gridResizeObserver(this.elementRef.nativeElement)
                    .pipe(throttleTime(100), this.takeUntilDestroyed)
                    .subscribe(data => {
                        this.responsiveContainerWidth = data[0]?.contentRect?.width;
                        this.setGridStyle();
                        this.handleGridItems();
                    });
            });
        }
    }

    private handleGridItems() {
        this.gridItems.forEach((gridItem: ThyGridItemComponent) => {
            const rawSpan = getRawSpan(gridItem.thySpan);
            const span = this.calculateActualValue(rawSpan, THY_GRID_ITEM_DEFAULT_SPAN);
            const offset = this.calculateActualValue(gridItem.thyOffset || 0);

            gridItem.span = Math.min(span + offset, this.cols);
            gridItem.offset = offset;
        });

        this.gridItemPropValueChange$.next();
    }

    private calculateActualValue(rawValue: number | ThyGridResponsiveDescription, defaultValue?: number): number {
        if (this.numRegex.test(rawValue.toString().trim())) {
            return Number(rawValue);
        } else {
            const responsiveValueMap = this.getResponsiveValueMap(rawValue as ThyGridResponsiveDescription);
            const breakpointKeys = Object.keys(responsiveValueMap);
            const breakpoint = this.calculateBreakPoint(breakpointKeys);

            if (this.thyResponsive !== 'none' && breakpoint) {
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

    private gridResizeObserver(element: HTMLElement): Observable<ResizeObserverEntry[]> {
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
}

/**
 * @internal
 */
@Component({
    selector: 'thy-grid',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ThyGrid],
    providers: [
        {
            provide: THY_GRID_COMPONENT,
            useExisting: ThyGrid
        }
    ],
    hostDirectives: [
        {
            directive: ThyGrid,
            inputs: ['thyCols', 'thyXGap', 'thyYGap', 'thyGap', 'thyResponsive']
        }
    ]
})
export class ThyGridComponent {
    grid = inject(ThyGrid);
}

function getRawSpan(span: number | ThyGridResponsiveDescription | undefined | null): number | ThyGridResponsiveDescription {
    return span === undefined || span === null ? THY_GRID_ITEM_DEFAULT_SPAN : span;
}
