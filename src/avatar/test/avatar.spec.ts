import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { Component } from '@angular/core';
import { DomSanitizer, By } from '@angular/platform-browser';
import { ThyAvatarModule } from '../avatar.module';
import { ThyAvatarService } from '../avatar.service';

@Component({
    template: `
        <ng-container [ngSwitch]="useSuite">
            <!-- Suite 1 for test thyName -->
            <thy-avatar *ngSwitchCase="1" [thyShowName]="true" [thyName]="name"></thy-avatar>
            <!-- Suite 2 for test default size -->
            <thy-avatar *ngSwitchCase="2" [thyName]="name"></thy-avatar>
            <!-- Suite 3 for test thySize -->
            <thy-avatar *ngSwitchCase="3" [thyName]="name" [thySize]="size"></thy-avatar>
            <!-- Suite 4 for test thyDisabled and thyShowRemove -->
            <thy-avatar *ngSwitchCase="4" [thyName]="name" thyDisabled="true" thyShowRemove="true"></thy-avatar>
        </ng-container>
    `
})
class ThyTestAvatarComponent {
    useSuite: 1 | 2 | 3 | 4;

    name = 'LiLei';

    size: number | string = 0;

    constructor(private thyAvatarService: ThyAvatarService, private domSanitizer: DomSanitizer) {}

    rewriteNameTransform() {
        this.thyAvatarService.nameTransform = (name: string) => {
            return this.domSanitizer.bypassSecurityTrustHtml(`<code>${name}</code>`);
        };
    }
}

describe('ThyAvatarComponent', () => {
    let fixture: ComponentFixture<ThyTestAvatarComponent>;
    let componentInstance: ThyTestAvatarComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ThyAvatarModule],
            declarations: [ThyTestAvatarComponent]
        });
        TestBed.compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyTestAvatarComponent);
        componentInstance = fixture.debugElement.componentInstance;
    });

    describe('default avatarName', () => {
        beforeEach(async(() => {
            componentInstance.useSuite = 1;
            fixture.detectChanges();
        }));

        it('should show the avatarName default', () => {
            const component = componentInstance.name;
            expect(fixture.nativeElement.querySelector(`.avatar-name`).innerText).toEqual(component);
        });
    });

    describe('custom avatarName', () => {
        beforeEach(async(() => {
            componentInstance.useSuite = 1;
            componentInstance.rewriteNameTransform();
            fixture.detectChanges();
        }));

        it('should show the custom avatarName', () => {
            const customValue = fixture.nativeElement.querySelector(`.avatar-name`).firstChild;
            const result = document.createElement('code');
            result.innerText = componentInstance.name;
            expect(customValue).toEqual(result);
        });
    });

    describe('the avatar should be 36px size which is the default size When thySize is empty', () => {
        beforeEach(async(() => {
            componentInstance.useSuite = 2;
        }));

        it('the avatar should be 36px size which is the default size When thySize is empty', () => {
            fixture.detectChanges();

            const avatarContainer = fixture.debugElement.query(By.css('.thy-avatar-36'));
            expect(avatarContainer).not.toBeNull();
        });
    });

    describe('show different size when input different thySize value', () => {
        beforeEach(async(() => {
            componentInstance.useSuite = 3;
        }));

        it('the avatar should be 24px size When input xs string', () => {
            componentInstance.size = 'xs';
            fixture.detectChanges();

            const avatarContainer = fixture.debugElement.query(By.css('.thy-avatar-24'));
            expect(avatarContainer).not.toBeNull();
        });

        it('the avatar should be 68px size When input number 68', () => {
            componentInstance.size = 68;
            fixture.detectChanges();

            const avatarContainer = fixture.debugElement.query(By.css('.thy-avatar-68'));
            expect(avatarContainer).not.toBeNull();
        });

        describe('The avatar size should get the adjacent value from [22, 24, 28, 32, 36, 48, 68, 110, 160]', () => {
            it('the avatar should be 22px size When input number less than 22', () => {
                componentInstance.size = 0;
                fixture.detectChanges();

                const avatarContainer = fixture.debugElement.query(By.css('.thy-avatar-22'));
                expect(avatarContainer).not.toBeNull();
            });
            it('the larger value should displayed When thySize is between the two values', () => {
                componentInstance.size = 58;
                fixture.detectChanges();

                const avatarContainer = fixture.debugElement.query(By.css('.thy-avatar-68'));
                expect(avatarContainer).not.toBeNull();
            });

            it('the avatar should be 160px size When input number large than 160', () => {
                componentInstance.size = 200;
                fixture.detectChanges();

                const avatarContainer = fixture.debugElement.query(By.css('.thy-avatar-160'));
                expect(avatarContainer).not.toBeNull();
            });
        });
    });

    describe('disabled or remove avatar when thyDisabled or thyShowRemove is true', () => {
        beforeEach(() => {
            componentInstance.useSuite = 4;
        });

        it('has .thy-avatar-disabled element when thyDisabled is true', () => {
            fixture.detectChanges();
            const avatarContainer = fixture.nativeElement.querySelector('.thy-avatar');
            expect(avatarContainer.querySelector('.thy-avatar-disabled')).not.toBeNull();
        });

        it('has .remove-link element when thyShowRemove is true', () => {
            fixture.detectChanges();
            const avatarContainer = fixture.nativeElement.querySelector('.thy-avatar');
            expect(avatarContainer.querySelector('.remove-link')).not.toBeNull();
        });
    });
});
