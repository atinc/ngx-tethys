import { UnsubscribeMixin } from 'ngx-tethys/core';
import { getElementOffset } from 'ngx-tethys/util';
import { takeUntil } from 'rxjs/operators';

import { ChangeDetectionStrategy, Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';

import { ThyDropdownMenuItemDirective } from './dropdown-menu-item.directive';

export type ThyDropdownSubmenuDirection = 'left' | 'right' | 'auto';

type InnerDropdownSubmenuDirection = ThyDropdownSubmenuDirection | 'leftBottom' | 'rightBottom';

const SUBMENU_CLASS_PREFIX = 'dropdown-submenu';

/**
 * 下拉子菜单
 * @name thy-dropdown-submenu,[thyDropdownSubmenu]
 * @order 40
 */
@Component({
    selector: '[thyDropdownSubmenu],thy-dropdown-submenu',
    template: '<ng-content></ng-content>',
    host: {
        class: 'dropdown-submenu'
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class ThyDropdownSubmenuComponent extends UnsubscribeMixin implements OnInit, OnDestroy {
    private direction: InnerDropdownSubmenuDirection = 'right';

    /**
     * 菜单方向
     * @type left | right | auto
     * @default right
     */
    @Input() set thyDirection(value: ThyDropdownSubmenuDirection) {
        this.direction = value;
    }

    constructor(private dropdownMenuItem: ThyDropdownMenuItemDirective, private elementRef: ElementRef<HTMLElement>) {
        super();
    }

    ngOnInit(): void {
        let direction = this.direction || 'right';
        this.updateClassByDirection(direction);
        this.dropdownMenuItem
            .bindMouseenterEvent()
            .pipe(takeUntil(this.ngUnsubscribe$))
            .subscribe(() => {
                if (this.direction === 'auto') {
                    const element = this.dropdownMenuItem.getElement();
                    const offset = getElementOffset(element);
                    if (document.documentElement.clientWidth < offset.left + offset.width + offset.width) {
                        direction = 'left';
                    } else {
                        direction = 'right';
                    }
                    this.updateClassByDirection(direction);
                }
                this.updateVerticalDirection(direction);
            });
    }

    private updateClassByDirection(direction: InnerDropdownSubmenuDirection) {
        this.dropdownMenuItem.updateClass([`${SUBMENU_CLASS_PREFIX}-${direction}`]);
    }

    private updateVerticalDirection(direction: InnerDropdownSubmenuDirection) {
        const submenuItems = this.elementRef.nativeElement.querySelectorAll('.dropdown-menu-item');
        if (submenuItems.length) {
            let submenuItemHeight = 0;
            submenuItems.forEach(item => (submenuItemHeight += item.clientHeight));
            if (
                document.documentElement.clientHeight - this.dropdownMenuItem.getElement().getBoundingClientRect().bottom <
                submenuItemHeight
            ) {
                direction = direction === 'left' ? 'leftBottom' : 'rightBottom';
                this.updateClassByDirection(direction);
            } else {
                this.updateClassByDirection(direction);
            }
        }
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }
}
