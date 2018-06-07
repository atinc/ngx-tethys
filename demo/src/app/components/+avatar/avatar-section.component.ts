import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'demo-avatar-section',
    templateUrl: './avatar-section.component.html',
    styleUrls: ['./avatar-section.component.scss']
})

export class DemoAvatarSectionComponent implements OnInit {

    public member?: any;
    public hasAvatarMember?: any;

    constructor() {
        this.member = { display_name: 'luxiaobei', avatar: '' };
        this.hasAvatarMember = {
            display_name: 'luxiaobei',
            avatar: 'https://s3.cn-north-1.amazonaws.com.cn/lcavatar/dfea7c36-5147-4569-8910-829137920172_80x80.png'
        };
    }

    ngOnInit() {
        setTimeout(() => {
            this.member = { display_name: 'worktile', avatar: '' };
            this.hasAvatarMember = {
                display_name: 'worktile',
                avatar: ''
            };
        }, 3000);
    }
}
