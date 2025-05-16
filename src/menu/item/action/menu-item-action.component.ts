import { ThyPopover, ThyPopoverConfig } from 'ngx-tethys/popover';
import { coerceBooleanProperty } from 'ngx-tethys/util';

import { ComponentType } from '@angular/cdk/portal';
import { Component, ElementRef, OnDestroy, OnInit, Renderer2, TemplateRef, inject, input } from '@angular/core';

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
    }
})
export class ThyMenuItemAction implements OnInit, OnDestroy {
    private popover = inject(ThyPopover);
    private renderer = inject(Renderer2);
    private elementRef = inject(ElementRef);

    _boundEvent = false;

    /**
     * 设置 Action 菜单
     */
    readonly thyActionMenu = input<ComponentType<any> | TemplateRef<any>>();

    /**
     * 是否阻止事件冒泡
     */
    readonly thyStopPropagation = input(true, { transform: coerceBooleanProperty });

    /**
     * 弹出框的参数
     * @default { placement: "bottomLeft", insideClosable: true }
     */
    readonly thyPopoverOptions = input<ThyPopoverConfig>();

    private bindClickEvent() {
        if (this._boundEvent) {
            return;
        }
        this._boundEvent = true;
        this.removeClickListenerFn = this.renderer.listen(this.elementRef.nativeElement, 'click', event => {
            if (this.thyStopPropagation()) {
                event.stopPropagation();
            }
            if (this.thyActionMenu()) {
                const activeClass = 'action-active';
                const wrapDOM = (event.target as HTMLElement).closest('.thy-menu-item');
                wrapDOM?.classList.add(activeClass);
                const popoverRef = this.popover.open(
                    this.thyActionMenu(),
                    Object.assign(
                        {
                            origin: event.currentTarget as HTMLElement,
                            insideClosable: true,
                            placement: 'bottomLeft',
                            originActiveClass: 'active'
                        },
                        this.thyPopoverOptions()
                    )
                );
                popoverRef?.afterClosed().subscribe(() => {
                    wrapDOM?.classList.remove(activeClass);
                });
            }
        });
    }

    private removeClickListenerFn: VoidFunction | null = null;

    ngOnInit(): void {
        this.bindClickEvent();
    }

    ngOnDestroy(): void {
        this.removeClickListenerFn?.();
    }
}
