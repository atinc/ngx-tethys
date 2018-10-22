
import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { ThyKeySelectConfig, ThyKeySelectItem } from '../../../../../src/key-select';

@Component({
    selector: 'demo-key-select-section',
    templateUrl: './key-select-section.component.html',
    encapsulation: ViewEncapsulation.None
})
export class DemoKeySelectSectionComponent {

    public thyKeySelectConfig: ThyKeySelectConfig = {
        hoverClass: 'hover',
        selectedClass: 'active',
        callbacks: {
            hover(item: ThyKeySelectItem, event: Event, ) {
                console.log(`hover item:${item}`);
            },
            select(item: ThyKeySelectItem, event: Event, ) {
                console.log(`select item:${item}`);
            }
        }
    };

    public apiParameters = [
        {
            property: 'hoverClass',
            description: '选择 Hover  状态的样式',
            type: 'String',
            default: 'key-hover'
        },
        {
            property: 'selectedClass',
            description: '选择状态的样式',
            type: 'String',
            default: 'key-selected'
        },
        {
            property: 'scrollContainer',
            description: '滚动 DOM 容器',
            type: 'String | Element | ElementRef',
            default: '指令设置的元素，默认 body'
        },
        {
            property: 'eventContainer',
            description: '键盘事件的作用域',
            type: 'String | Element | ElementRef',
            default: '默认为 scrollContainer'
        }
    ];

    constructor() {
    }
}
