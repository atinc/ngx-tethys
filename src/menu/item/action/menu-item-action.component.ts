import { ComponentType } from '@angular/cdk/portal';
import { Component, ElementRef, Input, OnDestroy, Renderer2, TemplateRef } from '@angular/core';
import { ThyPopover } from 'ngx-tethys/popover';
import { coerceBooleanProperty } from 'ngx-tethys/util';

/**
 * 菜单项操作组件
 * @name thy-menu-item-action,[thy-menu-item-action],[thyMenuItemAction]
 * @order 25
 */
@Component({
    selector: 'thy-menu-item-action,[thy-menu-item-action],[thyMenuItemAction]',
    templateUrl: './menu-item-action.component.html',
    host: {
        class: 'thy-menu-item-action'
    },
    standalone: true
})
export class ThyMenuItemAction implements OnDestroy {
    _boundEvent = false;

    _actionMenu: ComponentType<any> | TemplateRef<any>;

    /**
     * 设置 Action 菜单
     */
    @Input()
    set thyActionMenu(value: ComponentType<any> | TemplateRef<any>) {
        this._actionMenu = value;
        if (this._actionMenu) {
            this.bindClickEvent();
        }
    }

    /**
     * 是否阻止事件冒泡
     */
    @Input({ transform: coerceBooleanProperty }) thyStopPropagation = true;

    private bindClickEvent() {
        if (this._boundEvent) {
            return;
        }
        this._boundEvent = true;
        this.removeClickListenerFn = this.renderer.listen(this.elementRef.nativeElement, 'click', event => {
            if (this.thyStopPropagation) {
                event.stopPropagation();
            }
            if (this._actionMenu) {
                this.popover.open(this._actionMenu, {
                    origin: event.currentTarget as HTMLElement,
                    insideClosable: true,
                    placement: 'bottom'
                });
            }
        });
    }

    private removeClickListenerFn: VoidFunction | null = null;

    constructor(private popover: ThyPopover, private renderer: Renderer2, private elementRef: ElementRef) {}

    ngOnDestroy(): void {
        this.removeClickListenerFn?.();
    }
}
