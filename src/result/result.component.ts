import { Component, OnInit, HostBinding, Input, TemplateRef, ContentChild } from '@angular/core';

type ThyResultType = 'success' | 'warning' | 'fail';

@Component({
    selector: 'thy-result',
    templateUrl: './result.component.html'
})
export class ThyResultComponent implements OnInit {
    @Input() thyType: ThyResultType;

    @Input() thyTitle: string;

    @Input() thySubtitle: string;

    @Input() thySrc: string;

    @ContentChild('thyExtra') extraTemplateRef: TemplateRef<any>;

    @HostBinding('class.thy-result') className = true;

    constructor() {}

    ngOnInit() {}
}
