import { Component, ContentChild, TemplateRef, Input, Output, OnInit, HostBinding } from '@angular/core';

@Component({
    selector: 'thy-slide-body-section',
    template: '<ng-content></ng-content>'
})
export class ThySlideBodySectionComponent implements OnInit {
    @HostBinding('class.thy-slide-body-section') thySlideBodyItem = true;

    @HostBinding('class.thy-slide-body-section-divider') hasDivider = true;

    ngOnInit() {}
}
