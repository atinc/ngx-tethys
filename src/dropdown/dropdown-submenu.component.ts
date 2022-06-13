import { Constructor, MixinBase, mixinUnsubscribe, ThyUnsubscribe } from 'ngx-tethys/core';
import { getElementOffset } from 'ngx-tethys/util';
import { takeUntil } from 'rxjs/operators';

import { ChangeDetectionStrategy, Component, Directive, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';

import { ThyDropdownMenuItemDirective } from './dropdown-menu-item.directive';

export type ThyDropdownSubmenuDirection = 'left' | 'right' | 'auto';

const _MixinBase: Constructor<ThyUnsubscribe> & typeof MixinBase = mixinUnsubscribe(MixinBase);

const SUBMENU_CLASS_PREFIX = 'dropdown-submenu';

/**
 * 下拉子菜单
 */
@Component({
    selector: '[thyDropdownSubmenu],thy-dropdown-submenu',
    template: '<ng-content></ng-content>',
    host: {
        class: 'dropdown-submenu'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThyDropdownSubmenuComponent extends _MixinBase implements OnInit, OnDestroy {
    private direction: ThyDropdownSubmenuDirection = 'right';

    /**
     * 菜单方向
     * @default right
     */
    @Input() set thyDirection(value: ThyDropdownSubmenuDirection) {
        this.direction = value;
    }

    constructor(private dropdownMenuItem: ThyDropdownMenuItemDirective) {
        super();
    }

    ngOnInit(): void {
        let direction = this.direction || 'right';
        if (this.direction === 'auto') {
            this.updateClassByDirection(direction);
            this.dropdownMenuItem
                .bindMouseenterEvent()
                .pipe(takeUntil(this.ngUnsubscribe$))
                .subscribe(() => {
                    const element = this.dropdownMenuItem.getElement();
                    const offset = getElementOffset(element);
                    if (document.documentElement.clientWidth < offset.left + offset.width + offset.width) {
                        direction = 'left';
                    } else {
                        direction = 'right';
                    }
                    this.updateClassByDirection(direction);
                });
        } else {
            this.updateClassByDirection(direction);
        }
    }

    private updateClassByDirection(direction: ThyDropdownSubmenuDirection) {
        this.dropdownMenuItem.updateClass([`${SUBMENU_CLASS_PREFIX}-${direction}`]);
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }
}
