import { PREFIX, log, warn, warnDeprecation, createWarnDeprecation, setWarnDeprecation } from 'ngx-tethys/util';

describe('#logger', () => {
    beforeEach(() => {
        setWarnDeprecation(true);
    });

    afterEach(() => {
        setWarnDeprecation(false);
    });

    beforeEach(function () {
        if (typeof console === 'undefined') {
            console = { warn: function () {}, log: function () {} } as Console;
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
            warnDeprecation('Spec diff warn has no expectations.');
            expect(console.warn).toHaveBeenCalledTimes(1);
            expect(console.warn).toHaveBeenCalled();

            warnDeprecation('Spec diff warn has no expectations.');
            expect(console.warn).toHaveBeenCalledTimes(1);
            setWarnDeprecation(false);
        });
    });

    describe('#warnDeprecation', () => {
        it(`should log warnDeprecation to the console and print a special symbol`, () => {
            expect(console.warn).toHaveBeenCalledTimes(0);
            const message = 'Spec warnDeprecation has no expectations.';
            warnDeprecation(message);
            expect(console.warn).toHaveBeenCalledTimes(1);
            expect(console.warn).toHaveBeenCalled();
            expect(console.warn).toHaveBeenCalledWith('[NGX-TETHYS]:', 'deprecated:', `${message}`, jasmine.anything());
        });

        it(`should not log warnDeprecation to the console again when the content is the same`, () => {
            expect(console.warn).toHaveBeenCalledTimes(0);
            warnDeprecation('Spec diff warnDeprecation has no expectations.');
            expect(console.warn).toHaveBeenCalledTimes(1);
            expect(console.warn).toHaveBeenCalled();

            warnDeprecation('Spec diff warnDeprecation has no expectations.');
            expect(console.warn).toHaveBeenCalledTimes(1);
        });
    });

    describe('#createWarnDeprecation', () => {
        it(`should log warnDeprecation when createWarnDeprecation my-test`, () => {
            const myWarnDeprecation = createWarnDeprecation('[my-test]:');
            expect(console.warn).toHaveBeenCalledTimes(0);
            const message = 'Spec createWarnDeprecation my-test has no expectations.';
            myWarnDeprecation(message);
            expect(console.warn).toHaveBeenCalledTimes(1);
            expect(console.warn).toHaveBeenCalledWith('[my-test]:', 'deprecated:', `${message}`, jasmine.anything());
        });

        it(`should not log warnDeprecation to the console again when the content is the same`, () => {
            const myWarnDeprecation = createWarnDeprecation('[my-test]:');
            expect(console.warn).toHaveBeenCalledTimes(0);
            const message = 'Spec createWarnDeprecation my-test has no expectations again.';
            myWarnDeprecation(message);
            expect(console.warn).toHaveBeenCalledTimes(1);
            expect(console.warn).toHaveBeenCalledWith('[my-test]:', 'deprecated:', `${message}`, jasmine.anything());

            myWarnDeprecation(message);
            expect(console.warn).toHaveBeenCalledTimes(1);
        });
    });
});
