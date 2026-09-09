import { ThyInputDirective } from 'ngx-tethys/input';
import { Component, DebugElement, ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ThyFormControlSize } from 'ngx-tethys/core';

@Component({
    selector: 'test-bed-input-directive',
    template: ` <input name="username" thyInput [thySize]="thySize" /> `,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyInputDirective]
})
class TestBedInputDirectiveComponent {
    thySize: ThyFormControlSize | undefined = 'md';
}

describe('input directive', () => {
    let fixture!: ComponentFixture<TestBedInputDirectiveComponent>;
    let basicTestComponent!: TestBedInputDirectiveComponent;
    let debugElement!: DebugElement;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({});
        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestBedInputDirectiveComponent);
        basicTestComponent = fixture.debugElement.componentInstance;
        debugElement = fixture.debugElement.query(By.directive(ThyInputDirective));
    });

    it('should use md by default', () => {
        fixture.detectChanges();
        expect(debugElement.nativeElement.classList.contains('form-control-xs')).toBe(false);
        expect(debugElement.nativeElement.classList.contains('form-control-sm')).toBe(false);
        expect(debugElement.nativeElement.classList.contains('form-control-md')).toBe(true);
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

    it('should use md size when thySize is undefined', () => {
        basicTestComponent.thySize = undefined;
        fixture.detectChanges();
        expect(debugElement.nativeElement.classList.contains('form-control-md')).toBe(true);
    });
});
