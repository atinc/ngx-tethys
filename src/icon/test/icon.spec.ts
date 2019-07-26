import { Component } from '@angular/core';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { ThyIconModule } from '../icon.module';
import { HttpClientModule } from '@angular/common/http';
import { ThyIconRegistry } from '../icon-registry';
import { bypassSanitizeProvider, injectDefaultSvgIconSet } from '../../core/testing';

//#region test component

@Component({
    template: `
        <thy-icon [thyIconName]="thyIconName" [thyIconType]="thyIconType" [thyIconLegging]="thyIconLegging"></thy-icon>
    `
})
class ThyIconBasicComponent {
    constructor(public iconRegistry: ThyIconRegistry) {}
    thyIconName = 'check';
    thyIconType = '';
    thyIconLegging = null;
}

//#endregion

describe('ThyIconComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ThyIconModule, HttpClientModule],
            declarations: [ThyIconBasicComponent],
            providers: [bypassSanitizeProvider]
        });
        TestBed.compileComponents();
        injectDefaultSvgIconSet();
    }));

    describe('test begin', () => {
        let fixture: ComponentFixture<ThyIconBasicComponent>;
        let componentInstance: ThyIconBasicComponent;
        const iconSvgClassPrefix = 'thy-icon-';

        beforeEach(async(() => {
            fixture = TestBed.createComponent(ThyIconBasicComponent);
            componentInstance = fixture.debugElement.componentInstance;
            fixture.detectChanges();
        }));

        it('should has icon name class', () => {
            expect(
                fixture.nativeElement.querySelector(`.${iconSvgClassPrefix}${componentInstance.thyIconName}`)
            ).toBeTruthy();
        });

        it('should has new icon name class', () => {
            expect(
                fixture.nativeElement.querySelector(`.${iconSvgClassPrefix}${componentInstance.thyIconName}`)
            ).toBeTruthy();
        });

        it('should not be found old icon name class', () => {
            const oldIconName = componentInstance.thyIconName;
            componentInstance.thyIconName = 'close';
            fixture.detectChanges();
            expect(fixture.nativeElement.querySelector(`.${iconSvgClassPrefix}${oldIconName}`)).toBeFalsy();
        });

        it('should set thyIconType fill have correct class', () => {
            componentInstance.thyIconType = 'fill';
            fixture.detectChanges();
            expect(
                fixture.nativeElement.querySelector(`.${iconSvgClassPrefix}${componentInstance.thyIconName}`)
            ).toBeFalsy();
            expect(
                fixture.nativeElement.querySelector(`.${iconSvgClassPrefix}${componentInstance.thyIconName}-fill`)
            ).toBeTruthy();
        });

        it('should set thyIconLegging be true have correct class', () => {
            componentInstance.thyIconLegging = true;
            fixture.detectChanges();
            expect(fixture.nativeElement.querySelector(`.${iconSvgClassPrefix}legging`)).toBeTruthy();
        });
    });
});
