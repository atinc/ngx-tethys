import { NgIf, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { InputBoolean } from 'ngx-tethys/core';

/**
 * 布局侧边栏头部组件
 * @name thy-sidebar-header
 */
@Component({
    selector: 'thy-sidebar-header',
    templateUrl: `./sidebar-header.component.html`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'sidebar-header',
        '[class.sidebar-header-divided]': 'thyDivided'
    },
    standalone: true,
    imports: [NgTemplateOutlet, NgIf]
})
export class ThySidebarHeaderComponent implements OnInit {
    /**
     * 头部标题
     */
    @Input()
    thyTitle: string;

    /**
     * 头部自定义操作模板，`<ng-template #headerOperation></ng-template>`
     * @type TemplateRef
     */
    @ContentChild('headerOperation')
    public operationTemplateRef: TemplateRef<unknown>;

    /**
     * 头部自定义标题模板，`<ng-template #headerTitle></ng-template>`
     * @type TemplateRef
     */
    @ContentChild('headerTitle')
    public titleTemplateRef: TemplateRef<any>;

    /**
     * 是否有分割线
     * @default false
     */
    @Input() @InputBoolean() thyDivided: boolean | string;

    constructor() {}

    ngOnInit(): void {}
}
