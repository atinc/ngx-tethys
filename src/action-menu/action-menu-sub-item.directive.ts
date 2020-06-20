import {
    Directive,
    HostBinding,
    Input,
    Component,
    HostListener,
    ViewEncapsulation,
    ElementRef,
    OnInit,
    AfterViewInit,
    OnDestroy
} from '@angular/core';
import { ThyActionMenuComponent } from './action-menu.component';
import { UpdateHostClassService } from '../shared';
import { ThyPositioningService } from '../positioning';
import { ThyActionMenuItemDirective } from './action-menu-item.directive';
import { mixinUnsubscribe, MixinBase } from '../core';
import { takeUntil } from 'rxjs/operators';

type SubMenuDirection = 'left' | 'right' | 'auto';

@Directive({
    selector: '[thyActionMenuSubItem]',
    providers: []
})
export class ThyActionMenuSubItemDirective extends mixinUnsubscribe(MixinBase) implements OnInit, OnDestroy {
    @HostBinding('class.action-menu-sub-item') className = true;

    @Input() thyActionMenuSubItem: SubMenuDirection = 'right';

    constructor(private actionMenuItem: ThyActionMenuItemDirective, private positioningService: ThyPositioningService) {
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
                    const offset = this.positioningService.offset(element);
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
