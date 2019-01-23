import { Component, OnInit, HostBinding, HostListener, ElementRef, Input } from '@angular/core';
import { ThyPopBoxService } from '../../../pop-box';

@Component({
    selector: 'thy-menu-item-icon-more,[thy-menu-item-icon-more],[thyMenuItemIconMore]',
    templateUrl: './menu-item-icon-more.component.html'
})
export class ThyMenuItemIconMoreComponent implements OnInit {
    public _templateRef: ElementRef;

    @HostBinding('class.thy-menu-item-icon-more') isThyMenuItemIconMore = true;

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
