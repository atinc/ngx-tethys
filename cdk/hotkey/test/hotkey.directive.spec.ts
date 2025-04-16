import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ThyHotkeyModule } from '@tethys/cdk';
import { createKeyboardEvent } from '@tethys/cdk/testing';

@Component({
    selector: 'thy-autofocus-test',
    template: `
        <!-- document -->
        <input #input thyHotkey="Control+m" (thyHotkeyListener)="hotkeyListener()" thyInput />
        <!-- with scope -->
        <textarea #textarea thyHotkey="t" rows="3" [value]="content"></textarea>
        <button
            class="mt-2 float-right"
            [thyHotkey]="['Control+Enter', 'Meta+Enter']"
            [thyHotkeyScope]="textarea"
            thyButton="primary"
            thySize="sm"
            (click)="save()"></button>
    `,
    imports: [ThyHotkeyModule]
})
class ThyHotkeyDirectiveTestComponent {
    @ViewChild('input') input: ElementRef<HTMLInputElement>;

    @ViewChild('textarea') textarea: ElementRef<HTMLTextAreaElement>;

    save() {}

    hotkeyListener() {}
}

describe('ThyHotkeyDirective', () => {
    let fixture: ComponentFixture<ThyHotkeyDirectiveTestComponent>;
    let component: ThyHotkeyDirectiveTestComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        TestBed.compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyHotkeyDirectiveTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should input focus when press Control+m ', fakeAsync(() => {
        document.dispatchEvent(createKeyboardEvent('keydown', null, 'm', { control: true }));
        tick();
        expect(document.activeElement).toEqual(component.input.nativeElement);
    }));

    it('should call save when press Control+Enter or Meta+Enter in textarea', fakeAsync(() => {
        const saveSpy = spyOn(component, 'save');
        const metaEnterCodeEvent = createKeyboardEvent('keydown', null, 'Enter', { meta: true });
        const controlEnterCodeEvent = createKeyboardEvent('keydown', null, 'Enter', { control: true });
        document.dispatchEvent(metaEnterCodeEvent);
        document.dispatchEvent(controlEnterCodeEvent);
        tick();
        expect(saveSpy).not.toHaveBeenCalled();
        component.textarea.nativeElement.dispatchEvent(metaEnterCodeEvent);
        tick();
        expect(saveSpy).toHaveBeenCalledTimes(1);
        component.textarea.nativeElement.dispatchEvent(controlEnterCodeEvent);
        tick();
        expect(saveSpy).toHaveBeenCalledTimes(2);
    }));

    it('should emit hotkey listener ', fakeAsync(() => {
        const hotkeyListenerSpy = spyOn(component, 'hotkeyListener');
        document.dispatchEvent(createKeyboardEvent('keydown', null, 'm', { control: true }));
        tick();
        expect(hotkeyListenerSpy).toHaveBeenCalledTimes(1);
    }));
});
