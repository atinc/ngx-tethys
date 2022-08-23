import { ChangeDetectorRef, Component, ContentChild, Input, OnInit, SkipSelf, TemplateRef, ViewChild } from '@angular/core';

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
export class ThyPropertyItemComponent implements OnInit {
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
    @Input() thyEditable: boolean;

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

    constructor(@SkipSelf() protected parentCdr: ChangeDetectorRef) {}

    ngOnInit() {}

    setEditing(editing: boolean) {
        this.editing = editing;
        this.parentCdr.markForCheck();
    }

    /**
     * @deprecated please use setEditing(editing: boolean)
     */
    setKeepEditing(keep: boolean) {
        this.setEditing(keep);
    }
}
