import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-strength-custom-example',
    templateUrl: './custom.component.html'
})
export class ThyStrengthCustomExampleComponent implements OnInit {
    public strength = 3;

    public strengths = [1, 2, 3, 4];

    public toggleText = ['default', 'custom'];

    public currentTextType = 'custom';

    public text = {
        default: {
            title: '密码强度',
            highestKey: '最高',
            highKey: '高',
            averageKey: '中',
            lowKey: '低'
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
