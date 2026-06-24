import { NgTemplateOutlet } from '@angular/common';
import {
    Component,
    computed,
    contentChild,
    ElementRef,
    inject,
    input,
    OnInit,
    output,
    Signal,
    TemplateRef,
    ChangeDetectionStrategy
} from '@angular/core';
import { ThyAction } from 'ngx-tethys/action';
import { ThyTranslate } from 'ngx-tethys/core';
import { ThyIcon } from 'ngx-tethys/icon';
import { coerceBooleanProperty } from 'ngx-tethys/util';
import { ThyDialogContainer } from '../dialog-container.component';
import { ThyInternalDialogRef } from '../dialog-ref';
import { ThyDialogHeaderIcon } from '../dialog.config';
import { ThyDialog } from '../dialog.service';

/**
 * 模态框头部组件
 * @name thy-dialog-header
 * @order 40
 */
@Component({
    selector: 'thy-dialog-header',
    templateUrl: './dialog-header.component.html',
    exportAs: 'thyDialogHeader',
    host: {
        class: 'dialog-header thy-dialog-header',
        '[class.thy-dialog-header-lg]': `thySize() === 'lg'`,
        '[class.thy-dialog-header-divided]': `thyDivided()`
    },
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [NgTemplateOutlet, ThyIcon, ThyAction]
})
export class ThyDialogHeader implements OnInit {
    private elementRef = inject(ElementRef);
    private dialog = inject(ThyDialog);
    private translate = inject(ThyTranslate);
    private dialogContainer: ThyDialogContainer | null = inject(ThyDialogContainer, { optional: true })!;

    /**
     * 自定义头部模板
     */
    public readonly headerTemplate = contentChild<TemplateRef<any>>('dialogHeader');

    /**
     * 标题
     */
    readonly thyTitle = input<string>();

    /**
     * 大小，只有大的详情页场景会使用 lg，左右 padding 缩小至 20px
     * @type lg | md
     */
    readonly thySize = input<'lg' | 'md'>('md');

    /**
     * 是否显示分割线
     */
    readonly thyDivided = input(false, { transform: coerceBooleanProperty });

    /**
     * 标题的多语言 Key
     */
    readonly thyTitleTranslationKey = input<string>();

    readonly title: Signal<string> = computed(() => {
        const title = this.thyTitle();
        const titleTranslationKey = this.thyTitleTranslationKey();
        return title || (titleTranslationKey && this.translate.instant(titleTranslationKey));
    });

    /**
     * 头部图标
     */
    readonly thyIcon = input<string | ThyDialogHeaderIcon>();

    readonly iconName: Signal<string> = computed(() => {
        const icon = this.thyIcon();
        return typeof icon === 'string' ? icon : icon?.name || '';
    });

    readonly iconColor: Signal<string | undefined> = computed(() => {
        const icon = this.thyIcon();
        return typeof icon === 'string' ? undefined : icon?.color;
    });

    /**
     * 关闭事件
     */
    readonly thyOnClose = output<Event | undefined>();

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
                this.dialogContainer.ariaLabelledBy = this.title();
            }
        });
    }

    close(event?: Event) {
        this.thyOnClose.emit(event);
        this.dialog.close();
    }
}
