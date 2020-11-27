import { Component, ContentChild, TemplateRef, Input, Output, OnInit, HostBinding } from '@angular/core';
import { coerceBooleanProperty } from 'ngx-tethys/util';

@Component({
    selector: 'thy-slide-body-section',
    template: '<ng-content></ng-content>'
})
export class ThySlideBodySectionComponent implements OnInit {
    @HostBinding('class.thy-slide-body-section') thySlideBodyItem = true;

    @HostBinding('class.thy-slide-body-section-divider') hasDivider = false;

    @Input()
    set thyDividerBorder(value: string | boolean) {
        this.hasDivider = coerceBooleanProperty(value);
    }

    ngOnInit() {}
}
