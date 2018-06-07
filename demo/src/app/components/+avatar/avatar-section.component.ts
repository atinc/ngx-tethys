import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'demo-avatar-section',
    templateUrl: './avatar-section.component.html',
    styleUrls: ['./avatar-section.component.scss']
})

export class DemoAvatarSectionComponent implements OnInit {

    public avatarFullUrl = 'https://s3.cn-north-1.amazonaws.com.cn/lcavatar/dfea7c36-5147-4569-8910-829137920172_80x80.png';
    public member?: any;
    public hasAvatarMember?: any;
    public avatarPath = '9cb2637b-9f70-4d73-8c1d-24542b6ab4e1_80x80.png';

    constructor() {
        this.member = { display_name: 'luxiaobei', avatar: '' };
        this.hasAvatarMember = {
            display_name: 'luxiaobei',
            avatar: this.avatarFullUrl
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
