import { createKeyboardEvent } from '@tethys/cdk/testing';
import { hotkey, isHotkey } from '@tethys/cdk';

describe('hotkey', () => {
    describe('#hotkey', () => {
        it('should return correct hotkey code', () => {
            expect(hotkey(createKeyboardEvent('keydown', undefined, 'Enter', { meta: true }))).toEqual('Meta+Enter');
            expect(hotkey(createKeyboardEvent('keydown', undefined, 'p', { meta: true, shift: true }))).toEqual('Meta+Shift+p');
        });
    });

    describe('#isHotkey', () => {
        it('should return true when keyboard event is Meta+Enter', () => {
            const event = createKeyboardEvent('keydown', undefined, 'Enter', { meta: true });
            expect(isHotkey(event, 'Meta+Enter')).toBeTruthy();
        });
    });
});
