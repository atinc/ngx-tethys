import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { InputBoolean } from 'ngx-tethys/core';

@Component({
    selector: 'thy-carousel',
    templateUrl: './carousel.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    preserveWhitespaces: false,
    host: {
        class: 'thy-carousel'
    }
})
export class ThyCarouselComponent implements OnInit {
    @Input('thyAutoPlay') @InputBoolean() thyAutoPlay: boolean = false;

    constructor() {}

    ngOnInit(): void {}
}
