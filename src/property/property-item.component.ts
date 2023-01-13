import { InputBoolean, InputNumber, ThyClickDispatcher } from 'ngx-tethys/core';
import { fromEvent, Subject } from 'rxjs';
import { filter, skip, take, takeUntil, tap } from 'rxjs/operators';
import { OverlayOutsideClickDispatcher, OverlayRef } from '@angular/cdk/overlay';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ElementRef,
    HostBinding,
    Input,
    NgZone,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
    SkipSelf,
    TemplateRef,
    ViewChild
} from '@angular/core';
import { ThyPropertiesComponent } from './properties.component';

export type ThyPropertyItemOperationTrigger = 'hover' | 'always';

/**
 * 属性组件
 * @name thy-property-item
 */
@Component({
    selector: 'thy-property-item',
    templateUrl: './property-item.component.html',
    host: {
        class: 'thy-property-item',
        '[class.thy-property-item-operational]': '!!operation',
        '[class.thy-property-item-operational-hover]': "thyOperationTrigger === 'hover'"
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThyPropertyItemComponent implements OnInit, OnChanges, OnDestroy {
    /**
     * 属性名称
     * @type sting
     * @default thyLabelText
     */
    @Input() thyLabelText: string;

    /**
     * 设置属性是否是可编辑的
     * @type sting
     * @default false
     */
    @Input() @InputBoolean() thyEditable: boolean;

    /**
     * 设置跨列的数量
     * @type sting
     * @default 1
     */
    @Input() @InputNumber() thySpan: number = 1;

    /**
     * 设置属性操作现实触发方式，默认 always 一直显示
     * @type 'hover' | 'always'
     * @default always
     */
    @Input() thyOperationTrigger: ThyPropertyItemOperationTrigger = 'always';

    /**
     * 属性名称自定义模板
     * @type TemplateRef
     */
    @ContentChild('label', { static: true }) label!: TemplateRef<void>;

    /**
     * 属性内容编辑模板，只有在 thyEditable 为 true 时生效
     * @type TemplateRef
     */
    @ContentChild('editor', { static: true }) editor!: TemplateRef<void>;

    /**
     * 操作区模板
     * @type TemplateRef
     */
    @ContentChild('operation', { static: true }) operation!: TemplateRef<void>;

    /**
     * @private
     */
    @ViewChild('contentTemplate', { static: true }) content!: TemplateRef<void>;

    /**
     * @private
     */
    @ViewChild('editorContainer', { static: false }) editorContainer: ElementRef;

    editing: boolean;

    changes$ = new Subject<SimpleChanges>();

    private destroy$ = new Subject();

    private eventDestroy$ = new Subject();

    private originOverlays: OverlayRef[] = [];

    @HostBinding('style.grid-column')
    get gridColumn() {
        return `span ${Math.min(this.thySpan, this.parent.thyColumn)}`;
    }

    isVertical = false;

    constructor(
        private cdr: ChangeDetectorRef,
        private clickDispatcher: ThyClickDispatcher,
        private elementRef: ElementRef,
        private ngZone: NgZone,
        private overlayOutsideClickDispatcher: OverlayOutsideClickDispatcher,
        private parent: ThyPropertiesComponent
    ) {
        this.originOverlays = [...this.overlayOutsideClickDispatcher._attachedOverlays] as OverlayRef[];
    }

    ngOnInit() {
        this.subscribeClick();
        this.parent.layout$.pipe(takeUntil(this.destroy$)).subscribe(layout => {
            this.isVertical = layout === 'vertical';
            this.cdr.markForCheck();
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.thyEditable && changes.thyEditable.currentValue) {
            this.subscribeClick();
        } else {
            this.eventDestroy$.next();
            this.eventDestroy$.complete();
        }
    }

    setEditing(editing: boolean) {
        this.ngZone.run(() => {
            this.editing = editing;
            this.cdr.markForCheck();
        });
    }

    /**
     * @deprecated please use setEditing(editing: boolean)
     */
    setKeepEditing(keep: boolean) {
        this.setEditing(keep);
    }

    private hasOverlay() {
        return this.overlayOutsideClickDispatcher._attachedOverlays.length > this.originOverlays.length;
    }

    private subscribeClick() {
        if (this.thyEditable === true) {
            this.ngZone.runOutsideAngular(() => {
                fromEvent(this.elementRef.nativeElement, 'click')
                    .pipe(takeUntil(this.eventDestroy$))
                    .subscribe(() => {
                        this.setEditing(true);
                        if (this.editorContainer) {
                            this.bindEditorBlurEvent(this.editorContainer.nativeElement);
                        }
                    });
            });
        }
    }

    private subscribeOverlayClick() {
        const newOpenedOverlays = this.overlayOutsideClickDispatcher._attachedOverlays.slice(this.originOverlays.length);

        this.clickDispatcher
            .clicked(0)
            .pipe(
                skip(1),
                filter(event => {
                    return (
                        newOpenedOverlays.findIndex(overlay => {
                            return overlay.overlayElement.contains(event.target as HTMLElement);
                        }) < 0
                    );
                }),
                take(1),
                takeUntil(this.destroy$)
            )
            .subscribe(() => {
                if (!this.hasOverlay()) {
                    this.setEditing(false);
                }
            });
    }

    private subscribeDocumentClick(editorElement: HTMLElement) {
        this.clickDispatcher
            .clicked(0)
            .pipe(
                filter(event => {
                    return !editorElement.contains(event.target as HTMLElement);
                }),
                take(1),
                takeUntil(this.destroy$)
            )
            .subscribe(() => {
                this.setEditing(false);
            });
    }

    private bindEditorBlurEvent(editorElement: HTMLElement) {
        if (this.hasOverlay()) {
            this.subscribeOverlayClick();
        } else {
            this.subscribeDocumentClick(editorElement);
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
