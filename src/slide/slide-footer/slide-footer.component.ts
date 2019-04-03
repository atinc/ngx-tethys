import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
    selector: 'thy-slide-footer',
    template: '<ng-content></ng-content>'
})
export class ThySlideFooterComponent implements OnInit {
    @HostBinding('class.thy-slide-footer') slideLayoutFooter = true;

    ngOnInit() {}
}
