import { Component } from '@angular/core';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { ThyPropertyOperationModule } from '../module';

describe('ThyPropertyOperation', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ThyPropertyOperationModule],
            declarations: [TestBedComponent]
        });

        TestBed.compileComponents();
    }));

    describe('test begin', () => {
        let fixture: ComponentFixture<TestBedComponent>;
        let componentInstance: TestBedComponent;

        beforeEach(async(() => {
            fixture = TestBed.createComponent(TestBedComponent);
            componentInstance = fixture.debugElement.componentInstance;
            fixture.detectChanges();
        }));

        it('should set icon', () => {
            expect(fixture.nativeElement.querySelector(`.${componentInstance.thyIcon}`)).toBeTruthy();
        });

        it('should set label text', () => {
            expect(fixture.nativeElement.innerText).toContain(componentInstance.thyLabelText);
        });

        it('should set value', () => {
            expect(fixture.nativeElement.innerText).toContain(componentInstance.thyValue);
        });

        it('should set show close button', () => {
            expect(fixture.nativeElement.querySelector('.close-link')).toBeTruthy();
        });

        it('should set type danger', () => {
            expect(fixture.nativeElement.querySelector('.thy-property-operation-danger')).toBeTruthy();
        });

        it('should callback on remove', () => {
            fixture.nativeElement.querySelector('.close-link').click();
            expect(componentInstance.thyValue).toBeNull();
        });
    });
});

//#region test component

@Component({
    template: `
        <thy-property-operation
            [thyIcon]="thyIcon"
            [thyLabelText]="thyLabelText"
            [thyType]="thyType"
            [thyValue]="thyValue"
            [thyLabelHasValue]="thyLabelHasValue"
            [thyShowClose]="thyShowClose"
            (thyOnRemove)="thyOnRemove()"
        >
        </thy-property-operation>
    `
})
class TestBedComponent {
    thyIcon = 'wtf-due-date-th-o';

    thyLabelText = '截止时间';

    thyShowClose = true;

    thyValue = '2012-12-21';

    thyType = 'danger';

    thyLabelHasValue = true;

    thyOnRemove() {
        this.thyValue = null;
    }
}

//#endregion
