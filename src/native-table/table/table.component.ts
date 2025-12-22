import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnInit,
    TemplateRef,
    computed,
    effect,
    inject,
    input,
    output,
    signal,
    DestroyRef
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ThyNativeTableStyleService } from '../services/table-style.service';
import { ThyNativeTableLayout, ThyNativeTableScroll, ThyNativeTableSize, ThyNativeTableTheme } from '../table.interface';
import { ThyNativeTableInnerDefaultComponent } from './table-inner-default.component';
import { ThyNativeTableInnerScrollComponent } from './table-inner-scroll.component';
import { UpdateHostClassService } from 'ngx-tethys/core';
import { ThyPagination } from 'ngx-tethys/pagination';
import { ThyPage, ThyTableEmptyOptions } from 'ngx-tethys/table';

@Component({
    selector: 'thy-native-table',
    standalone: true,
    exportAs: 'thyNativeTable',
    providers: [ThyNativeTableStyleService, UpdateHostClassService],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './table.component.html',
    host: {
        class: 'thy-native-table'
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
    readonly thySize = input<ThyNativeTableSize>('md');
    readonly thyTheme = input<ThyNativeTableTheme>('default');

    readonly thyData = input<readonly T[]>([]);

    readonly thyShowPagination = input<boolean>(false);
    readonly thyPageIndex = input<number>(1);
    readonly thyPageSize = input<number>(20);
    readonly thyPageTotal = input<number>(0);
    readonly thyShowSizeChanger = input<boolean>(false);
    readonly thyPageSizeOptions = input<number[]>([20, 50, 100]);

    readonly thyPageIndexChange = output<number>();
    readonly thyPageSizeChange = output<number>();

    readonly thyScroll = input<ThyNativeTableScroll>({ x: null, y: null });

    readonly thyEmptyOptions = input<ThyTableEmptyOptions | null>(null);

    /** data for ngFor tr */
    public data = computed<readonly T[]>(() => this.thyData());

    public theadTemplate = signal<TemplateRef<any> | null>(null);
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

    constructor(private tableElementRef: ElementRef) {
        effect(() => {
            this.updateTableClass();
            this.styleService.setEmptyOptions(this.thyEmptyOptions());
        });
        effect(() => {
            const showEmpty = this.thyData()?.length === 0;
            this.styleService.setShowEmpty(showEmpty);
        });
        effect(() => {
            this.theadTemplate.set(this.styleService.theadTemplate());
        });
    }

    ngOnInit(): void {
        this.updateHostClassService.initializeElement(this.tableElementRef.nativeElement);
        const { listOfThWidthConfigPx$ } = this.styleService;
        listOfThWidthConfigPx$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(listOfWidth => {
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

    private updateTableClass(): void {
        const size = this.thySize();
        const theme = this.thyTheme();
        if (size || theme) {
            this.styleService.setTableSize(size);
            this.styleService.setTableTheme(theme);
            this.setNativeTableClass();
        }
    }
}
