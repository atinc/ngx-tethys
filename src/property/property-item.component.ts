import {
    ChangeDetectorRef,
    Component,
    ContentChild,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    SkipSelf,
    TemplateRef,
    ViewChild
} from '@angular/core';
import { InputNumber } from 'ngx-tethys/core';
import { Subject } from 'rxjs';

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
export class ThyPropertyItemComponent implements OnInit, OnChanges {
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

    constructor(@SkipSelf() protected parentCdr: ChangeDetectorRef) {}

    ngOnInit() {}

    ngOnChanges(changes: SimpleChanges): void {
        this.changes$.next(changes);
    }

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
