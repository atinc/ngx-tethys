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
class CustomAvatarNameComponent implements OnInit {
    thyName = 'LiLin';

    constructor(private thyAvatarService: ThyAvatarService, private domSanitizer: DomSanitizer) {}

    ngOnInit() {
        this.thyAvatarService.nameTransform = (name: string) => {
            return this.domSanitizer.bypassSecurityTrustHtml(`<code>${name}</code>`);
        };
    }
}

describe('ThyAvatarComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ThyAvatarModule],
            declarations: [AvatarBasicComponent, CustomAvatarNameComponent]
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
        });
    });

    describe('custom avatarName', () => {
        let fixture: ComponentFixture<CustomAvatarNameComponent>;
        let componentInstance: CustomAvatarNameComponent;

        beforeEach(async(() => {
            fixture = TestBed.createComponent(CustomAvatarNameComponent);
            componentInstance = fixture.debugElement.componentInstance;
            fixture.detectChanges();
        }));

        it('should show the custom avatarName', () => {
            const component = fixture.nativeElement.querySelector(`.avatar-name`);
            expect(component).toBeTruthy(`<code>${componentInstance.thyName}</code>`);
        });
    });
});
