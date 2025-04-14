import { getNumericSize, ThySpacingSize } from 'ngx-tethys/core';

describe('spacing', () => {
    const sizes: { value: ThySpacingSize; space: number }[] = [
        {
            value: 'zero',
            space: 0
        },
        {
            value: 'xxs',
            space: 4
        },
        {
            value: 'xs',
            space: 8
        },
        {
            value: 'sm',
            space: 12
        },
        {
            value: 'md',
            space: 16
        },
        {
            value: 'lg',
            space: 20
        },
        {
            value: 'xlg',
            space: 24
        }
    ];

    it('should get preset sizes', () => {
        sizes.forEach(size => {
            expect(getNumericSize(size.value)).toEqual(size.space);
        });
    });

    it('should get number size', () => {
        expect(getNumericSize(100)).toEqual(100);
    });

    it('should get default size size', () => {
        expect(getNumericSize('not-found' as ThySpacingSize, 'md')).toEqual(16);
    });
});
