import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { createKeyboardEvent } from '@tethys/cdk/testing';
import { ThyHotkeyDispatcher } from '@tethys/cdk';

const controlEnterCode = 'Control+Enter';
const metaEnterCode = 'Meta+Enter';
const metaEnterCodeEvent = createKeyboardEvent('keydown', null, 'Enter', { meta: true });
const controlEnterCodeEvent = createKeyboardEvent('keydown', null, 'Enter', { control: true });

describe('HotkeyDispatcher', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({});
        TestBed.compileComponents();
    });

    describe('basic usage', () => {
        let hotkeyDispatcher: ThyHotkeyDispatcher;

        beforeEach(inject([ThyHotkeyDispatcher], (dispatcher: ThyHotkeyDispatcher) => {
            hotkeyDispatcher = dispatcher;
        }));

        it('should be correctly subscribed hotkey event', fakeAsync(() => {
            const spy = jasmine.createSpy('hotkey callback');
            const subscription = hotkeyDispatcher.keydown(metaEnterCode).subscribe(spy);
            expect(spy).not.toHaveBeenCalled();
            document.dispatchEvent(metaEnterCodeEvent);
            tick();
            expect(spy).toHaveBeenCalledTimes(1);
            subscription.unsubscribe();
            document.dispatchEvent(metaEnterCodeEvent);
            tick();
            expect(spy).toHaveBeenCalledTimes(1);
        }));

        it('should be correctly subscribed hotkey event with scope', fakeAsync(() => {
            const scope = document.createElement('div');
            const spy = jasmine.createSpy('hotkey callback');
            const subscription = hotkeyDispatcher.keydown(metaEnterCode, scope).subscribe(spy);
            expect(spy).not.toHaveBeenCalled();
            scope.dispatchEvent(metaEnterCodeEvent);
            tick();
            expect(spy).toHaveBeenCalledTimes(1);
            subscription.unsubscribe();
            document.dispatchEvent(metaEnterCodeEvent);
            tick();
            expect(spy).toHaveBeenCalledTimes(1);
        }));

        it(`should be don't call hotkey callback with active element is form control`, fakeAsync(() => {
            // create form control
            const input = document.createElement('input');
            input.type = 'text';
            document.body.appendChild(input);
            // bind hotkey to document
            const spy1 = jasmine.createSpy('hotkey callback');
            hotkeyDispatcher.keydown(metaEnterCode).subscribe(spy1);
            input.focus();
            document.dispatchEvent(metaEnterCodeEvent);
            tick();
            expect(spy1).not.toHaveBeenCalled();
            input.blur();
            document.dispatchEvent(metaEnterCodeEvent);
            tick();
            expect(spy1).toHaveBeenCalledTimes(1);

            // bind hotkey to input
            const spy2 = jasmine.createSpy('hotkey callback');
            hotkeyDispatcher.keydown(controlEnterCode, input).subscribe(spy2);
            input.dispatchEvent(controlEnterCodeEvent);
            tick();
            expect(spy2).toHaveBeenCalledTimes(1);
        }));

        // it('should call last hotkey event when same hotkey code subscribed', fakeAsync(() => {
        //     const firstSpy = jasmine.createSpy('first hotkey callback');
        //     const secondSpy = jasmine.createSpy('second hotkey callback');
        //     hotkeyDispatcher.keydown([metaEnterCode, controlEnterCode]).subscribe(firstSpy);
        //     const subscription = hotkeyDispatcher.keydown([metaEnterCode, 'Meta+i']).subscribe(secondSpy);
        //     document.dispatchEvent(metaEnterCodeEvent);
        //     tick();
        //     expect(firstSpy).not.toHaveBeenCalled();
        //     expect(secondSpy).toHaveBeenCalledTimes(1);

        //     subscription.unsubscribe();
        //     document.dispatchEvent(metaEnterCodeEvent);
        //     tick();
        //     expect(firstSpy).toHaveBeenCalledTimes(1);
        //     expect(secondSpy).toHaveBeenCalledTimes(1);
        // }));
    });
});
