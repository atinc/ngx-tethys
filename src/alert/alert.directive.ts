import { Directive, HostBinding } from '@angular/core';

/**
 * 操作按钮的样式指令，可为警告内容添加自定义操作按钮样式
 * @name thyAlertActionItem
 * @order 20
 */
@Directive({
    selector: '[thyAlertActionItem]'
})
export class ThyAlertActionItemDirective {
    @HostBinding('class.thy-alert-action') class = true;

    constructor() {}
}
