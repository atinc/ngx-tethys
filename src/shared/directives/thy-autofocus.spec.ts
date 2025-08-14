import { ApplicationRef, Component, ElementRef, viewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ThyAutofocusDirective } from 'ngx-tethys/shared';

@Component({
    selector: 'thy-autofocus-test',
    template: ` <input [thyAutofocus]="autofocus" [thyAutoSelect]="autoSelect" #autofocusInput /> `,
    imports: [ThyAutofocusDirective]
})
class ThyAutofocusTestComponent {
    readonly input = viewChild<ElementRef>('autofocusInput');

    autofocus = false;

    autoSelect = false;
}

describe('ThyAutofocusDirective', () => {
    let fixture: ComponentFixture<ThyAutofocusTestComponent>;
    let testComponent: ThyAutofocusTestComponent;
    let focusSpy: jasmine.Spy;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        TestBed.compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyAutofocusTestComponent);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
        focusSpy = spyOn(testComponent.input().nativeElement, 'focus');
    });

    it('should not focus input when autofocus is false', fakeAsync(() => {
        fixture.detectChanges();
        tick(16);
        fixture.detectChanges();
        expect(focusSpy).not.toHaveBeenCalled();
    }));

    it('should auto focus input', fakeAsync(() => {
        testComponent.autofocus = true;
        fixture.detectChanges();
        tick(16);
        fixture.detectChanges();
        expect(focusSpy).toHaveBeenCalled();
    }));

    it('should select input when autofocus and autoSelect is true', fakeAsync(() => {
        testComponent.autofocus = true;
        testComponent.autoSelect = true;
        const autoSelectSpy = spyOn(testComponent.input().nativeElement, 'select');
        fixture.detectChanges();
        tick(16);
        fixture.detectChanges();
        expect(focusSpy).toHaveBeenCalled();
        expect(autoSelectSpy).toHaveBeenCalled();
    }));

    it('should not select input when autoSelect is false', fakeAsync(() => {
        testComponent.autofocus = true;
        testComponent.autoSelect = false;
        const autoSelectSpy = spyOn(testComponent.input().nativeElement, 'select');
        fixture.detectChanges();
        tick(16);
        expect(focusSpy).toHaveBeenCalled();
        expect(autoSelectSpy).not.toHaveBeenCalled();
    }));

    it('should not run change detection when the input is focused and selected', fakeAsync(() => {
        const appRef = TestBed.inject(ApplicationRef);
        spyOn(appRef, 'tick');
        testComponent.autofocus = true;
        testComponent.autoSelect = true;
        const autoSelectSpy = spyOn(testComponent.input().nativeElement, 'select');
        fixture.detectChanges();
        tick(16);
        expect(focusSpy).toHaveBeenCalled();
        expect(autoSelectSpy).toHaveBeenCalled();
        // Note: it's been called once since we manually called `fixture.detectChanges()` before `tick(16)`,
        // otherwise, it would've been called 2 times (because of the `reqAnimFrame`).
        expect(appRef.tick).toHaveBeenCalledTimes(1);
    }));
});
