import { Component } from '@angular/core';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { ThyIconModule } from '../icon.module';
import { HttpClientModule } from '@angular/common/http';
import { ThyIconRegistry } from '../icon-registry';

describe('ThyIconComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ThyIconModule, HttpClientModule],
            declarations: [TestBed2Component]
        });

        TestBed.compileComponents();
    }));

    describe('test begin', () => {
        let fixture: ComponentFixture<TestBed2Component>;
        let componentInstance: TestBed2Component;
        const iconSvgClassPrefix = 'thy-icon--';

        beforeEach(async(() => {
            fixture = TestBed.createComponent(TestBed2Component);
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
                fixture.nativeElement.querySelector(`.${iconSvgClassPrefix}${componentInstance.thyIconName}-fill`)
            ).toBeFalsy();
        });
    });
});

//#region test component

@Component({
    template: `
        <thy-icon [thyIconName]="thyIconName" [thyIconType]="thyIconType"></thy-icon>
    `
})
class TestBed2Component {
    constructor(public iconRegistry: ThyIconRegistry) {}
    thyIconName = 'check';
    thyIconType = '';
}

//#endregion
