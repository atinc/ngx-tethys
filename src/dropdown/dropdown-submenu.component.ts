import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { getElementOffset } from 'ngx-tethys/util';

import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, OnInit, Signal, computed, inject, input } from '@angular/core';

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
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThyDropdownSubmenu implements OnInit {
    private dropdownMenuItem = inject(ThyDropdownMenuItemDirective);
    private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

    private readonly destroyRef = inject(DestroyRef);

    private direction: Signal<InnerDropdownSubmenuDirection> = computed(() => {
        return this.thyDirection() || 'right';
    });

    /**
     * 菜单方向
     * @type left | right | auto
     */
    readonly thyDirection = input<ThyDropdownSubmenuDirection>('right');

    ngOnInit(): void {
        let direction = this.direction();
        this.updateClassByDirection(direction);
        this.dropdownMenuItem
            .bindMouseenterEvent()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
                if (this.direction() === 'auto') {
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
}
