import { Component } from '@angular/core';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { ThyIconModule } from '../icon.module';
import { ThyIconClassPrefix } from '../icon.component';
import { HttpClientModule } from '@angular/common/http';

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

        beforeEach(async(() => {
            fixture = TestBed.createComponent(TestBed2Component);
            componentInstance = fixture.debugElement.componentInstance;
            fixture.detectChanges();
        }));

        it('should has icon name class', () => {
            expect(
                fixture.nativeElement.querySelector(`.${ThyIconClassPrefix}${componentInstance.thyIconName}`)
            ).toBeTruthy();
        });

        it('should has new icon name class', () => {
            expect(
                fixture.nativeElement.querySelector(`.${ThyIconClassPrefix}${componentInstance.thyIconName}`)
            ).toBeTruthy();
        });

        it('should not be found old icon name class', () => {
            const oldIconName = componentInstance.thyIconName;
            componentInstance.thyIconName = 'check';
            fixture.detectChanges();
            expect(fixture.nativeElement.querySelector(`.${ThyIconClassPrefix}${oldIconName}`)).toBeFalsy();
        });
    });
});

//#region test component

@Component({
    template: `
        <thy-icon [thyIconName]="thyIconName"></thy-icon>
    `
})
class TestBed2Component {
    thyIconName = 'check-fill';
}

//#endregion
