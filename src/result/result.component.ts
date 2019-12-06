import { Component, OnInit, HostBinding, Input } from '@angular/core';

type ThyResultType = 'success' | 'warning' | 'fail';

@Component({
    selector: 'thy-result',
    templateUrl: './result.component.html'
})
export class ThyResultComponent implements OnInit {
    @Input() thyType: ThyResultType = 'success';

    @Input() thyTitle: string;

    @Input() thySubtitle: string;

    @Input() thySrc: string;

    @HostBinding('class.thy-result') className = true;

    constructor() {}

    ngOnInit() {}
}
