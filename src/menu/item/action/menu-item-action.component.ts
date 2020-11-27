import {
    Component,
    OnInit,
    HostBinding,
    HostListener,
    ElementRef,
    Input,
    Output,
    EventEmitter,
    Renderer2,
    TemplateRef
} from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { ThyPopover } from '../../../popover';

@Component({
    selector: 'thy-menu-item-action,[thy-menu-item-action],[thyMenuItemAction]',
    templateUrl: './menu-item-action.component.html'
})
export class ThyMenuItemActionComponent implements OnInit {
    _boundEvent = false;

    _actionMenu: ComponentType<any> | TemplateRef<any>;

    @HostBinding('class.thy-menu-item-action') isThyMenuItemIconMore = true;

    @Input()
    set thyActionMenu(value: ComponentType<any> | TemplateRef<any>) {
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
                this.popover.open(this._actionMenu,{
                    origin: event.currentTarget as HTMLElement,
                    insideClosable: true,
                    placement: 'bottom',
                });
            }
        });
    }

    constructor( private popover: ThyPopover ,private renderer: Renderer2, private elementRef: ElementRef) {}

    ngOnInit(): void {}
}
