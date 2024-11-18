import { Component, OnInit, Signal } from '@angular/core';
import { injectLocale, ThyStrengthLocale } from 'ngx-tethys/i18n';

@Component({
    selector: 'app-strength-custom-example',
    templateUrl: './custom.component.html'
})
export class ThyStrengthCustomExampleComponent implements OnInit {
    locale: Signal<ThyStrengthLocale> = injectLocale('strength');

    public strength = 3;

    public strengths = [1, 2, 3, 4];

    public toggleText = ['default', 'custom'];

    public currentTextType = 'custom';

    public text = {
        default: {
            title: '密码强度',
            highestKey: this.locale().highest,
            highKey: this.locale().high,
            averageKey: this.locale().medium,
            lowKey: this.locale().low
        },
        custom: {
            title: '评分',
            highestKey: '🌟🌟🌟🌟',
            highKey: '🌟🌟🌟',
            averageKey: '🌟🌟',
            lowKey: '🌟'
        }
    };

    constructor() {}

    ngOnInit() {}
}
