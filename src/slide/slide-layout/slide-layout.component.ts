import {
    Component,
    ViewEncapsulation,
    OnInit,
    ChangeDetectionStrategy,
    HostBinding
} from '@angular/core';

@Component({
    selector: 'thy-slide-layout',
    template: '<ng-content></ng-content>',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThySlideLayoutComponent implements OnInit {
    @HostBinding('class.thy-slide-layout') slideLayout = true;

    constructor() {}

    ngOnInit() {}
}
