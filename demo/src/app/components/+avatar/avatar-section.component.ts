import { Component, OnInit } from '@angular/core';
import { ThyAvatarService } from '../../../../../src';

@Component({
    selector: 'demo-avatar-section',
    templateUrl: './avatar-section.component.html',
    styleUrls: ['./avatar-section.component.scss']
})

export class DemoAvatarSectionComponent implements OnInit {

    apiParameters = [
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
            property: 'thySize',
            description: '头像大小，可选择  22, 24, 30, 38, 48, 68, 110, 160, sm: 30px, xs: 24px lg: 48',
            type: 'Number | String',
            default: '38'
        },
    ];

    public avatarSrc = 'dfea7c36-5147-4569-8910-829137920172_80x80.png';
    public member?: any;
    public avatarPath = '9cb2637b-9f70-4d73-8c1d-24542b6ab4e1_80x80.png';

    isFullPath = false;

    originalTransform: (src: string) => string;

    constructor(private thyAvatarService: ThyAvatarService) {
        this.originalTransform = thyAvatarService.avatarSrcTransform;
    }

    ngOnInit() {

    }

    toggleSrcTransform() {
        this.isFullPath = !this.isFullPath;
        if (this.isFullPath) {
            this.avatarSrc = 'https://s3.cn-north-1.amazonaws.com.cn/lcavatar/dfea7c36-5147-4569-8910-829137920172_80x80.png';
            this.thyAvatarService.avatarSrcTransform = (src) => {
                return src;
            };
        } else {
            this.avatarSrc = '9cb2637b-9f70-4d73-8c1d-24542b6ab4e1_80x80.png';
            this.thyAvatarService.avatarSrcTransform = this.originalTransform;
        }
    }
}
