import { Component, Input, Output, EventEmitter, ContentChild, TemplateRef, OnInit, ElementRef, inject } from '@angular/core';
import { ThyDialog } from '../dialog.service';
import { ThyDialogContainer } from '../dialog-container.component';
import { ThyTranslate } from 'ngx-tethys/core';
import { ThyInternalDialogRef } from '../dialog-ref';
import { ThyAction } from 'ngx-tethys/action';
import { ThyIcon } from 'ngx-tethys/icon';
import { NgTemplateOutlet } from '@angular/common';
import { coerceBooleanProperty } from 'ngx-tethys/util';

/**
 * 模态框头部组件
 * @name thy-dialog-header
 * @order 40
 */
@Component({
    selector: 'thy-dialog-header',
    templateUrl: './dialog-header.component.html',
    // changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'thyDialogHeader',
    host: {
        class: 'dialog-header thy-dialog-header',
        '[class.thy-dialog-header-lg]': `thySize === 'lg'`,
        '[class.thy-dialog-header-divided]': `thyDivided`
    },
    imports: [NgTemplateOutlet, ThyIcon, ThyAction]
})
export class ThyDialogHeader implements OnInit {
    private elementRef = inject(ElementRef);
    private dialog = inject(ThyDialog);
    private translate = inject(ThyTranslate);
    private dialogContainer = inject(ThyDialogContainer, { optional: true })!;

    /**
     * 自定义头部模板
     */
    @ContentChild('dialogHeader')
    public headerTemplate: TemplateRef<any>;

    /**
     * 标题
     */
    @Input() thyTitle: string;

    /**
     * 大小，只有大的详情页场景会使用 lg，左右 padding 缩小至 20px
     * @type lg | md
     * @default md
     */
    @Input() thySize: 'lg' | 'md';

    /**
     * 是否显示分割线
     * @default false
     */
    @Input({ transform: coerceBooleanProperty }) thyDivided: boolean;

    /**
     * 标题的多语言 Key
     */
    @Input()
    set thyTitleTranslationKey(key: string) {
        if (key && !this.thyTitle) {
            this.thyTitle = this.translate.instant(key);
        }
    }

    /**
     * 头部图标
     */
    @Input() thyIcon: string;

    /**
     * 关闭事件
     */
    @Output() thyOnClose: EventEmitter<Event> = new EventEmitter<Event>();

    ngOnInit() {
        if (!this.dialogContainer) {
            // When this directive is included in a dialog via TemplateRef (rather than being
            // in a Component), the ThyDialogContainerComponent isn't available via injection because embedded
            // views cannot be given a custom injector. Instead, we look up the ThyDialogContainerComponent by
            // ID. This must occur in `onInit`, as the ID binding for the dialog container won't
            // be resolved at constructor time.
            const dialogRef = this.dialog.getClosestDialog(this.elementRef.nativeElement) as ThyInternalDialogRef<any>;
            this.dialogContainer = dialogRef ? dialogRef.containerInstance : null;
        }

        // change in next microtask avoid throw ExpressionChangedAfterItHasBeenCheckedError
        // because sub component change parent's HostBinding property (ariaLabelledBy)
        Promise.resolve().then(() => {
            if (this.dialogContainer) {
                this.dialogContainer.ariaLabelledBy = this.thyTitle;
            }
        });
    }

    close(event?: Event) {
        if (this.thyOnClose.observers.length > 0) {
            this.thyOnClose.emit(event);
        } else {
            this.dialog.close();
        }
    }
}
