import { Component, OnInit } from '@angular/core';
import { DemoLinkBasicComponent } from './basic/link-basic.component';

@Component({
    selector: 'app-demo-link-section',
    templateUrl: './link-section.component.html'
})
export class DemoLinkSectionComponent implements OnInit {
    liveDemos = [
        {
            title: '基本使用',
            description: `链接分为主链接（默认链接）, 危险链接, 成功链接, 重要链接, 次链接, 危险弱链接`,
            component: DemoLinkBasicComponent,
            codeExamples: [
                {
                    type: 'html',
                    name: 'link-basic.component.html',
                    content: require('!!raw-loader!./basic/link-basic.component.html')
                },
                {
                    type: 'ts',
                    name: 'button-pair.component.ts',
                    content: require('!!raw-loader!./basic/link-basic.component.ts')
                }
            ]
        }
    ];

    constructor() {}

    ngOnInit(): void {}
}
