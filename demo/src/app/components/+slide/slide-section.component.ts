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
    public thySlideFrom: ThySlideFromTypes = 'right';

    public thySlideClass = 'thy-slide';

    public hasBackdrop = true;

    public thySlideType = 'slide-layout-3';

    public apiThySlideParameters = [
        {
            property: 'key',
            description: 'Slide 的唯一标识，相同 key 控制是否弹出 slide',
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
            property: 'class',
            description: 'slide 上的样式,可以控制 Slide 的 height,width,top,left...',
            type: 'string',
            default: 'thy-slide'
        },
        {
            property: 'hasBackdrop',
            description: 'slide 弹出时，是否有幕布.',
            type: 'boolean',
            default: 'true'
        },
        {
            property: 'containerClass',
            description: '自定义添加thySlideContainer的类名',
            type: 'string',
            default: 'null'
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

    showSlide(key: string) {
        this.thySlideNewService.open(DemoSlideContentComponent, {
            id: key,
            from: this.thySlideFrom, // 'left','right','top','bottom'
            class: this.thySlideClass,
            hasBackdrop: this.hasBackdrop,
            containerClass: 'slide-container-class',
            panelClass: this.thySlideClass,
            initialState: { name: 'slide', slideType: this.thySlideType }
        });
    }
}
