import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    HostBinding,
    Inject,
    Input,
    NgZone,
    Optional
} from '@angular/core';
import { IThySegmentComponent, THY_SEGMENTED_COMPONENT } from './segment.token';
import { InputBoolean } from 'ngx-tethys/core';
import { assertIconOnly } from 'ngx-tethys/util';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
 * 分段控制器的选项组件
 */
@Component({
    selector: 'thy-segment-item,[thy-segment-item]',
    templateUrl: './segment-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'thy-segment-item'
    }
})
export class ThySegmentItemComponent<TValue = unknown> implements AfterViewInit {
    /**
     * 选项的值
     */
    @Input() thyValue: TValue;

    /**
     * 选项的图标
     */
    @Input() thyIcon: string;

    /**
     * 选项的文本
     */
    @Input() thyLabelText: string;

    /**
     * 是否禁用该选项
     * @default false
     */
    @Input()
    @InputBoolean()
    @HostBinding(`class.disabled`)
    thyDisabled = false;

    public isOnlyIcon: boolean;

    private destroy$ = new Subject<void>();

    constructor(
        public elementRef: ElementRef,
        private ngZone: NgZone,
        private cdr: ChangeDetectorRef,
        @Optional() @Inject(THY_SEGMENTED_COMPONENT) private parent: IThySegmentComponent
    ) {
        ngZone.runOutsideAngular(() =>
            fromEvent(elementRef.nativeElement, 'click')
                .pipe(takeUntil(this.destroy$))
                .subscribe((event: Event) => {
                    if (!this.thyDisabled && !this.parent.thyDisabled && this.parent.selectedItem !== this) {
                        ngZone.run(() => {
                            this.parent.selectedItem.unselect();
                            this.parent.changeSelectedItem(event, this);
                        });
                    }
                })
        );
    }

    ngAfterViewInit(): void {
        this.isOnlyIcon = assertIconOnly(this.elementRef.nativeElement.children[0]) && this.parent.thyMode === 'inline';
        this.cdr.detectChanges();
    }

    public select() {
        this.elementRef.nativeElement.classList.add('active');
    }

    private unselect() {
        this.elementRef.nativeElement.classList.remove('active');
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
