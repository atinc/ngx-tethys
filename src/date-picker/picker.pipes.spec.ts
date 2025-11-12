import { TestBed } from '@angular/core/testing';
import { ThyLocaleType } from 'ngx-tethys/i18n';
import { TinyDate } from 'ngx-tethys/util';
import { ThyQuarterPickerFormatPipe } from 'ngx-tethys/date-picker';
import { ThyDatePickerModule } from './date-picker.module';

describe('thyQuarterPickerFormat', () => {
    let quarterPickerFormatPipe: ThyQuarterPickerFormatPipe;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ThyDatePickerModule]
        });
        TinyDate.setDefaultLocale(ThyLocaleType.enUs);
        quarterPickerFormatPipe = TestBed.runInInjectionContext(() => new ThyQuarterPickerFormatPipe());
    });

    it(`should return '2023-Q4'`, () => {
        const date = new Date('2023-12-31');
        expect(quarterPickerFormatPipe.transform(date)).toBe('2023-Q4');
    });

    it(`should return '2023-Q2 ~ 2023-Q4'`, () => {
        const dateRange = { begin: new Date('2023-06'), end: new Date('2023-12') };
        expect(quarterPickerFormatPipe.transform(dateRange)).toBe('2023-Q2 ~ 2023-Q4');
    });
});
