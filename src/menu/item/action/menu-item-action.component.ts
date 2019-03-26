import {
    Component,
    OnInit,
    HostBinding,
    HostListener,
    ElementRef,
    Input,
    Output,
    EventEmitter,
    Renderer2
} from '@angular/core';
import { ThyPopBoxService } from '../../../pop-box';
import { ComponentType } from '@angular/cdk/portal';

@Component({
    selector: 'thy-menu-item-action,[thy-menu-item-action],[thyMenuItemAction]',
    templateUrl: './menu-item-action.component.html'
})
export class ThyMenuItemActionComponent implements OnInit {
    _boundEvent = false;

    _actionMenu: ElementRef | ComponentType<any>;

    @HostBinding('class.thy-menu-item-action') isThyMenuItemIconMore = true;

    @Input()
    set thyActionMenu(value: ElementRef | ComponentType<any>) {
        this._actionMenu = value;
        if (this._actionMenu) {
            this.bindClickEvent();
        }
    }

    @Input() thyStopPropagation = true;

    private bindClickEvent() {
        if (this._boundEvent) {
            return;
        }
        this._boundEvent = true;
        this.renderer.listen(this.elementRef.nativeElement, 'click', event => {
            if (this.thyStopPropagation) {
                event.stopPropagation();
            }
            if (this._actionMenu) {
                this.popBoxService.show(this._actionMenu, {
                    target: event.currentTarget,
                    insideAutoClose: true,
                    stopPropagation: true,
                    placement: 'bottom right'
                });
            }
        });
    }

    constructor(private popBoxService: ThyPopBoxService, private renderer: Renderer2, private elementRef: ElementRef) {}

    ngOnInit(): void {}
}
