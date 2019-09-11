import { Component } from '@angular/core';
import { DemoSlideContentComponent } from './slide-content.component';
import { ThySlideService } from '../../../../../src/slide/slide.service';
import { ThySlideFromTypes } from 'ngx-tethys/slide/slide.config';
import { LiveDemoCodeExample } from 'app/core/live-demo/live-demo.component';

@Component({
    selector: 'demo-slide-section',
    templateUrl: './slide-section.component.html'
})
export class DemoSlideSectionComponent {
    public apiThySlideParameters = [
        {
            property: 'id',
            description: 'Slide 的唯一标识，相同 id 控制是否弹出 slide',
            type: 'ElementRef | HTMLElement',
            default: 'null'
        },
        {
            property: 'from',
            description: 'slide 进场的方向,可选 left | right | top | bottom',
            type: 'string',
            default: 'right'
        },
        {
            property: 'panelClass',
            description: 'slide 上的样式,可以控制 Slide 的 height,width,top,left...',
            type: 'string',
            default: 'thy-slide'
        },
        {
            property: 'hasBackdrop',
            description: 'slide 弹出时，是否有幕布.',
            type: 'boolean',
            default: 'true'
        }
    ];

    public apiThySlideHeaderParameters = [
        {
            property: 'thyTitle',
            description: 'Slide 标题',
            type: 'string',
            default: 'null'
        },
        {
            property: 'thyIcon',
            description: 'Slide 标题的图标',
            type: 'string',
            default: 'null'
        },
        {
            property: 'thyHeader',
            description: '自定义头模板',
            type: 'TemplateRef',
            default: 'null'
        },
        {
            property: 'thyHeaderOperate',
            description: '头部操作区域模板',
            type: 'TemplateRef',
            default: 'null'
        }
    ];

    public liveDemos: LiveDemoCodeExample[] = [
        {
            title: 'slide 示例',
            component: DemoSlideContentComponent,
            codeExamples: [
                {
                    type: 'html',
                    name: 'slide-example.component.html',
                    content: require('!!raw-loader!./slide-example.component.html')
                },
                {
                    type: 'ts',
                    name: 'slide-example.component.ts',
                    content: require('!!raw-loader!./slide-example.component.ts')
                }
            ]
        }
    ];

    constructor(private thySlideNewService: ThySlideService) {}
}
