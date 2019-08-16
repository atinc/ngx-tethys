import { Component, OnInit, HostBinding, Input, ElementRef } from '@angular/core';
import { UpdateHostClassService } from '../../shared';

@Component({
    selector: 'thy-icon-nav',
    templateUrl: './icon-nav.component.html',
    providers: [UpdateHostClassService]
})
export class ThyIconNavComponent implements OnInit {
    @HostBinding(`class.thy-icon-nav`) isIconNav = true;

    @Input() thyType: string;

    constructor(private updateHostClassService: UpdateHostClassService, elementRef: ElementRef<HTMLElement>) {
        this.updateHostClassService.initializeElement(elementRef);
    }

    ngOnInit(): void {
        if (this.thyType) {
            this.updateHostClassService.updateClass([`thy-icon-nav-${this.thyType}`]);
        }
    }
}
