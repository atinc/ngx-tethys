import { InputBoolean, InputNumber, ThyClickDispatcher } from 'ngx-tethys/core';
import { fromEvent, Subject } from 'rxjs';
import { filter, skip, take, takeUntil, tap } from 'rxjs/operators';

import { OverlayOutsideClickDispatcher } from '@angular/cdk/overlay';
import { OverlayReference } from '@angular/cdk/overlay/overlay-reference';
import {
    ChangeDetectorRef,
    Component,
    ContentChild,
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

/**
 * 属性组件
 * @name thy-property-item
 */
@Component({
    selector: 'thy-property-item',
    template: `
        <ng-template>
            <ng-content></ng-content>
        </ng-template>
    `
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
     * @private
     */
    @ViewChild(TemplateRef, { static: true }) content!: TemplateRef<void>;

    editing: boolean;

    // 适配布局时通过计算动态设置的 span 值
    computedSpan: number;

    changes$ = new Subject<SimpleChanges>();

    private destroy$ = new Subject();

    private originOverlays: OverlayReference[] = [];

    constructor(
        @SkipSelf() protected parentCdr: ChangeDetectorRef,
        private thyClickDispatcher: ThyClickDispatcher,
        private ngZone: NgZone,
        private overlayOutsideClickDispatcher: OverlayOutsideClickDispatcher
    ) {
        this.originOverlays = [...this.overlayOutsideClickDispatcher._attachedOverlays];
    }

    ngOnInit() {}

    ngOnChanges(changes: SimpleChanges): void {
        this.changes$.next(changes);
    }

    setEditing(editing: boolean) {
        this.ngZone.run(() => {
            this.editing = editing;
            this.parentCdr.markForCheck();
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

    private subscribeOverlayClick() {
        const newOpenedOverlays = this.overlayOutsideClickDispatcher._attachedOverlays.slice(this.originOverlays.length);

        this.thyClickDispatcher
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
                this.setEditing(false);
            });
    }

    private subscribeDocumentClick(editorElement: HTMLElement) {
        this.thyClickDispatcher
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

    editorClick(editorElement: HTMLElement) {
        return fromEvent(editorElement, 'click').pipe(
            tap(() => {
                this.setEditing(true);
                this.bindEditorBlurEvent(editorElement);
            })
        );
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
