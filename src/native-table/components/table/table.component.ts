import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ElementRef,
    OnChanges,
    OnInit,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
    booleanAttribute,
    computed,
    effect,
    inject,
    input,
    output,
    signal,
    DestroyRef
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ThyNativeTableStyleService } from '../../services/table-style.service';
import { ThyNativeTableLayout, ThyNativeTableScroll, ThyNativeTableSize, ThyNativeTableTheme } from '../../table.interface';
import { ThyNativeTableBodyComponent } from './tbody.component';
import { ThyNativeTableHeaderComponent } from './thead.component';
import { ThyNativeTableInnerDefaultComponent } from './table-inner-default.component';
import { ThyNativeTableInnerScrollComponent } from './table-inner-scroll.component';
import { UpdateHostClassService } from 'ngx-tethys/core';
import { ThyPagination } from 'ngx-tethys/pagination';
import { ThyPage } from 'ngx-tethys/table';

@Component({
    selector: 'thy-native-table',
    standalone: true,
    exportAs: 'thyNativeTable',
    providers: [ThyNativeTableStyleService, UpdateHostClassService],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div #tableMainElement class="thy-native-table-wrapper">
            <ng-template #contentTemplate>
                <ng-content></ng-content>
            </ng-template>
            @if (scrollY() || scrollX()) {
                <thy-native-table-inner-scroll
                    [data]="thyData()"
                    [scrollX]="scrollX()"
                    [scrollY]="scrollY()"
                    [contentTemplate]="contentTemplate"
                    [listOfColWidth]="listOfAutoColWidth()"
                    [theadTemplate]="theadTemplate()"></thy-native-table-inner-scroll>
            } @else {
                <thy-native-table-inner-default
                    [tableLayout]="thyTableLayout()"
                    [listOfColWidth]="listOfManualColWidth()"
                    [theadTemplate]="theadTemplate()"
                    [contentTemplate]="contentTemplate"></thy-native-table-inner-default>
            }
            @if (thyShowPagination()) {
                <div class="thy-table-footer">
                    <thy-pagination
                        [thyPageIndex]="pagination().index"
                        [thyTotal]="pagination().total"
                        [thyPageSize]="pagination().size"
                        [thyPageSizeOptions]="pagination().sizeOptions"
                        [thyShowSizeChanger]="thyShowSizeChanger()"
                        (thyPageIndexChange)="onPageIndexChange($event)"
                        (thyPageSizeChanged)="onPageSizeChange($event)"></thy-pagination>
                </div>
            }
        </div>
    `,
    host: {
        class: 'thy-native-table',
        '[class.thy-native-table-bordered]': 'thyTheme() === "bordered"',
        '[class.thy-native-table-boxed]': 'thyTheme() === "boxed"'
    },
    imports: [ThyNativeTableInnerDefaultComponent, ThyNativeTableInnerScrollComponent, ThyPagination]
})
export class ThyNativeTableComponent<T = any> implements OnInit, AfterViewInit {
    private elementRef = inject(ElementRef);
    private cdr = inject(ChangeDetectorRef);
    private styleService = inject(ThyNativeTableStyleService);
    private destroyRef = inject(DestroyRef);
    private updateHostClassService = inject(UpdateHostClassService);

    readonly thyTableLayout = input<ThyNativeTableLayout>('auto');
    readonly thySize = input<ThyNativeTableSize>('default');
    readonly thyTheme = input<ThyNativeTableTheme>('default');
    readonly thyData = input<readonly T[]>([]);
    readonly thyRowKey = input<string>('_id');

    readonly thyShowPagination = input<boolean>(true);
    readonly thyPageIndex = input<number>(1);
    readonly thyPageSize = input<number>(20);
    readonly thyPageTotal = input<number>(0);
    readonly thyShowSizeChanger = input<boolean>(false);
    readonly thyPageSizeOptions = input<number[]>([20, 50, 100]);

    readonly thyPageIndexChange = output<number>();
    readonly thyPageSizeChange = output<number>();

    readonly thyScroll = input<ThyNativeTableScroll>({ x: null, y: null });

    readonly thyWidthConfig = input<ReadonlyArray<string | null>>([]);

    public theadTemplate = signal<TemplateRef<any> | null>(null);
    public listOfAutoColWidth = signal<ReadonlyArray<string | null>>([]);
    public listOfManualColWidth = signal<ReadonlyArray<string | null>>([]);
    public pagination = computed<ThyPage | null>(() => {
        if (!this.thyShowPagination()) {
            return null;
        }
        return {
            index: this.thyPageIndex() || this.defaultPagination.index,
            size: this.thyPageSize() || this.defaultPagination.size,
            sizeOptions: this.thyPageSizeOptions() || this.defaultPagination.sizeOptions
        };
    });

    defaultPagination = { index: 1, size: 20, sizeOptions: [20, 50, 100] };

    scrollX = computed(() => this.thyScroll().x || null);
    scrollY = computed(() => this.thyScroll().y || null);

    public data = signal<readonly T[]>([]);

    @ViewChild('tableMainElement') tableMainElement!: ElementRef<HTMLElement>;
    @ContentChild(ThyNativeTableHeaderComponent, { static: false }) headerComponent!: ThyNativeTableHeaderComponent<T>;

    constructor() {
        effect(() => this.updateTableClass());
        effect(() => this.updateScrollConfig());
        effect(() => this.updateWidthConfig());
    }

    ngOnInit(): void {
        const { theadTemplate$, listOfListOfThWidthPx$, manualWidthConfigPx$ } = this.styleService;

        // 监听表头模板变化
        theadTemplate$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(theadTemplate => {
            this.theadTemplate.set(theadTemplate);
            this.cdr.markForCheck();
        });

        // 监听列宽变化
        listOfListOfThWidthPx$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(listOfWidth => {
            this.listOfAutoColWidth.set(listOfWidth);
            this.cdr.markForCheck();
        });

        manualWidthConfigPx$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(listOfWidth => {
            this.listOfManualColWidth.set(listOfWidth);
            this.cdr.markForCheck();
        });
    }

    private setNativeTableClass() {
        const classNames: string[] = [];
        if (this.thySize()) {
            classNames.push(`native-table-${this.thySize()}`);
        }
        if (this.thyTheme()) {
            classNames.push(`native-table-${this.thyTheme()}`);
        }
        if (this.elementRef.nativeElement) {
            this.updateHostClassService.updateClass(classNames);
        }
    }

    public onPageIndexChange(event: number) {
        this.thyPageIndexChange.emit(event);
    }

    public onPageSizeChange(event: number) {
        this.thyPageSizeChange.emit(event);
    }

    ngAfterViewInit(): void {}

    private setScrollOnChanges(): void {
        const scrollX = this.scrollX();
        const scrollY = this.scrollY();
        this.styleService.setScroll(scrollX, scrollY);
    }
    private updateTableClass(): void {
        const size = this.thySize();
        const theme = this.thyTheme();
        if (size || theme) {
            this.styleService.setTableSize(size);
            this.styleService.setTableTheme(theme);
            this.setNativeTableClass();
        }
    }

    private updateScrollConfig(): void {
        const scroll = this.thyScroll();
        if (scroll) {
            this.setScrollOnChanges();
        }
    }

    private updateWidthConfig(): void {
        const widthConfig = this.thyWidthConfig();
        if (widthConfig?.length) {
            this.styleService.setTableWidthConfig(widthConfig);
        }
    }
}
