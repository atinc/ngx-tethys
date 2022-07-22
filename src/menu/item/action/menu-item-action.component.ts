import { ComponentType } from '@angular/cdk/portal';
import { Component, ElementRef, Input, OnDestroy, Renderer2, TemplateRef } from '@angular/core';
import { ThyPopover } from 'ngx-tethys/popover';
import { SafeAny } from 'ngx-tethys/types';

/**
 * 菜单项操作组件
 */
@Component({
    selector: 'thy-menu-item-action,[thy-menu-item-action],[thyMenuItemAction]',
    templateUrl: './menu-item-action.component.html',
    host: {
        class: 'thy-menu-item-action'
    }
})
export class ThyMenuItemActionComponent implements OnDestroy {
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
     * Action 菜单所在行的 menu 数据
     */
    @Input()
    thyMenuItemValue: SafeAny;

    @Input() thyStopPropagation = true;

    private bindClickEvent() {
        if (this._boundEvent) {
            return;
        }
        this._boundEvent = true;
        this.removeClickListenerFn = this.renderer.listen(this.elementRef.nativeElement, 'click', event => {
            if (this.thyStopPropagation) {
                event.stopPropagation();
            }
            const moreClass = 'thy-more-active';
            let wrapDOM: Element;
            wrapDOM = (event.target as HTMLElement).closest('.thy-menu-item-content');
            if (wrapDOM) {
                wrapDOM.classList.add(moreClass);
            }
            if (this._actionMenu) {
                const popoverRef = this.popover.open(this._actionMenu, {
                    origin: event.currentTarget as HTMLElement,
                    insideClosable: true,
                    placement: 'bottomLeft',
                    initialState: { itemValue: this.thyMenuItemValue }
                });
                if (popoverRef) {
                    popoverRef.afterClosed().subscribe(() => {
                        if (wrapDOM) {
                            wrapDOM.classList.remove(moreClass);
                        }
                    });
                }
            }
        });
    }

    private removeClickListenerFn: VoidFunction | null = null;

    constructor(private popover: ThyPopover, private renderer: Renderer2, private elementRef: ElementRef) {}

    ngOnDestroy(): void {
        this.removeClickListenerFn?.();
    }
}
