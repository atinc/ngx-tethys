import { isNumber } from 'ngx-tethys/util';
export type ThySpacingSize = 'zero' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xlg' | number;

const SPACING_SIZES_MAP = {
    zero: 0,
    xxs: 4,
    xs: 8,
    sm: 12,
    md: 16,
    lg: 20,
    xlg: 24
};

export function getNumericSize(size: ThySpacingSize, defaultSize?: ThySpacingSize): number {
    if (isNumber(size)) {
        return size;
    }
    // @ts-ignore
    return SPACING_SIZES_MAP[size] !== undefined ? SPACING_SIZES_MAP[size] : SPACING_SIZES_MAP[defaultSize];
}
