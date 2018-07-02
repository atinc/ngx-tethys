import { Component } from '@angular/core';
@Component({
    selector: 'demo-label-section',
    templateUrl: './label-section.component.html',
})
export class DemoLabelSectionComponent {

    public color?: string;
    public color1?: string;

    public apiParameters = [
        {
            property: 'thyLabel',
            description: '标签类型（default、primary、success、info、danger）',
            type: 'String',
            default: ''
        },
        {
            property: 'thyLabelType',
            description: '状态标签',
            type: 'String',
            default: 'state'
        },
        {
            property: 'thyHasHover',
            description: '滑过效果',
            type: 'Boolean',
            default: 'false'
        },
        {
            property: 'thyBeforeIcon',
            description: '可在显示文案前添加图标,如添加图标',
            type: 'String',
            default: ''
        },
        {
            property: 'thyAfterIcon',
            description: '可在显示文案后添加图标，如删除图标',
            type: 'String',
            default: ''
        },
        {
            property: '[thyLabelColor]',
            description: '自定义颜色，#f969aa 或者变量，需要同时加上 thyLabel 属性',
            type: 'String',
            default: ''
        }
    ];

    public statusLabels = [{
        name: '未开始',
        icon: 'wtf-pending',
        color: '#fa5a55'
    }, {
        name: '进行中',
        icon: 'wtf-processing',
        color: '#ef7bde'
    }, {
        name: '已完成',
        icon: 'wtf-completed',
        color: '#22d7bb'
    }];

    constructor() {
        this.color = '#7076fa';
        this.color1 = '#f969aa';
    }

    add() {
        alert('add success');
    }

    remove() {
        alert('remove success');
    }

    showMore() {
        alert('show more menu');
    }

}
