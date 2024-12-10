import { ThyInputModule } from './../module';
import { ThyInputDirective } from './../input.directive';
import { Component, DebugElement, NgModule } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
    selector: 'test-bed-input-directive',
    template: ` <input name="username" thyInput [thySize]="thySize" /> `,
    standalone: false
})
class TestBedInputDirectiveComponent {
    thySize = ``;
}

@NgModule({
    imports: [ThyInputModule],
    declarations: [TestBedInputDirectiveComponent],
    exports: []
})
export class InputDirectiveTestModule {}

describe('input directive', () => {
    let fixture: ComponentFixture<TestBedInputDirectiveComponent>;
    let basicTestComponent: TestBedInputDirectiveComponent;
    let debugElement: DebugElement;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [InputDirectiveTestModule],
            providers: []
        });

        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestBedInputDirectiveComponent);
        basicTestComponent = fixture.debugElement.componentInstance;
        debugElement = fixture.debugElement.query(By.directive(ThyInputDirective));
    });

    it('thySize empty string', () => {
        basicTestComponent.thySize = '';
        fixture.detectChanges();
        expect(debugElement.nativeElement.classList.contains('form-control-xs')).toBe(false);
        expect(debugElement.nativeElement.classList.contains('form-control-sm')).toBe(false);
        expect(debugElement.nativeElement.classList.contains('form-control-md')).toBe(false);
        expect(debugElement.nativeElement.classList.contains('form-control-lg')).toBe(false);
    });

    it('thySize xs', () => {
        basicTestComponent.thySize = 'xs';
        fixture.detectChanges();
        expect(debugElement.nativeElement.classList.contains('form-control-xs')).toBe(true);
    });

    it('thySize sm', () => {
        basicTestComponent.thySize = 'sm';
        fixture.detectChanges();
        expect(debugElement.nativeElement.classList.contains('form-control-sm')).toBe(true);
    });

    it('thySize md', () => {
        basicTestComponent.thySize = 'md';
        fixture.detectChanges();
        expect(debugElement.nativeElement.classList.contains('form-control-md')).toBe(true);
    });

    it('thySize lg', () => {
        basicTestComponent.thySize = 'lg';
        fixture.detectChanges();
        expect(debugElement.nativeElement.classList.contains('form-control-lg')).toBe(true);
    });
});
