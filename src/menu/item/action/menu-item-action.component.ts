import { Component, OnInit, HostBinding, HostListener, ElementRef, Input } from '@angular/core';
import { ThyPopBoxService } from '../../../pop-box';

@Component({
    selector: 'thy-menu-item-action,[thy-menu-item-action],[thyMenuItemAction]',
    templateUrl: './menu-item-action.component.html'
})
export class ThyMenuItemActionComponent implements OnInit {
    public _templateRef: ElementRef;

    @HostBinding('class.thy-menu-item-action') isThyMenuItemIconMore = true;

    @Input()
    set thyActionMenu(value: ElementRef) {
        this._templateRef = value;
    }

    constructor(private popBoxService: ThyPopBoxService) {}

    ngOnInit(): void {}

    @HostListener('click', ['$event'])
    clickAction(event: MouseEvent) {
        event.stopPropagation();
        this.popBoxService.show(this._templateRef, {
            target: event.currentTarget,
            insideAutoClose: true,
            stopPropagation: true,
            placement: 'bottom right'
        });
    }
}
