import { ThyClickDispatcher } from 'ngx-tethys/core';
import { ThyFlexibleText } from 'ngx-tethys/flexible-text';
import { combineLatest, fromEvent, Subject, Subscription, timer } from 'rxjs';
import { delay, filter, take, takeUntil } from 'rxjs/operators';
import { OverlayOutsideClickDispatcher, OverlayRef } from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    NgZone,
    numberAttribute,
    OnDestroy,
    TemplateRef,
    inject,
    input,
    computed,
    effect,
    output,
    contentChild,
    viewChild,
    signal,
    DestroyRef
} from '@angular/core';
import { ThyProperties } from './properties.component';
import { coerceBooleanProperty, helpers, ThyBooleanInput } from 'ngx-tethys/util';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
        '[class.thy-property-edit-trigger-hover]': 'thyEditTrigger() === "hover"',
        '[class.thy-property-edit-trigger-click]': 'thyEditTrigger() === "click"',
        '[class.thy-property-item-operational]': '!!operation()',
        '[class.thy-property-item-operational-hover]': "thyOperationTrigger() === 'hover'",
        '[style.grid-column]': 'gridColumn()',
        '[class.thy-property-item-single]': '!parent'
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ThyFlexibleText, NgTemplateOutlet]
})
export class ThyPropertyItem implements OnDestroy {
    private clickDispatcher = inject(ThyClickDispatcher);
    private ngZone = inject(NgZone);
    private overlayOutsideClickDispatcher = inject(OverlayOutsideClickDispatcher);
    private parent = inject(ThyProperties, { optional: true });
    private destroyRef = inject(DestroyRef);

    /**
     * 属性名称
     */
    readonly thyLabelText = input<string>();

    /**
     * 设置属性是否是可编辑的
     */
    readonly thyEditable = input<boolean, ThyBooleanInput>(false, { transform: coerceBooleanProperty });

    /**
     * 设置跨列的数量
     */
    readonly thySpan = input(1, { transform: numberAttribute });

    /**
     * 设置编辑状态触发方法
     * @type 'hover' | 'click'
     */
    readonly thyEditTrigger = input<'hover' | 'click'>();

    /**
     * 设置属性操作现实触发方式，默认 always 一直显示
     * @type 'hover' | 'always'
     */
    readonly thyOperationTrigger = input<ThyPropertyItemOperationTrigger>('always');

    readonly thyEditingChange = output<boolean>();

    /**
     * 属性名称自定义模板
     * @type TemplateRef
     */
    readonly label = contentChild<TemplateRef<void>>('label');

    /**
     * 属性内容编辑模板，只有在 thyEditable 为 true 时生效
     * @type TemplateRef
     */
    readonly editor = contentChild<TemplateRef<void>>('editor');

    /**
     * 操作区模板
     * @type TemplateRef
     */
    readonly operation = contentChild<TemplateRef<void>>('operation');

    /**
     * @private
     */
    readonly content = viewChild<TemplateRef<void>>('contentTemplate');

    /**
     * @private
     */
    readonly itemContent = viewChild<ElementRef<HTMLElement>>('item');

    editing = signal(false);

    private eventDestroy$ = new Subject<void>();

    private originOverlays: OverlayRef[] = [];

    private clickEventSubscription: Subscription;

    protected readonly gridColumn = computed(() => {
        return `span ${Math.min(this.thySpan(), this.parent?.thyColumn())}`;
    });

    readonly isVertical = computed(() => {
        return this.parent?.layout() === 'vertical';
    });

    constructor() {
        this.originOverlays = [...this.overlayOutsideClickDispatcher._attachedOverlays];

        effect(() => {
            if (this.thyEditable()) {
                this.subscribeClick();
            } else {
                this.setEditing(false);
                this.eventDestroy$.next();
                this.eventDestroy$.complete();

                if (this.clickEventSubscription) {
                    this.clickEventSubscription.unsubscribe();
                    this.clickEventSubscription = null;
                }
            }
        });
    }

    setEditing(editing: boolean) {
        this.ngZone.run(() => {
            if (!!this.editing() !== !!editing) {
                this.thyEditingChange.emit(editing);
            }
            this.editing.set(editing);
        });
    }

    /**
     * @deprecated please use setEditing(editing: boolean)
     */
    setKeepEditing(keep: boolean) {
        this.setEditing(keep);
    }

    private hasOverlay() {
        return !!this.overlayOutsideClickDispatcher._attachedOverlays.filter(overlay => !this.originOverlays.includes(overlay)).length;
    }

    private subscribeClick() {
        if (this.thyEditable() === true) {
            this.ngZone.runOutsideAngular(() => {
                if (this.clickEventSubscription) {
                    return;
                }
                const itemElement = this.itemContent().nativeElement;
                this.clickEventSubscription = fromEvent(itemElement, 'click')
                    .pipe(takeUntil(this.eventDestroy$))
                    .subscribe(() => {
                        this.originOverlays = [...this.overlayOutsideClickDispatcher._attachedOverlays];
                        this.setEditing(true);
                        this.bindEditorBlurEvent(itemElement);
                        itemElement.querySelector('input')?.focus();
                    });
            });
        }
    }

    private subscribeOverlayDetach() {
        const openedOverlays = this.overlayOutsideClickDispatcher._attachedOverlays.filter(
            overlay => !this.originOverlays.includes(overlay)
        );
        const overlaysDetachments$ = openedOverlays.map(overlay => overlay.detachments());
        if (overlaysDetachments$.length) {
            combineLatest(overlaysDetachments$)
                .pipe(delay(50), take(1), takeUntilDestroyed(this.destroyRef))
                .subscribe(() => {
                    this.setEditing(false);
                });
        }
    }

    private subscribeDocumentClick(editorElement: HTMLElement) {
        this.clickDispatcher
            .clicked(0)
            .pipe(
                filter(event => {
                    return !editorElement.contains(event.target as HTMLElement);
                }),
                take(1),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe(() => {
                this.setEditing(false);
            });
    }

    private bindEditorBlurEvent(editorElement: HTMLElement) {
        timer(0).subscribe(() => {
            if (this.hasOverlay()) {
                this.subscribeOverlayDetach();
            } else {
                this.subscribeDocumentClick(editorElement);
            }
        });
    }

    ngOnDestroy(): void {
        this.eventDestroy$.next();
        this.eventDestroy$.complete();
    }
}
