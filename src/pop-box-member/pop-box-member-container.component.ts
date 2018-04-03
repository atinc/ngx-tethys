import { Component, ElementRef, Renderer2, ViewEncapsulation, HostListener } from '@angular/core';
import { PopBoxMemberService } from './pop-box-member.service';
import { PopBoxMemberOptions } from './pop-box-member-options.class';

@Component({
    selector: 'pop-box-member-container',
    templateUrl: './pop-box-member-container.component.html'
})
export class PopBoxMemberContainerComponent {

    public PopBoxMemberService: PopBoxMemberService;

    protected config: PopBoxMemberOptions;

    constructor(
        protected _element: ElementRef,
        private _renderer: Renderer2) {

    }

    ngOnInit(): void {
        this.config = this.PopBoxMemberService._config;
    }

}
