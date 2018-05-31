import { Component } from '@angular/core';
import { DemoSlideContentComponent } from './slide-content.component';
import { ThySlideService } from '../../../../../src/slide/slide.service';

@Component({
    selector: 'demo-slide-section',
    templateUrl: './slide-section.component.html'
})
export class DemoSlideSectionComponent {

    public apiParameters = [
        {
            property: 'target',
            description: '弹出组件位置计算的参照元素',
            type: 'ElementRef | HTMLElement',
            default: 'null'
        },
        {
            property: 'from',
            description: 'slide 进场的方向,可选 left | right',
            type: 'string',
            default: 'right'
        },
        {
            property: 'width',
            description: `弹出相对于参照物的位置，比如 bottom center, 空格前的字符串为 top | bottom | left | right，空格后的字符串是对齐方式，
            当位置为 top | bottom 时，对齐方式有 center | left | right, 当位置为 left | left 时，对齐方式有 center | top | bottom`,
            type: 'String',
            default: '350px'
        },
        {
            property: 'height',
            description: '弹出元素和参照物之间的位移',
            type: 'string',
            default: '100%'
        },
        {
            property: 'align',
            description: '点击外部元素自动关闭',
            type: 'string',
            default: 'right'
        },
        {
            property: 'vertical',
            description: '点击弹出组件内部元素自动关闭',
            type: 'string',
            default: 'bottom'
        }
    ];

    constructor(
        private thySlideService: ThySlideService
    ) { }

    showSlide(templateRef: any) {
        this.thySlideService.show(DemoSlideContentComponent, {
            target: templateRef.elementRef,
            from: 'right', // 'left','right','top','bottom'
            width: '350px',
            height: '100%',
            align: 'right', // 'left','center','right'
            vertical: 'top', // 'top','middle','left'
        });
    }

}
