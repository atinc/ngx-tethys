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

    public avatarSrc = 'dfea7c36-5147-4569-8910-829137920172_80x80.png';
    public member?: any;
    public avatarPath = '9cb2637b-9f70-4d73-8c1d-24542b6ab4e1_80x80.png';

    isFullPath = false;

    originalTransform: (src: string, size: number) => string;

    removeMembers = [
        {
            avatar: this.avatarPath,
            _id: 1,
            size: 24
        },
        {
            avatar: this.avatarSrc,
            _id: 2,
            size: 30
        },
        {
            avatar: this.avatarPath,
            _id: 3,
            size: 38
        }
    ];

    constructor(private thyAvatarService: ThyAvatarService) {
        this.originalTransform = thyAvatarService.avatarSrcTransform;
    }

    ngOnInit() {

    }

    toggleSrcTransform() {
        this.isFullPath = !this.isFullPath;
        if (this.isFullPath) {
            this.avatarSrc = 'https://s3.cn-north-1.amazonaws.com.cn/lcavatar/dfea7c36-5147-4569-8910-829137920172_80x80.png';
            this.thyAvatarService.avatarSrcTransform = (src: string, size: number) => {
                return src;
            };
        } else {
            this.avatarSrc = '9cb2637b-9f70-4d73-8c1d-24542b6ab4e1_80x80.png';
            this.thyAvatarService.avatarSrcTransform = this.originalTransform;
        }
    }

    onRemove(member: any) {
        this.removeMembers.splice(this.removeMembers.indexOf(member), 1);
    }

    resetRemoveMembers() {
        this.removeMembers = [
            {
                avatar: this.avatarPath,
                _id: 1,
                size: 24
            },
            {
                avatar: this.avatarSrc,
                _id: 2,
                size: 30
            },
            {
                avatar: this.avatarPath,
                _id: 3,
                size: 38
            }
        ];
    }
}
