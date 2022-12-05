import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThyHotkeyModule } from '../module';
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
            (click)="save()"
        ></button>
    `
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
        TestBed.configureTestingModule({ imports: [ThyHotkeyModule], declarations: [ThyHotkeyDirectiveTestComponent] });
        TestBed.compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyHotkeyDirectiveTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should input focus when press Control+m ', () => {
        document.dispatchEvent(createKeyboardEvent('keydown', null, 'm', { control: true }));
        expect(document.activeElement).toEqual(component.input.nativeElement);
    });

    it('should call save when press Control+Enter or Meta+Enter in textarea', () => {
        const saveSpy = spyOn(component, 'save');
        const metaEnterCodeEvent = createKeyboardEvent('keydown', null, 'Enter', { meta: true });
        const controlEnterCodeEvent = createKeyboardEvent('keydown', null, 'Enter', { control: true });
        document.dispatchEvent(metaEnterCodeEvent);
        document.dispatchEvent(controlEnterCodeEvent);
        expect(saveSpy).not.toHaveBeenCalled();
        component.textarea.nativeElement.dispatchEvent(metaEnterCodeEvent);
        component.textarea.nativeElement.dispatchEvent(controlEnterCodeEvent);
        expect(saveSpy).toHaveBeenCalledTimes(2);
    });

    it('should emit hotkey listener ', () => {
        const hotkeyListenerSpy = spyOn(component, 'hotkeyListener');
        document.dispatchEvent(createKeyboardEvent('keydown', null, 'm', { control: true }));
        expect(hotkeyListenerSpy).toHaveBeenCalledTimes(1);
    });
});
