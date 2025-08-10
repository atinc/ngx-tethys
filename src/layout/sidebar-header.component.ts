import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChild, Directive, TemplateRef, contentChildren, input } from '@angular/core';
import { coerceBooleanProperty, ThyBooleanInput } from 'ngx-tethys/util';

/**
 * 侧边栏头部布局指令
 * @name thySidebarHeader
 * @order 25
 */
@Directive({
    selector: '[thySidebarHeader]',
    host: {
        class: 'sidebar-header',
        '[class.sidebar-header-divided]': 'thyDivided()'
    }
})
export class ThySidebarHeaderDirective {
    /**
     * 是否有分割线
     * @default false
     */
    readonly thyDivided = input<boolean, ThyBooleanInput>(false, { transform: coerceBooleanProperty });

    constructor() {}
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
    imports: [NgTemplateOutlet]
})
export class ThySidebarHeader {
    /**
     * 头部标题
     */
    readonly thyTitle = input<string>(undefined);

    /**
     * 头部自定义操作模板，`<ng-template #headerOperation></ng-template>`
     * @type TemplateRef
     */
    readonly operationTemplateRef = contentChildren<TemplateRef<unknown>>('headerOperation');

    /**
     * 头部自定义标题模板，`<ng-template #headerTitle></ng-template>`
     * @type TemplateRef
     */
    readonly titleTemplateRef = contentChildren<TemplateRef<any>>('headerTitle');
}
