export type ThyNativeTableLayout = 'fixed' | 'auto';

export type ThyNativeTableSortOrder = 'default' | 'asc' | 'desc';

export type ThyNativeTableTheme = 'default' | 'bordered' | 'boxed';

export type ThyNativeTableSize = 'md' | 'sm' | 'xs' | 'lg' | 'xlg' | 'default';

export type ThyNativeTableHeaderCellCheckState = boolean | 'indeterminate';

export interface ThyNativeTableScroll {
    x?: string | null;
    y?: string | null;
}

export interface ThyNativeTableFixedInfo {
    fixed: 'left' | 'right' | null;
    isLastLeft?: boolean;
    isFirstRight?: boolean;
    leftPx?: string | null;
    rightPx?: string | null;
}
