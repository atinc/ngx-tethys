import { ThyPopover, ThyPopoverConfig } from 'ngx-tethys/popover';
import { coerceBooleanProperty } from 'ngx-tethys/util';

import { ComponentType } from '@angular/cdk/portal';
import { Component, ElementRef, Input, OnDestroy, Renderer2, TemplateRef, inject } from '@angular/core';

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
    private popover = inject(ThyPopover);
    private renderer = inject(Renderer2);
    private elementRef = inject(ElementRef);

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

    /**
     * 弹出框的参数
     * @default { placement: "bottomLeft", insideClosable: true }
     */
    @Input() thyPopoverOptions: ThyPopoverConfig;

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
                const activeClass = 'action-active';
                const wrapDOM = (event.target as HTMLElement).closest('.thy-menu-item');
                wrapDOM?.classList.add(activeClass);
                const popoverRef = this.popover.open(
                    this._actionMenu,
                    Object.assign(
                        {
                            origin: event.currentTarget as HTMLElement,
                            insideClosable: true,
                            placement: 'bottomLeft',
                            originActiveClass: 'active'
                        },
                        this.thyPopoverOptions
                    )
                );
                popoverRef?.afterClosed().subscribe(() => {
                    wrapDOM?.classList.remove(activeClass);
                });
            }
        });
    }

    private removeClickListenerFn: VoidFunction | null = null;

    ngOnDestroy(): void {
        this.removeClickListenerFn?.();
    }
}
