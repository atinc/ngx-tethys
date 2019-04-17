import {
    Component,
    OnInit,
    HostBinding,
    Input,
    Optional,
    ElementRef,
    Renderer2,
    AfterContentInit,
    AfterViewInit
} from '@angular/core';
import { ThyMenuGroupComponent } from '../group/menu-group.component';

@Component({
    selector: 'thy-menu-item,[thy-menu-item],[thyMenuItem]',
    templateUrl: './menu-item.component.html'
})
export class ThyMenuItemComponent implements OnInit {
    @HostBinding('class.thy-menu-item') isThyMenuItem = true;

    constructor(
        @Optional() public parent: ThyMenuGroupComponent,
        private elementRef: ElementRef,
        private renderer: Renderer2
    ) {}

    ngOnInit(): void {
        let paddingLeft = 0;
        if (this.parent) {
            paddingLeft = this.parent.showIcon
                ? this.parent.groupHeaderPaddingLeft + 35
                : this.parent.groupHeaderPaddingLeft + 15;
        } else {
            paddingLeft = 15;
        }
        this.renderer.setStyle(this.elementRef.nativeElement, 'paddingLeft', paddingLeft + 'px');
        const dragHandle = this.elementRef.nativeElement.querySelector('.cdk-drag-handle');
        if (dragHandle) {
            this.renderer.setStyle(dragHandle, 'width', paddingLeft + 'px');

            this.renderer.setStyle(dragHandle, 'marginLeft', -paddingLeft + 'px');
        }
    }
}
