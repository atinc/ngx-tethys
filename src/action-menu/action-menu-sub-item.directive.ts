import { Constructor, MixinBase, mixinUnsubscribe, ThyUnsubscribe } from 'ngx-tethys/core';
import { getElementOffset } from 'ngx-tethys/util';
import { takeUntil } from 'rxjs/operators';

import { Directive, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';

import { ThyActionMenuItemDirective } from './action-menu-item.directive';

type SubMenuDirection = 'left' | 'right' | 'auto';

const _MixinBase: Constructor<ThyUnsubscribe> & typeof MixinBase = mixinUnsubscribe(MixinBase);

@Directive({
    selector: '[thyActionMenuSubItem]',
    providers: [],
    standalone: true
})
export class ThyActionMenuSubItemDirective extends _MixinBase implements OnInit, OnDestroy {
    @HostBinding('class.action-menu-sub-item') className = true;

    @Input() thyActionMenuSubItem: SubMenuDirection = 'right';

    constructor(private actionMenuItem: ThyActionMenuItemDirective) {
        super();
    }

    ngOnInit(): void {
        let direction = this.thyActionMenuSubItem || 'right';
        if (this.thyActionMenuSubItem === 'auto') {
            this.actionMenuItem.updateClass([`action-menu-item-${direction}`]);
            this.actionMenuItem
                .bindMouseenterEvent()
                .pipe(takeUntil(this.ngUnsubscribe$))
                .subscribe(() => {
                    const element = this.actionMenuItem.getElement();
                    const offset = getElementOffset(element);
                    if (document.documentElement.clientWidth < offset.left + offset.width + offset.width) {
                        direction = 'left';
                    } else {
                        direction = 'right';
                    }
                    this.actionMenuItem.updateClass([`action-menu-item-${direction}`]);
                });
        } else {
            this.actionMenuItem.updateClass([`action-menu-item-${direction}`]);
        }
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }
}
