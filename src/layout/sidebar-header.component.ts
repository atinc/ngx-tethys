import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChild, Directive, Input, TemplateRef } from '@angular/core';
import { coerceBooleanProperty } from 'ngx-tethys/util';

/**
 * 侧边栏头部布局指令
 * @name thySidebarHeader
 * @order 25
 */
@Directive({
    selector: '[thySidebarHeader]',
    host: {
        class: 'sidebar-header',
        '[class.sidebar-header-divided]': 'thyDivided'
    },
    standalone: true
})
export class ThySidebarHeaderDirective {
    /**
     * 是否有分割线
     * @default false
     */
    @Input({ transform: coerceBooleanProperty }) thyDivided: boolean | string;
}

/**
 * 侧边栏头部布局组件
 * @name thy-sidebar-header
 * @order 26
 */
@Component({
    selector: 'thy-sidebar-header',
    templateUrl: `./sidebar-header.component.html`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives: [
        {
            directive: ThySidebarHeaderDirective,
            inputs: ['thyDivided']
        }
    ],
    standalone: true,
    imports: [NgTemplateOutlet]
})
export class ThySidebarHeader {
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
}
