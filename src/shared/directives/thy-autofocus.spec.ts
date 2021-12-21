import { Component, ElementRef, ViewChild } from '@angular/core';
import { async, ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';

import { ThySharedModule } from '../shared.module';

@Component({
    selector: 'thy-autofocus-test',
    template: `
        <input [thyAutofocus]="autofocus" [thyAutoSelect]="autoSelect" #autofocusInput />
    `
})
class ThyAutofocusTestComponent {
    @ViewChild('autofocusInput') input: ElementRef;

    autofocus = false;

    autoSelect = false;
}

fdescribe('ThyAutofocusDirective', () => {
    let fixture: ComponentFixture<ThyAutofocusTestComponent>;
    let testComponent: ThyAutofocusTestComponent;
    let focusSpy: jasmine.Spy;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ThySharedModule],
            declarations: [ThyAutofocusTestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyAutofocusTestComponent);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
        focusSpy = spyOn(testComponent.input.nativeElement, 'focus');
    });

    it('should not focus input when autofocus is false', fakeAsync(() => {
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
        expect(focusSpy).not.toHaveBeenCalled();
    }));

    it('should auto focus input', fakeAsync(() => {
        testComponent.autofocus = true;
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
        expect(focusSpy).toHaveBeenCalled();
    }));

    it('should select input when autofocus and autoSelect is true', fakeAsync(() => {
        testComponent.autofocus = true;
        testComponent.autoSelect = true;
        const autoSelectSpy = spyOn(testComponent.input.nativeElement, 'select');
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
        expect(focusSpy).toHaveBeenCalled();
        expect(autoSelectSpy).toHaveBeenCalled();
    }));

    it('should not select input when autoSelect is false', fakeAsync(() => {
        testComponent.autofocus = true;
        testComponent.autoSelect = false;
        const autoSelectSpy = spyOn(testComponent.input.nativeElement, 'select');
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
        expect(focusSpy).toHaveBeenCalled();
        expect(autoSelectSpy).not.toHaveBeenCalled();
    }));
});
