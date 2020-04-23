import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ThyAvatarService } from '../../../../../../src/avatar';

@Component({
    template: `
        <thy-avatar [thySrc]="avatarSrc" thyName="路晓贝1" thyShowName="true"></thy-avatar>
    `
})
export class DemoAvatarNameCustomComponent implements OnInit {
    public avatarSrc = 'dfea7c36-5147-4569-8910-829137920172_80x80.png';

    constructor(private thyAvatarService: ThyAvatarService, private domSanitizer: DomSanitizer) {}

    ngOnInit() {
        this.thyAvatarService.avatarNameTransform = (name: string) => {
            return this.domSanitizer.bypassSecurityTrustHtml(`<code>${name}</code>`);
        };
    }
}
