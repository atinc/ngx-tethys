import { PREFIX, log, warn, warnDeprecation } from './logger';

describe('#logger', () => {
    beforeEach(function() {
        if (typeof console === 'undefined') {
            console = { warn: function() {}, log: function() {} } as Console;
        }
        spyOn(console, 'warn');
        spyOn(console, 'log');
    });

    describe('#log', () => {
        it(`should log to the console and print a special symbol`, () => {
            expect(console.log).toHaveBeenCalledTimes(0);
            log('Spec log has no expectations.');
            expect(console.log).toHaveBeenCalledTimes(1);
            expect(console.log).toHaveBeenCalledWith(PREFIX, 'Spec log has no expectations.');

            log('Spec log has no expectations.');
            expect(console.log).toHaveBeenCalledTimes(2);
            expect(console.log).toHaveBeenCalledWith(PREFIX, 'Spec log has no expectations.');
        });
    });

    describe('#warn', () => {
        it(`should log warn to the console and print a special symbol`, () => {
            warn('Spec warn has no expectations.');
            expect(console.warn).toHaveBeenCalledTimes(1);
            expect(console.warn).toHaveBeenCalledWith(PREFIX, 'Spec warn has no expectations.');
            warn('Spec warn has no expectations.');
            expect(console.warn).toHaveBeenCalledTimes(1);
        });

        it(`should not log warn to the console again when the content is the same`, () => {
            expect(console.warn).toHaveBeenCalledTimes(0);
            warnDeprecation('Spec warn has no expectations.');
            expect(console.warn).toHaveBeenCalledTimes(1);
            expect(console.warn).toHaveBeenCalled();

            warnDeprecation('Spec warn has no expectations.');
            expect(console.warn).toHaveBeenCalledTimes(1);
        });
    });

    describe('#warnDeprecation', () => {
        it(`should log warnDeprecation to the console and print a special symbol`, () => {
            expect(console.warn).toHaveBeenCalledTimes(0);
            warnDeprecation('Spec warnDeprecation has no expectations.');
            expect(console.warn).toHaveBeenCalledTimes(1);
            expect(console.warn).toHaveBeenCalled();
        });

        it(`should not log warnDeprecation to the console again when the content is the same`, () => {
            expect(console.warn).toHaveBeenCalledTimes(0);
            warnDeprecation('Spec warnDeprecation has no expectations.');
            expect(console.warn).toHaveBeenCalledTimes(1);
            expect(console.warn).toHaveBeenCalled();

            warnDeprecation('Spec warnDeprecation has no expectations.');
            expect(console.warn).toHaveBeenCalledTimes(1);
        });
    });
});
