export type ThyGridResponsiveMode = 'none' | 'self' | 'screen';

export type ThyGridResponsiveDescription = string;

export const THY_GRID_DEFAULT_COLUMNS = 24;

export const THY_GRID_ITEM_DEFAULT_SPAN = 1;

export const screenBreakpointsMap: Record<string, number> = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200
};
