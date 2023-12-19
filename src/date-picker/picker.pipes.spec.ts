import { ThyQuarterPickerFormatPipe } from './picker.pipes';

describe('thyQuarterPickerFormat', () => {
    const quarterPickerFormatPipe: ThyQuarterPickerFormatPipe = new ThyQuarterPickerFormatPipe();

    it(`should return '2023年Q4'`, () => {
        const date = new Date();
        expect(quarterPickerFormatPipe.transform(date, 'yyyy年qqq')).toBe('2023年Q4');
    });

    it(`should return '2023-Q2 ~ 2023-Q4'`, () => {
        const dateRange = { begin: new Date('2023-06'), end: new Date('2023-12') };
        expect(quarterPickerFormatPipe.transform(dateRange)).toBe('2023-Q2 ~ 2023-Q4');
    });
});
