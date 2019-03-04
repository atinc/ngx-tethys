import { Component, OnInit } from '@angular/core';
import { ThyAvatarService } from '../../../../../src/public-api';
import { ComponentExample } from '../../docs/model/component-example';
import { DemoAvatarSizeSectionComponent } from './size/size.component';
import { ShowcaseSection } from '../../docs/model/showcase-section';
import { DemoAvatarTypeSectionComponent } from './type/avatar-type.component';
import { DemoAvatarHasBadgeSectionComponent } from './has-badge/has-badge.component';
import { DemoAvatarRemoveSectionComponent } from './remove/remove.component';

@Component({
    selector: 'demo-avatar-section',
    templateUrl: './avatar-section.component.html',
    styleUrls: ['./avatar-section.component.scss']
})

export class DemoAvatarSectionComponent implements OnInit {

    public componentExamples: ComponentExample[] = [];

    public apiParameters = [
        {
            property: 'thySrc',
            description: '头像路径地址, 默认为全路径，如果不是全路径，可以通过自定义服务 ThyAvatarService，重写 avatarSrcTransform 方法实现转换',
            type: 'string',
            default: ''
        },
        {
            property: 'thyName',
            description: '人员名称',
            type: 'string',
            default: ''
        },
        {
            property: 'thyShowName',
            description: '是否展示人员名称',
            type: 'Boolean',
            default: 'false'
        },
        {
            property: 'thyShowRemove',
            description: '是否展示移除按钮',
            type: 'Boolean',
            default: 'false'
        },
        {
            property: 'thyOnRemove',
            description: '移除按钮的事件, 当 thyShowRemove 为 true 时起作用',
            type: 'Event',
            default: ''
        },
        {
            property: 'thySize',
            description: '头像大小，可选择  22, 24, 30, 38, 48, 68, 110, 160, sm: 30px, xs: 24px lg: 48',
            type: 'Number | String',
            default: '38'
        },
    ];


    constructor(private thyAvatarService: ThyAvatarService) {
    }

    ngOnInit() {
        this.componentExamples = [{
            title: '头像类型',
            description: '支持俩种类型：图片和字符，其中字符型可以自动生成背景色。',
            component: require('!!raw-loader!./type/avatar-type.component.ts'),
            html: require('!!raw-loader!./type/avatar-type.component.html'),
            outlet: DemoAvatarTypeSectionComponent
        }, {
            title: '头像大小',
            description: '可选择 22, 24, 30, 38, 48, 68, 110, 160 或者 sm(30pz) xs(24px) lg(48px)',
            component: require('!!raw-loader!./size/size.component.ts'),
            html: require('!!raw-loader!./size/size.component.html'),
            outlet: DemoAvatarSizeSectionComponent
        }, {
            title: '可移除头像',
            description: '鼠标移动到头像时，头像右上出现移除的按钮，点击可移除',
            component: require('!!raw-loader!./remove/remove.component.ts'),
            html: require('!!raw-loader!./remove/remove.component.html'),
            outlet: DemoAvatarRemoveSectionComponent
        }, {
            title: '有徽标头像',
            description: '',
            component: require('!!raw-loader!./has-badge/has-badge.component.ts'),
            html: require('!!raw-loader!./has-badge/has-badge.component.html'),
            outlet: DemoAvatarHasBadgeSectionComponent
        }];
    }

}
