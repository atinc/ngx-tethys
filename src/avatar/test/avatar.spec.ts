import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { ThyAvatarModule } from '../avatar.module';
import { ThyAvatarService } from '../avatar.service';

@Component({
    template: `
        <thy-avatar [thyShowName]="true" [thyName]="thyName"></thy-avatar>
    `
})
class AvatarBasicComponent implements OnInit {
    thyName = '张三';

    ngOnInit(): void {}
}

@Component({
    template: `
        <thy-avatar [thyShowName]="true" [thyName]="thyName"></thy-avatar>
    `
})
class WxAvatarNameComponent implements OnInit {
    thyName = 'LiLin';

    constructor(private thyAvatarService: ThyAvatarService, private domSanitizer: DomSanitizer) {}

    ngOnInit() {
        this.thyAvatarService.avatarNameTransform = (name: string) => {
            return this.domSanitizer.bypassSecurityTrustHtml(
                `<ww-open-data type="userName" openid="${name}"></ww-open-data>`
            );
        };
    }
}

describe('ThyAvatarComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ThyAvatarModule],
            declarations: [AvatarBasicComponent, WxAvatarNameComponent]
        });
        TestBed.compileComponents();
    });

    describe('default avatarName', () => {
        let fixture: ComponentFixture<AvatarBasicComponent>;
        let componentInstance: AvatarBasicComponent;

        beforeEach(async(() => {
            fixture = TestBed.createComponent(AvatarBasicComponent);
            componentInstance = fixture.debugElement.componentInstance;
            fixture.detectChanges();
        }));

        it('should show the avatarName default', () => {
            const component = componentInstance.thyName;
            expect(fixture.nativeElement.querySelector(`.avatar-name`).innerText).toEqual(component);
            expect(fixture.nativeElement.querySelector(`ww-open-data`)).toBeFalsy();
        });
    });

    describe('wechat avatarName', () => {
        let fixture: ComponentFixture<WxAvatarNameComponent>;
        let componentInstance: WxAvatarNameComponent;

        beforeEach(async(() => {
            fixture = TestBed.createComponent(WxAvatarNameComponent);
            componentInstance = fixture.debugElement.componentInstance;
            fixture.detectChanges();
        }));

        it('should show the avatarName from wechat', () => {
            expect(componentInstance.thyName).toBeTruthy();
            expect(fixture.nativeElement.querySelector(`.avatar-name`).innerText).toBeFalsy(componentInstance.thyName);
            expect(fixture.nativeElement.querySelector(`ww-open-data`)).toBeTruthy();
        });
    });
});
