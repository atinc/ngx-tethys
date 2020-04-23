import { Component, OnInit } from '@angular/core';
import { ThyAvatarService } from '../../../../../../src/avatar';

@Component({
    template: `
        <thy-avatar [thySrc]="avatarSrc" thyName="路晓贝" thyShowName="true"></thy-avatar>
    `
})
export class DemoAvatarNameDefaultComponent implements OnInit {
    public avatarSrc = 'dfea7c36-5147-4569-8910-829137920172_80x80.png';

    constructor(private thyAvatarService: ThyAvatarService) {}

    ngOnInit() {
        this.thyAvatarService.avatarNameTransform = (name: string) => {
            return name;
        };
    }
}
