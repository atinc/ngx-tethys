import { Component, ElementRef, TemplateRef, OnInit } from '@angular/core';
import { ComponentExample } from '../../docs/model/component-example';
import { ThyPopBoxService } from '../../../../../src/pop-box/pop-box.service';
import { PopBoxRef } from '../../../../../src/pop-box/pop-box-ref.service';

@Component({
    selector: 'demo-action-menu-section',
    templateUrl: './action-menu-section.component.html',
    // styleUrls: ['./action-menu-section.component.scss']
})
export class DemoActionMenuSectionComponent {

    apiParameters = [
        {
            property: 'thyActionMenuToggle',
            description: '',
            type: 'ElementRef',
            default: ''
        },
        {
            property: 'thyAction',
            description: '触发事件',
            type: 'String: \'click\' | \'contextmenu\'',
            default: 'click'
        },
        {
            property: 'thyStopPropagation',
            description: '阻止冒泡',
            type: '',
            default: 'false'
        },
        {
            property: 'thyPlacement',
            description: '菜单显示位置',
            type: 'String',
            default: 'bottom right'
        },
        {
            property: 'thyWidth',
            description: '设置菜单宽度',
            type: '',
            default: '240px'
        },
        {
            property: 'thy-action-menu',
            description: '菜单',
            type: '',
            default: ''
        },
        {
            property: 'thyActionMenuItem',
            description: '菜单项，设置‘disabled’可禁用',
            type: 'String',
            default: ''
        },
    ];

    constructor() {

    }

    itemClick(value) {
        console.log(value);
    }
}
