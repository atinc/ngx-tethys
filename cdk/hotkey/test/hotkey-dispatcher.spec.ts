import { DOCUMENT } from '@angular/common';
import { inject, TestBed } from '@angular/core/testing';
import { createKeyboardEvent } from '@tethys/cdk/testing';
import { ThyHotkeyDispatcher } from '../hotkey-dispatcher';

const controlEnterCode = 'Control+Enter';
const metaEnterCode = 'Meta+Enter';
const metaEnterCodeEvent = createKeyboardEvent('keydown', null, 'Enter', { meta: true });

describe('HotkeyDispatcher', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({ imports: [] });
        TestBed.compileComponents();
    });

    describe('basic usage', () => {
        let hotkeyDispatcher: ThyHotkeyDispatcher;

        beforeEach(inject([ThyHotkeyDispatcher], (dispatcher: ThyHotkeyDispatcher) => {
            hotkeyDispatcher = dispatcher;
        }));

        it('should be correctly subscribed hotkey event', () => {
            const spy = jasmine.createSpy('hotkey callback');
            const subscription = hotkeyDispatcher.keydown(metaEnterCode).subscribe(spy);
            expect(spy).not.toHaveBeenCalled();
            document.dispatchEvent(metaEnterCodeEvent);
            expect(spy).toHaveBeenCalledTimes(1);
            subscription.unsubscribe();
            document.dispatchEvent(metaEnterCodeEvent);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        it('should be correctly subscribed hotkey event with scope', () => {
            const scope = document.createElement('div');
            const spy = jasmine.createSpy('hotkey callback');
            const subscription = hotkeyDispatcher.keydown(metaEnterCode, scope).subscribe(spy);
            expect(spy).not.toHaveBeenCalled();
            scope.dispatchEvent(metaEnterCodeEvent);
            expect(spy).toHaveBeenCalledTimes(1);
            subscription.unsubscribe();
            document.dispatchEvent(metaEnterCodeEvent);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        it('should throw error when same hotkey code subscribed', () => {
            const subscription = hotkeyDispatcher.keydown([metaEnterCode, controlEnterCode]).subscribe();
            expect(() => {
                hotkeyDispatcher.keydown([metaEnterCode, 'Meta+i']).subscribe();
            }).toThrowError(`'Meta+Enter' hotkey conflict detected`);
            subscription.unsubscribe();
            expect(() => {
                hotkeyDispatcher.keydown([metaEnterCode, 'Meta+i']).subscribe();
            }).not.toThrowError();
        });
    });
});
