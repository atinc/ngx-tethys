import { Component, HostBinding, ContentChild, TemplateRef, ElementRef, Input, AfterContentInit, ViewChild } from '@angular/core';
import { ThyTranslate } from 'ngx-tethys/shared';

@Component({
    selector: 'thy-property-operation-group',
    templateUrl: './property-operation-group.component.html'
})
export class ThyPropertyOperationGroupComponent {
    @HostBinding('class.thy-property-operation-group') _isPropertyOperationGroup = true;

    constructor(private thyTranslate: ThyTranslate) {}
}
