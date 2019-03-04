import { Component, OnInit, HostBinding, Input, ElementRef, Renderer2 } from '@angular/core';

@Component({
    selector: 'thy-menu-item-icon,[thy-menu-item-icon],[thyMenuItemIcon]',
    templateUrl: './menu-item-icon.component.html'
})
export class ThyMenuItemIconComponent implements OnInit {
    @HostBinding('class.thy-menu-item-icon') isThyMenuItemIcon = true;

    @Input()
    set thyColor(value: string) {
        if (value) {
            this.renderer.setStyle(this.elementRef.nativeElement, 'color', value);
        }
    }

    constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

    ngOnInit(): void {}
}
